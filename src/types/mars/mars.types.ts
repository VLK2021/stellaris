import type {
    MARS_ORDER_OPTIONS,
    MARS_ROVERS,
    MARS_SORT_OPTIONS,
} from "@/src/constants/mars/mars.constants";

export type MarsRoverName = (typeof MARS_ROVERS)[number];
export type MarsSortBy = (typeof MARS_SORT_OPTIONS)[number];
export type MarsOrder = (typeof MARS_ORDER_OPTIONS)[number];

export type MarsCamera = {
    id: number | null;
    name: string;
    fullName: string;
    roverId: number | null;
};

export type MarsRover = {
    id: number | null;
    name: string;
    landingDate: string | null;
    launchDate: string | null;
    status: string | null;
    maxSol: number | null;
    maxDate: string | null;
    totalPhotos: number;
    cameras: MarsCamera[];
};

export type MarsPhoto = {
    id: number;
    sol: number;
    imgSrc: string;
    earthDate: string;
    camera: MarsCamera;
    rover: MarsRover;
    raw: Record<string, unknown>;
};

export type MarsManifestPhotoDay = {
    sol: number;
    earthDate: string;
    totalPhotos: number;
    cameras: string[];
};

export type MarsManifest = {
    rover: MarsRover;
    photos: MarsManifestPhotoDay[];
};

export type MarsPaginationMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};

export type MarsPhotosQuery = {
    rover?: MarsRoverName;
    camera?: string;
    earthDate?: string;
    sol?: number;
    page?: number;
    limit?: number;
    sortBy?: MarsSortBy;
    order?: MarsOrder;
};

export type MarsPhotosResponse = {
    success: boolean;
    data: MarsPhoto[];
    pagination: MarsPaginationMeta;
};

export type MarsRoversResponse = {
    success: boolean;
    data: MarsRover[];
};

export type MarsManifestResponse = {
    success: boolean;
    data: MarsManifest;
};

export type MarsOverview = {
    rovers: MarsRover[];
    latestPhotos: MarsPhoto[];
    stats: {
        rovers: number;
        activeRovers: number;
        totalPhotos: number;
        latestEarthDate: string | null;
    };
};

export type MarsOverviewResponse = {
    success: boolean;
    data: MarsOverview;
};