import type {
    MediaAssetResponse,
    MediaDetails,
    MediaItem,
    MediaSearchQuery,
    MediaSearchResponse,
} from "@/src/types/media";

const NASA_MEDIA_URL =
    "https://images-api.nasa.gov";

const buildSearchParams = (
    query: MediaSearchQuery,
) => {
    const params = new URLSearchParams();

    params.set(
        "page",
        String(query.page ?? 1),
    );

    if (query.query) {
        params.set("q", query.query);
    }

    if (query.mediaType) {
        params.set(
            "media_type",
            query.mediaType,
        );
    }

    if (query.center) {
        params.set("center", query.center);
    }

    if (query.yearStart) {
        params.set(
            "year_start",
            query.yearStart,
        );
    }

    if (query.yearEnd) {
        params.set(
            "year_end",
            query.yearEnd,
        );
    }

    return params;
};

export const searchMedia = async (
    query: MediaSearchQuery,
) => {
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
        throw new Error(
            "Failed to load NASA media.",
        );
    }

    return (await response.json()) as MediaSearchResponse;
};

export const getMediaAssets = async (
    nasaId: string,
) => {
    const response = await fetch(
        `${NASA_MEDIA_URL}/asset/${nasaId}`,
        {
            next: {
                revalidate: 60 * 60,
            },
        },
    );

    if (!response.ok) {
        throw new Error(
            "Failed to load NASA assets.",
        );
    }

    return (await response.json()) as MediaAssetResponse;
};

export const mapMediaDetails = async (
    item: MediaItem,
): Promise<MediaDetails> => {
    const data = item.data[0];

    const assets = await getMediaAssets(
        data.nasa_id,
    );

    return {
        nasaId: data.nasa_id,

        title: data.title,

        description:
            data.description ?? "",

        mediaType: data.media_type,

        dateCreated:
            data.date_created ?? null,

        center: data.center ?? null,

        location:
            data.location ?? null,

        photographer:
            data.photographer ?? null,

        keywords:
            data.keywords ?? [],

        preview:
            item.links?.[0]?.href ?? null,

        assets:
            assets.collection.items.map(
                (asset) => asset.href,
            ),
    };
};