import type {NasaLiveMediaItem} from "@/src/types/nasaLive";
import {fetchNasaJson} from "./nasaClient.service";

const NASA_IMAGES_BASE_URL = "https://images-api.nasa.gov";

type ImageLibraryResponse = {
    collection: {
        items: {
            href: string;
            links?: {
                href: string;
                rel: string;
                render?: string;
            }[];
            data: {
                title: string;
                description?: string;
                nasa_id: string;
                date_created: string;
            }[];
        }[];
    };
};

export const searchNasaImages = async (
    query: string,
): Promise<NasaLiveMediaItem | null> => {
    const data = await fetchNasaJson<ImageLibraryResponse>("/search", {
        baseUrl: NASA_IMAGES_BASE_URL,
        withApiKey: false,
        params: {
            q: query,
            media_type: "image",
            page: 1,
        },
    });

    const item = data.collection.items[0];
    const meta = item?.data[0];

    if (!item || !meta) return null;

    return {
        title: meta.title,
        description: meta.description ?? "",
        nasaId: meta.nasa_id,
        dateCreated: meta.date_created,
        imageUrl: item.links?.find((link) => link.render === "image")?.href ?? null,
    };
};

export const getMarsRoverMedia = () => searchNasaImages("Mars rover Perseverance Curiosity");