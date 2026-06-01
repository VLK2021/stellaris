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
    EarthLayersResponse,
} from "@/src/types/earth/earth.types";

type GetGibsLayersParams = {
    page?: number;
    limit?: number;
    search?: string;
    format?: string;
    sortBy?: "title" | "id" | "format";
    order?: "asc" | "desc";
};

export const getGibsLayers = async ({
                                        page = 1,
                                        limit = 12,
                                        search = "",
                                        format,
                                        sortBy = "title",
                                        order = "asc",
                                    }: GetGibsLayersParams = {}): Promise<EarthLayersResponse> => {
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
        const first = String(a[sortBy] ?? "").toLowerCase();
        const second = String(b[sortBy] ?? "").toLowerCase();

        if (order === "desc") {
            return second.localeCompare(first);
        }

        return first.localeCompare(second);
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