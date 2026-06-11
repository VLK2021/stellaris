import type {MediaItem, MediaType} from "@/src/types/media";
import type {
    MissionAggregated,
    MissionAggregatedCrewMember,
    MissionMediaResource,
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

const getPreview = (item: MediaItem) => {
    return item.links?.find((link) => link.render === "image")?.href ?? item.links?.[0]?.href ?? null;
};

const normalizeMediaItem = (item: MediaItem): MissionMediaResource | null => {
    const data = item.data[0];

    if (!data) return null;

    return {
        nasaId: data.nasa_id,
        title: data.title,
        description: data.description ?? "",
        mediaType: data.media_type,
        preview: getPreview(item),
        center: data.center ?? null,
        dateCreated: data.date_created ?? null,
        keywords: data.keywords ?? [],
    };
};

const filterByType = (
    items: MissionMediaResource[],
    type: MediaType,
) => {
    return items.filter((item) => item.mediaType === type);
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
    const normalizedMedia = mediaItems
        .map(normalizeMediaItem)
        .filter(Boolean) as MissionMediaResource[];

    const images = filterByType(normalizedMedia, "image");
    const videos = filterByType(normalizedMedia, "video");
    const audio = filterByType(normalizedMedia, "audio");

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
            all: normalizedMedia.slice(0, 24),
        },

        source,
    };
};