import type {PaginationMeta} from "@/src/types/common/pagination.types";

export type AsteroidDiameter = {
    minKm: number | null;
    maxKm: number | null;
    avgKm: number | null;
};

export type AsteroidCloseApproach = {
    date: string;
    fullDate: string;
    orbitingBody: string;
    velocityKmH: number | null;
    missDistanceKm: number | null;
    missDistanceLunar: number | null;
};

export type AsteroidItem = {
    id: string;
    neoReferenceId: string;
    name: string;
    nasaJplUrl: string | null;
    absoluteMagnitudeH: number | null;
    estimatedDiameter: AsteroidDiameter;
    isPotentiallyHazardous: boolean;
    isSentryObject: boolean;
    closeApproaches: AsteroidCloseApproach[];
};

export type AsteroidsFeedQuery = {
    startDate: string;
    endDate: string;
};

export type AsteroidsBrowseQuery = {
    page?: number;
    limit?: number;
};

export type AsteroidsFeedStats = {
    total: number;
    hazardous: number;
    safe: number;
    closest: AsteroidItem | null;
    fastest: AsteroidItem | null;
    largest: AsteroidItem | null;
};

export type AsteroidsApiResponse<T> = {
    success: boolean;
    data: T;
};

export type AsteroidsPaginatedApiResponse<T> = {
    success: boolean;
    data: T[];
    pagination: PaginationMeta;
};