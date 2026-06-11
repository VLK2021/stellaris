import type {MediaItem} from "@/src/types/media";
import type {
    MissionAggregated,
    MissionAggregatedCrewMember,
    MissionNamedEntity,
    MissionTimelineEvent,
} from "@/src/types/missions";

type NormalizeMissionPayload = {
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
    mediaItems: MediaItem[];
    source: MissionAggregated["source"];
};

export const normalizeMission = ({
                                     id,
                                     slug,
                                     title,
                                     description,
                                     extract,
                                     thumbnail,
                                     wikipediaUrl,
                                     wikidataId,
                                     category,
                                     target,
                                     launchDate,
                                     endDate,
                                     operators,
                                     launchVehicles,
                                     spacecraft,
                                     crew,
                                     timeline,
                                     mediaItems,
                                     source,
                                 }: NormalizeMissionPayload): MissionAggregated => {
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
        id,
        slug,
        title,
        description,
        extract,
        thumbnail,
        wikipediaUrl,
        wikidataId,

        category,
        target,

        launchDate,
        endDate,

        operators,
        launchVehicles,
        spacecraft,
        crew,
        timeline,

        media: {
            images: images.slice(0, 12),
            videos: videos.slice(0, 8),
            audio: audio.slice(0, 8),
            all: mediaItems.slice(0, 24),
        },

        source,
    };
};