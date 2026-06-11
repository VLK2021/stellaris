import type {MediaItem} from "@/src/types/media";

export type MissionAggregatedCrewMember = {
    name: string;
    role: string | null;
};

export type MissionAggregated = {
    id: string;
    title: string;
    description: string;
    extract: string;
    thumbnail: string | null;
    wikipediaUrl: string | null;
    wikidataId: string | null;
    media: MediaItem[];
    crew: MissionAggregatedCrewMember[];
    source: {
        wikipedia: boolean;
        wikidata: boolean;
        nasaMedia: boolean;
    };
};