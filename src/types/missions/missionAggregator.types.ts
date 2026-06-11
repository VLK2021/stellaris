import type {MediaItem} from "@/src/types/media";

export type MissionSourceStatus = {
    wikipedia: boolean;
    wikidata: boolean;
    nasaMedia: boolean;
};

export type MissionNamedEntity = {
    id: string;
    label: string;
};

export type MissionAggregatedCrewMember = {
    id: string;
    name: string;
    role: string | null;
};

export type MissionTimelineEvent = {
    label: string;
    date: string;
};

export type MissionAggregated = {
    id: string;
    slug: string;
    title: string;
    description: string;
    extract: string;
    thumbnail: string | null;
    wikipediaUrl: string | null;
    wikidataId: string | null;

    category: string;
    target: string;

    launchDate: string | null;
    endDate: string | null;

    operators: MissionNamedEntity[];
    launchVehicles: MissionNamedEntity[];
    spacecraft: MissionNamedEntity[];
    crew: MissionAggregatedCrewMember[];

    timeline: MissionTimelineEvent[];

    media: {
        images: MediaItem[];
        videos: MediaItem[];
        audio: MediaItem[];
        all: MediaItem[];
    };

    source: MissionSourceStatus;
};