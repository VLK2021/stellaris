import type {ApodItem} from "./apod.types";

export type ApodPaginationMeta = {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

export type ApodPaginatedResponse = {
    success: boolean;
    data: ApodItem[];
    pagination: ApodPaginationMeta;
};

export type ApodPaginationQuery = {
    page?: string;
    limit?: string;

    date?: string;

    startDate?: string;
    endDate?: string;

    count?: string;
    thumbs?: string;
};