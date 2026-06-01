import type {
    EONET_STATUS_OPTIONS,
    EPIC_IMAGE_TYPES,
} from "@/src/constants/earth/earth.constants";

export type EarthModule = "overview" | "events" | "epic" | "layers";

export type EonetStatus = (typeof EONET_STATUS_OPTIONS)[number];

export type EpicImageType = (typeof EPIC_IMAGE_TYPES)[number];

export type EarthSortOrder = "asc" | "desc";

export type EarthPaginationMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};

export type EarthEventCategory = {
    id: string;
    title: string;
};

export type EarthEventSource = {
    id: string;
    url: string;
};

export type EarthEventGeometry = {
    date: string | null;
    type: string | null;
    coordinates: number[] | null;
};

export type EarthEvent = {
    id: string;
    title: string;
    description: string | null;
    link: string | null;
    closed: string | null;
    status: "open" | "closed";
    categories: EarthEventCategory[];
    sources: EarthEventSource[];
    geometry: EarthEventGeometry[];
    latestDate: string | null;
    coordinates: number[] | null;
    geometryCount: number;
    sourceCount: number;
    raw: Record<string, unknown>;
};

export type EarthEventsSortBy =
    | "title"
    | "status"
    | "latestDate"
    | "geometryCount"
    | "sourceCount";

export type EarthEventsQuery = {
    status?: EonetStatus;
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: EarthEventsSortBy;
    order?: EarthSortOrder;
};

export type EarthEventsResponse = {
    success: boolean;
    data: EarthEvent[];
    pagination: EarthPaginationMeta;
};

export type EarthEventDetailsResponse = {
    success: boolean;
    data: EarthEvent;
};

export type EpicCoordinates = {
    lat: number | null;
    lon: number | null;
};

export type EpicVector = {
    x: number | null;
    y: number | null;
    z: number | null;
};

export type EpicImage = {
    id: string;
    identifier: string;
    caption: string;
    image: string;
    version: string | null;
    date: string;
    imageUrl: string;
    type: EpicImageType;
    centroidCoordinates: EpicCoordinates;
    dscovrPosition: EpicVector;
    lunarPosition: EpicVector;
    sunPosition: EpicVector;
    raw: Record<string, unknown>;
};

export type EpicQuery = {
    type?: EpicImageType;
    date?: string;
    page?: number;
    limit?: number;
};

export type EpicResponse = {
    success: boolean;
    data: EpicImage[];
    pagination: EarthPaginationMeta;
};

export type EarthLayer = {
    id: string;
    title: string;
    abstract: string | null;
    format: string | null;
    tileMatrixSet: string | null;
    resourceUrl: string | null;
    source: "NASA GIBS WMTS";
};

export type EarthLayersSortBy = "title" | "id" | "format";

export type EarthLayersQuery = {
    page?: number;
    limit?: number;
    search?: string;
    format?: string;
    sortBy?: EarthLayersSortBy;
    order?: EarthSortOrder;
};

export type EarthLayersResponse = {
    success: boolean;
    data: EarthLayer[];
    pagination: EarthPaginationMeta;
};

export type EarthOverview = {
    events: EarthEvent[];
    epicImages: EpicImage[];
    layers: EarthLayer[];
    stats: {
        activeEvents: number;
        closedEvents: number;
        epicImages: number;
        layers: number;
    };
};

export type EarthOverviewResponse = {
    success: boolean;
    data: EarthOverview;
};