export type MediaType =
    | "image"
    | "video"
    | "audio";

export type MediaSort =
    | "newest"
    | "oldest"
    | "titleAsc"
    | "titleDesc";

export type MediaFilters = {
    query: string;

    mediaType: MediaType | "all";

    center: string;

    yearStart: string;
    yearEnd: string;

    keywords: string[];

    page: number;

    sort: MediaSort;
};

export type MediaKeyword = {
    title: string;
};

export type MediaItemData = {
    nasa_id: string;

    title: string;

    description?: string;

    media_type: MediaType;

    center?: string;

    photographer?: string;

    location?: string;

    date_created?: string;

    keywords?: string[];
};

export type MediaItemLink = {
    href: string;
    rel?: string;
    render?: string;
};

export type MediaItem = {
    data: MediaItemData[];
    links?: MediaItemLink[];
};

export type MediaCollection = {
    items: MediaItem[];
};

export type MediaSearchResponse = {
    collection: MediaCollection;
};

export type MediaSearchQuery = {
    query?: string;

    mediaType?: MediaType;

    center?: string;

    yearStart?: string;

    yearEnd?: string;

    page?: number;
};

export type MediaAsset = {
    href: string;
};

export type MediaAssetResponse = {
    collection: {
        items: MediaAsset[];
    };
};

export type MediaDetails = {
    nasaId: string;

    title: string;

    description: string;

    mediaType: MediaType;

    dateCreated: string | null;

    center: string | null;

    location: string | null;

    photographer: string | null;

    keywords: string[];

    preview: string | null;

    assets: string[];
};

export type MediaApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
};