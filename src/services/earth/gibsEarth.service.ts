import {
    EARTH_REVALIDATE_SECONDS,
    GIBS_WMTS_CAPABILITIES_URL,
} from "@/src/constants/earth/earth.constants";

import {
    paginateEarthItems,
    parseGibsWmtsLayers,
} from "@/src/helpers/earth";

import {fetchEarthText} from "./nasaEarthClient.service";

import type {
    EarthLayer,
    EarthLayerDetails,
    EarthLayersQuery,
    EarthLayersResponse,
} from "@/src/types/earth/earth.types";

const decodeXml = (value: string | null) => {
    if (!value) return null;

    return value
        .replaceAll("&amp;", "&")
        .replaceAll("&lt;", "<")
        .replaceAll("&gt;", ">")
        .replaceAll("&quot;", '"')
        .replaceAll("&apos;", "'");
};

const getTagValue = (xml: string, tag: string) => {
    const match = xml.match(
        new RegExp(
            `<(?:[a-zA-Z0-9_-]+:)?${tag}[^>]*>([\\s\\S]*?)<\\/(?:[a-zA-Z0-9_-]+:)?${tag}>`,
            "i",
        ),
    );

    return decodeXml(match?.[1]?.trim() ?? null);
};

const getLayerBlockById = (xml: string, layerId: string) => {
    const layerBlocks =
        xml.match(
            /<(?:[a-zA-Z0-9_-]+:)?Layer(?:\s[^>]*)?>[\s\S]*?<\/(?:[a-zA-Z0-9_-]+:)?Layer>/gi,
        ) ?? [];

    return (
        layerBlocks.find((block) => {
            const id = getTagValue(block, "Identifier");
            return id === layerId;
        }) ?? null
    );
};

const getResourceTemplate = (xml: string) => {
    const match = xml.match(
        /template=['"]([^'"]+)['"]/i,
    );

    return decodeXml(match?.[1] ?? null);
};

const getDimensions = (xml: string) => {
    const dimensions =
        xml.match(
            /<(?:[a-zA-Z0-9_-]+:)?Dimension(?:\s[^>]*)?>[\s\S]*?<\/(?:[a-zA-Z0-9_-]+:)?Dimension>/gi,
        ) ?? [];

    return dimensions.map((dimension) => {
        const id = getTagValue(dimension, "Identifier") ?? "unknown";
        const defaultValue = getTagValue(dimension, "Default");

        const values =
            dimension
                .match(
                    /<(?:[a-zA-Z0-9_-]+:)?Value[^>]*>([\s\S]*?)<\/(?:[a-zA-Z0-9_-]+:)?Value>/gi,
                )
                ?.map(
                    (value) =>
                        decodeXml(value.replace(/<[^>]+>/g, "").trim()) ?? "",
                )
                .filter(Boolean) ?? [];

        return {
            id,
            defaultValue,
            values,
        };
    });
};

const buildPreviewUrlFromTemplate = (
    template: string | null,
    dimensions: ReturnType<typeof getDimensions>,
    layer: EarthLayer,
) => {
    if (!template) return null;

    const timeDimension = dimensions.find((dimension) => dimension.id === "Time");

    const time =
        timeDimension?.defaultValue ??
        timeDimension?.values[timeDimension.values.length - 1] ??
        "default";

    const tileMatrixSet = layer.tileMatrixSet ?? "250m";

    return template
        .replaceAll("{Time}", time)
        .replaceAll("{TileMatrixSet}", tileMatrixSet)
        .replaceAll("{TileMatrix}", "0")
        .replaceAll("{TileRow}", "0")
        .replaceAll("{TileCol}", "0");
};

export const getGibsLayers = async ({
                                        page = 1,
                                        limit = 12,
                                        search = "",
                                        format,
                                        sortBy = "title",
                                        order = "asc",
                                    }: EarthLayersQuery = {}): Promise<EarthLayersResponse> => {
    const xml = await fetchEarthText({
        url: GIBS_WMTS_CAPABILITIES_URL,
        revalidate: EARTH_REVALIDATE_SECONDS.gibs,
    });

    let layers = parseGibsWmtsLayers(xml);

    const normalizedSearch = search.trim().toLowerCase();

    if (normalizedSearch) {
        layers = layers.filter((layer) => {
            return (
                layer.id.toLowerCase().includes(normalizedSearch) ||
                layer.title.toLowerCase().includes(normalizedSearch) ||
                layer.abstract?.toLowerCase().includes(normalizedSearch)
            );
        });
    }

    if (format) {
        layers = layers.filter((layer) => layer.format === format);
    }

    layers = [...layers].sort((a, b) => {
        const first = String(a[sortBy ?? "title"] ?? "").toLowerCase();
        const second = String(b[sortBy ?? "title"] ?? "").toLowerCase();

        return order === "desc"
            ? second.localeCompare(first)
            : first.localeCompare(second);
    });

    const result = paginateEarthItems({
        items: layers,
        page,
        limit,
    });

    return {
        success: true,
        data: result.data,
        pagination: result.pagination,
    };
};

export const getGibsLayerDetails = async (
    layerId: string,
): Promise<EarthLayerDetails> => {
    const xml = await fetchEarthText({
        url: GIBS_WMTS_CAPABILITIES_URL,
        revalidate: EARTH_REVALIDATE_SECONDS.gibs,
    });

    const layers = parseGibsWmtsLayers(xml);
    const layer = layers.find((item) => item.id === layerId);

    if (!layer) {
        throw new Error("NASA GIBS layer not found.");
    }

    const rawXml = getLayerBlockById(xml, layerId);

    if (!rawXml) {
        throw new Error("NASA GIBS layer XML block not found.");
    }

    const resourceTemplate = getResourceTemplate(rawXml);
    const dimensions = getDimensions(rawXml);

    return {
        ...layer,
        resourceTemplate,
        dimensions,
        previewUrl: buildPreviewUrlFromTemplate(resourceTemplate, dimensions, layer),
        rawXml,
    };
};