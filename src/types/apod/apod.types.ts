export type ApodMediaType = "image" | "video" | "other";

export type ApodMode = "today" | "date" | "range" | "random";

export type ApodSort = "newest" | "oldest";

export type ApodMediaFilter = "all" | ApodMediaType;

export type ApodItem = {
    date: string;
    title: string;
    explanation: string;
    mediaType: ApodMediaType;
    url: string | null;
    hdUrl: string | null;
    thumbnailUrl: string | null;
    copyright: string | null;
    serviceVersion: string | null;
};

export type ApodExplorerQuery = {
    date?: string;
    startDate?: string;
    endDate?: string;
    count?: number;
    thumbs?: boolean;
};

export type ApodExplorerApiResponse = {
    success: boolean;
    data: ApodItem | ApodItem[];
};

export type ApodExplorerState = {
    mode: ApodMode;
    date: string;
    startDate: string;
    endDate: string;
    count: number;
    sort: ApodSort;
    mediaFilter: ApodMediaFilter;
};

export type ApodExplorerLocale = {
    badge: string;
    title: string;
    text: string;
    today: string;
    byDate: string;
    range: string;
    random: string;
    load: string;
    count: string;
    startDate: string;
    endDate: string;
    selectedDate: string;
    sort: string;
    newest: string;
    oldest: string;
    media: string;
    all: string;
    image: string;
    video: string;
    other: string;
    hd: string;
    source: string;
    copyright: string;
    explanation: string;
    noData: string;
    loading: string;
};