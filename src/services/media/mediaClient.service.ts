import type {
    MediaApiResponse,
    MediaSearchQuery,
    MediaSearchResponse,
} from "@/src/types/media";

import type {NormalizedMediaAssets} from "./media.service";

export const fetchMediaSearchClient = async (
    query: MediaSearchQuery,
): Promise<MediaSearchResponse> => {
    const params = new URLSearchParams();

    if (query.query) params.set("q", query.query);
    if (query.mediaType) params.set("mediaType", query.mediaType);
    if (query.center) params.set("center", query.center);
    if (query.yearStart) params.set("yearStart", query.yearStart);
    if (query.yearEnd) params.set("yearEnd", query.yearEnd);

    params.set("page", String(query.page ?? 1));

    const response = await fetch(`/api/media/search?${params.toString()}`);
    const json = (await response.json()) as MediaApiResponse<MediaSearchResponse>;

    if (!response.ok || !json.success) {
        throw new Error(json.message ?? "Failed to load media.");
    }

    return json.data;
};

export const fetchMediaAssetsClient = async (
    nasaId: string,
): Promise<NormalizedMediaAssets> => {
    const response = await fetch(`/api/media/assets/${encodeURIComponent(nasaId)}`);
    const json = (await response.json()) as MediaApiResponse<NormalizedMediaAssets>;

    if (!response.ok || !json.success) {
        throw new Error(json.message ?? "Failed to load media assets.");
    }

    return json.data;
};