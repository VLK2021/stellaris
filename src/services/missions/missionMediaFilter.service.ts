import type {MediaItem} from "@/src/types/media";

const BLOCKED_WORDS = [
    "anniversary",
    "celebration",
    "exhibit",
    "museum",
    "lego",
    "visitor",
    "national mall",
    "press site",
    "interview",
    "documentary",
    "tribute",
    "commemoration",
    "education",
    "student",
    "classroom",
];

const IMPORTANT_WORDS = [
    "launch",
    "landing",
    "crew",
    "spacecraft",
    "mission",
    "moon",
    "lunar",
    "orbit",
    "surface",
    "module",
    "rocket",
    "saturn",
    "mars",
    "jupiter",
    "probe",
    "rover",
    "lander",
    "orbiter",
];

const normalizeText = (value?: string | null) => {
    return value?.toLowerCase().trim() ?? "";
};

const getText = (item: MediaItem) => {
    const data = item.data[0];

    if (!data) return "";

    return [
        data.title,
        data.description,
        data.center,
        data.location,
        data.photographer,
        ...(data.keywords ?? []),
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
};

const hasBlockedWords = (item: MediaItem) => {
    const text = getText(item);

    return BLOCKED_WORDS.some((word) => text.includes(word));
};

const getMissionWordScore = (
    item: MediaItem,
    missionName: string,
) => {
    const text = getText(item);
    const missionWords = normalizeText(missionName)
        .split(/[\s-]+/)
        .filter((word) => word.length > 1);

    return missionWords.reduce((score, word) => {
        return text.includes(word) ? score + 3 : score;
    }, 0);
};

const getImportantWordScore = (item: MediaItem) => {
    const text = getText(item);

    return IMPORTANT_WORDS.reduce((score, word) => {
        return text.includes(word) ? score + 1 : score;
    }, 0);
};

const getDateScore = (item: MediaItem) => {
    const date = item.data[0]?.date_created;

    if (!date) return 0;

    const year = Number(date.slice(0, 4));

    if (Number.isNaN(year)) return 0;

    if (year >= 1958 && year <= 1985) return 4;
    if (year >= 1986 && year <= 2010) return 2;

    return 0;
};

const getMediaScore = (
    item: MediaItem,
    missionName: string,
) => {
    if (hasBlockedWords(item)) {
        return -100;
    }

    return (
        getMissionWordScore(item, missionName) +
        getImportantWordScore(item) +
        getDateScore(item)
    );
};

export const filterMissionMediaItems = (
    items: MediaItem[],
    missionName: string,
) => {
    return items
        .map((item) => ({
            item,
            score: getMediaScore(item, missionName),
        }))
        .filter(({score}) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({item}) => item);
};

export const getMissionMediaDebug = (
    items: MediaItem[],
    missionName: string,
) => {
    return items.slice(0, 30).map((item) => {
        const data = item.data[0];

        return {
            nasaId: data?.nasa_id ?? null,
            title: data?.title ?? null,
            mediaType: data?.media_type ?? null,
            dateCreated: data?.date_created ?? null,
            score: getMediaScore(item, missionName),
            blocked: hasBlockedWords(item),
            preview: item.links?.[0]?.href ?? null,
            keywords: data?.keywords ?? [],
        };
    });
};