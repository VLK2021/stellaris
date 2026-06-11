import {
    getMissionCatalogItemBySlug,
    MISSIONS_CATALOG,
} from "@/src/constants/missions";
import {searchMedia} from "@/src/services/media";

import {getWikidataMissionDetails} from "./wikidataMission.service";

import type {MissionAggregated} from "@/src/types/missions";

type WikipediaSummaryResponse = {
    title?: string;
    extract?: string;
    description?: string;
    thumbnail?: {
        source?: string;
    };
    content_urls?: {
        desktop?: {
            page?: string;
        };
    };
};

type WikidataSearchResponse = {
    search?: {
        id: string;
        label?: string;
        description?: string;
    }[];
};

const WIKIPEDIA_API = "https://en.wikipedia.org/api/rest_v1";
const WIKIDATA_API = "https://www.wikidata.org/w/api.php";

const fetchWikipediaSummary = async (
    title: string,
): Promise<WikipediaSummaryResponse | null> => {
    const response = await fetch(
        `${WIKIPEDIA_API}/page/summary/${encodeURIComponent(title)}`,
        {
            next: {
                revalidate: 60 * 60 * 24,
            },
        },
    );

    if (!response.ok) {
        return null;
    }

    return (await response.json()) as WikipediaSummaryResponse;
};

const fetchWikidataId = async (
    search: string,
): Promise<string | null> => {
    const params = new URLSearchParams();

    params.set("action", "wbsearchentities");
    params.set("search", search);
    params.set("language", "en");
    params.set("format", "json");
    params.set("origin", "*");
    params.set("limit", "1");

    const response = await fetch(`${WIKIDATA_API}?${params.toString()}`, {
        next: {
            revalidate: 60 * 60 * 24,
        },
    });

    if (!response.ok) {
        return null;
    }

    const data = (await response.json()) as WikidataSearchResponse;

    return data.search?.[0]?.id ?? null;
};

export const getMissionCatalog = () => {
    return MISSIONS_CATALOG;
};

export const getAggregatedMissionBySlug = async (
    slug: string,
): Promise<MissionAggregated | null> => {
    const mission = getMissionCatalogItemBySlug(slug);

    if (!mission) {
        return null;
    }

    const [wiki, wikidataId, mediaResponse] = await Promise.all([
        fetchWikipediaSummary(mission.wikipediaTitle),
        fetchWikidataId(mission.wikidataSearch),
        searchMedia({
            query: mission.nasaMediaQuery,
            page: 1,
        }),
    ]);

    const wikidata = await getWikidataMissionDetails(wikidataId);

    const mediaItems = mediaResponse.collection.items ?? [];

    const images = mediaItems.filter(
        (item) => item.data[0]?.media_type === "image",
    );

    const videos = mediaItems.filter(
        (item) => item.data[0]?.media_type === "video",
    );

    const audio = mediaItems.filter(
        (item) => item.data[0]?.media_type === "audio",
    );

    return {
        id: mission.slug,
        slug: mission.slug,
        title: wiki?.title ?? mission.name,
        description: wiki?.description ?? "",
        extract: wiki?.extract ?? "",
        thumbnail: wiki?.thumbnail?.source ?? null,
        wikipediaUrl: wiki?.content_urls?.desktop?.page ?? null,
        wikidataId,

        category: mission.category,
        target: mission.target,

        launchDate: wikidata.launchDate,
        endDate: wikidata.endDate,

        operators: wikidata.operators,
        launchVehicles: wikidata.launchVehicles,
        spacecraft: wikidata.spacecraft,
        crew: wikidata.crew,
        timeline: wikidata.timeline,

        media: {
            images: images.slice(0, 12),
            videos: videos.slice(0, 8),
            audio: audio.slice(0, 8),
            all: mediaItems.slice(0, 24),
        },

        source: {
            wikipedia: Boolean(wiki),
            wikidata: Boolean(wikidataId),
            nasaMedia: mediaItems.length > 0,
        },
    };
};