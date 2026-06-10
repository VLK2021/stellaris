import type {
    MediaAssetResponse,
    MediaDetails,
    MediaItem,
    MediaSearchQuery,
    MediaSearchResponse,
} from "@/src/types/media";

const NASA_MEDIA_URL = "https://images-api.nasa.gov";

export type NormalizedMediaAssets = {
    assets: string[];
    preview: string | null;
    video: string | null;
    audio: string | null;
};

const buildSearchParams = (query: MediaSearchQuery) => {
    const params = new URLSearchParams();

    params.set("page", String(query.page ?? 1));

    if (query.query) {
        params.set("q", query.query);
    }

    if (query.mediaType) {
        params.set("media_type", query.mediaType);
    }

    if (query.center) {
        params.set("center", query.center);
    }

    if (query.yearStart) {
        params.set("year_start", query.yearStart);
    }

    if (query.yearEnd) {
        params.set("year_end", query.yearEnd);
    }

    return params;
};

const isImageAsset = (asset: string) => {
    const value = asset.toLowerCase();

    return (
        value.endsWith(".jpg") ||
        value.endsWith(".jpeg") ||
        value.endsWith(".png") ||
        value.endsWith(".webp")
    );
};

const isVideoAsset = (asset: string) => {
    const value = asset.toLowerCase();

    return (
        value.endsWith(".mp4") ||
        value.endsWith(".mov") ||
        value.endsWith(".m4v")
    );
};

const isAudioAsset = (asset: string) => {
    const value = asset.toLowerCase();

    return (
        value.endsWith(".mp3") ||
        value.endsWith(".wav") ||
        value.endsWith(".m4a")
    );
};

const normalizeMediaAssets = (
    data: MediaAssetResponse,
): NormalizedMediaAssets => {
    const assets =
        data.collection?.items?.map((item) => item.href) ?? [];

    return {
        assets,
        preview: assets.find(isImageAsset) ?? null,
        video: assets.find(isVideoAsset) ?? null,
        audio: assets.find(isAudioAsset) ?? null,
    };
};

export const searchMedia = async (
    query: MediaSearchQuery,
): Promise<MediaSearchResponse> => {
    const params = buildSearchParams(query);

    const response = await fetch(
        `${NASA_MEDIA_URL}/search?${params.toString()}`,
        {
            next: {
                revalidate: 60 * 30,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to load NASA media.");
    }

    return (await response.json()) as MediaSearchResponse;
};

export const getMediaAssets = async (
    nasaId: string,
): Promise<NormalizedMediaAssets> => {
    const response = await fetch(
        `${NASA_MEDIA_URL}/asset/${encodeURIComponent(nasaId)}`,
        {
            next: {
                revalidate: 60 * 60,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to load NASA assets.");
    }

    const data = (await response.json()) as MediaAssetResponse;

    return normalizeMediaAssets(data);
};

export const getRawMediaAssets = async (
    nasaId: string,
): Promise<MediaAssetResponse> => {
    const response = await fetch(
        `${NASA_MEDIA_URL}/asset/${encodeURIComponent(nasaId)}`,
        {
            next: {
                revalidate: 60 * 60,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to load NASA assets.");
    }

    return (await response.json()) as MediaAssetResponse;
};

export const getMediaByNasaId = async (
    nasaId: string,
): Promise<MediaItem | null> => {
    const params = new URLSearchParams();

    params.set("nasa_id", nasaId);

    const response = await fetch(
        `${NASA_MEDIA_URL}/search?${params.toString()}`,
        {
            next: {
                revalidate: 60 * 60,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to load NASA media item.");
    }

    const data = (await response.json()) as MediaSearchResponse;

    return (
        data.collection.items.find(
            (item) => item.data?.[0]?.nasa_id === nasaId,
        ) ?? null
    );
};

export const mapMediaDetails = async (
    item: MediaItem,
): Promise<MediaDetails> => {
    const data = item.data[0];
    const media = await getMediaAssets(data.nasa_id);

    return {
        nasaId: data.nasa_id,
        title: data.title,
        description: data.description ?? "",
        mediaType: data.media_type,
        dateCreated: data.date_created ?? null,
        center: data.center ?? null,
        location: data.location ?? null,
        photographer: data.photographer ?? null,
        keywords: data.keywords ?? [],
        preview: item.links?.[0]?.href ?? media.preview,
        assets: media.assets,
    };
};