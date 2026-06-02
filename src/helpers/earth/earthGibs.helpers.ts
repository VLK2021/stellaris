import type {EarthLayer} from "@/src/types/earth/earth.types";

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
            `<(?:[a-zA-Z0-9_-]+:)?${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/(?:[a-zA-Z0-9_-]+:)?${tag}>`,
            "i",
        ),
    );

    return decodeXml(match?.[1]?.trim() ?? null);
};

const getFirstResourceUrl = (xml: string) => {
    const match = xml.match(/template=['"]([^'"]+)['"]/i);

    return decodeXml(match?.[1] ?? null);
};

const getFormat = (xml: string) => {
    return getTagValue(xml, "Format");
};

const getTileMatrixSet = (xml: string) => {
    const linkMatch = xml.match(
        /<(?:[a-zA-Z0-9_-]+:)?TileMatrixSetLink(?:\s[^>]*)?>[\s\S]*?<\/(?:[a-zA-Z0-9_-]+:)?TileMatrixSetLink>/i,
    );

    if (!linkMatch) return null;

    return getTagValue(linkMatch[0], "TileMatrixSet");
};

export const parseGibsWmtsLayers = (xml: string): EarthLayer[] => {
    const layerBlocks =
        xml.match(
            /<(?:[a-zA-Z0-9_-]+:)?Layer(?:\s[^>]*)?>[\s\S]*?<\/(?:[a-zA-Z0-9_-]+:)?Layer>/gi,
        ) ?? [];

    return layerBlocks
        .map((block) => {
            const id = getTagValue(block, "Identifier");
            const title = getTagValue(block, "Title");

            if (!id || !title) {
                return null;
            }

            return {
                id,
                title,
                abstract: getTagValue(block, "Abstract"),
                format: getFormat(block),
                tileMatrixSet: getTileMatrixSet(block),
                resourceUrl: getFirstResourceUrl(block),
                source: "NASA GIBS WMTS" as const,
            };
        })
        .filter((layer): layer is EarthLayer => Boolean(layer));
};