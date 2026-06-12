import type {NasaAsset, NasaAssetKey} from "@/src/types/nasa";

const NASA_IMAGES_BASE_URL = "https://images-api.nasa.gov";

const ASSET_CONFIG: Record<
    NasaAssetKey,
    {
        queries: string[];
        fallbackTitle: string;
    }
> = {
    earth: {
        queries: ["blue marble earth", "earth full disk", "earth from space"],
        fallbackTitle: "Earth",
    },
    mars: {
        queries: ["mars planet", "mars globe", "hubble mars"],
        fallbackTitle: "Mars",
    },
    moon: {
        queries: ["moon", "lunar surface", "near side moon"],
        fallbackTitle: "Moon",
    },
    iss: {
        queries: ["international space station", "iss orbit", "space station"],
        fallbackTitle: "ISS",
    },
    sun: {
        queries: ["sun solar dynamics observatory", "solar dynamics observatory sun", "sun"],
        fallbackTitle: "Sun",
    },
    galaxy: {
        queries: ["andromeda galaxy", "spiral galaxy", "galaxy"],
        fallbackTitle: "Galaxy",
    },
    rocket: {
        queries: ["artemis launch", "rocket launch", "space launch system"],
        fallbackTitle: "Rocket",
    },
    astronaut: {
        queries: ["astronaut spacewalk", "astronaut eva", "spacewalk"],
        fallbackTitle: "Astronaut",
    },
};

type NasaImageSearchItem = {
    href: string;
    data: {
        nasa_id: string;
        title: string;
        description?: string;
    }[];
    links?: {
        href: string;
        rel: string;
        render?: string;
    }[];
};

type NasaImageSearchResponse = {
    collection: {
        items: NasaImageSearchItem[];
    };
};

const getPreviewImage = (item: NasaImageSearchItem) => {
    return item.links?.find((link) => link.render === "image")?.href ?? "";
};

const searchNasaImage = async (
    query: string,
): Promise<NasaImageSearchItem | null> => {
    try {
        const params = new URLSearchParams({
            q: query,
            media_type: "image",
            page_size: "12",
        });

        const response = await fetch(
            `${NASA_IMAGES_BASE_URL}/search?${params.toString()}`,
            {
                next: {
                    revalidate: 60 * 60 * 24,
                },
                headers: {
                    Accept: "application/json",
                },
            },
        );

        if (!response.ok) {
            return null;
        }

        const data = (await response.json()) as NasaImageSearchResponse;

        return (
            data.collection.items.find((item) => {
                return item.data?.length && Boolean(getPreviewImage(item));
            }) ?? null
        );
    } catch {
        return null;
    }
};

export const getNasaAsset = async (
    key: NasaAssetKey,
): Promise<NasaAsset | null> => {
    const config = ASSET_CONFIG[key];

    for (const query of config.queries) {
        const item = await searchNasaImage(query);

        if (!item) {
            continue;
        }

        const meta = item.data[0];

        if (!meta) {
            continue;
        }

        return {
            key,
            title: meta.title || config.fallbackTitle,
            description: meta.description ?? "",
            nasaId: meta.nasa_id,
            imageUrl: getPreviewImage(item),
            href: item.href,
        };
    }

    return null;
};

export const getNasaAssets = async (): Promise<NasaAsset[]> => {
    const keys = Object.keys(ASSET_CONFIG) as NasaAssetKey[];

    const results = await Promise.allSettled(
        keys.map((key) => getNasaAsset(key)),
    );

    return results
        .map((result) =>
            result.status === "fulfilled" ? result.value : null,
        )
        .filter(Boolean) as NasaAsset[];
};