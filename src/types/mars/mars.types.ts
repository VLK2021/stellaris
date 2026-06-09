export type MarsRoverName =
    | "curiosity"
    | "opportunity"
    | "spirit"
    | "perseverance";

export type MarsRoverStatus = "active" | "complete";

export type MarsPhotoCamera = {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
};

export type MarsPhotoRover = {
    id: number;
    name: string;
    landing_date: string | null;
    launch_date: string | null;
    status: MarsRoverStatus | null;
};

export type MarsPhoto = {
    id: number;
    sol: number;
    camera: MarsPhotoCamera;
    img_src: string;
    earth_date: string;
    rover: MarsPhotoRover;
};

export type MarsRoverSummary = {
    name: MarsRoverName;
    label: string;
    landingDate: string;
    launchDate: string;
    status: MarsRoverStatus;
    maxSol: number;
    maxDate: string;
    totalPhotos: number;
    defaultEarthDate: string;
    defaultSol: number;
    cameras: string[];
};

export type MarsPhotosQuery = {
    rover: MarsRoverName;
    sol?: number;
    earthDate?: string;
    camera?: string;
    page?: number;
};

export type MarsPhotosResponse = {
    photos: MarsPhoto[];
    query: MarsPhotosQuery;
    meta: {
        page: number;
        pageSize: number;
        count: number;
        hasNextPage: boolean;
    };
};

export type MarsFilters = {
    rovers: {
        name: MarsRoverName;
        label: string;
        status: MarsRoverStatus;
        cameras: string[];
        defaultEarthDate: string;
        defaultSol: number;
        maxDate: string;
        maxSol: number;
    }[];
};

export type MarsOverview = {
    rovers: MarsRoverSummary[];
    latestPhotos: MarsPhoto[];
    stats: {
        rovers: number;
        activeRovers: number;
        totalPhotos: number;
        latestEarthDate: string | null;
    };
};

export type MarsApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
};