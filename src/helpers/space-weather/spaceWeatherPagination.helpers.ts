import {
    SPACE_WEATHER_DEFAULT_LIMIT,
    SPACE_WEATHER_DEFAULT_PAGE,
    SPACE_WEATHER_MAX_LIMIT,
} from "@/src/constants/space-weather/spaceWeather.constants";

import type {PaginationMeta} from "@/src/types/common/pagination.types";

export const normalizePage = (value?: number) => {
    if (!value || value < 1) return SPACE_WEATHER_DEFAULT_PAGE;
    return value;
};

export const normalizeLimit = (value?: number) => {
    if (!value || value < 1) return SPACE_WEATHER_DEFAULT_LIMIT;
    return Math.min(value, SPACE_WEATHER_MAX_LIMIT);
};

export const paginateItems = <T>(
    items: T[],
    page: number,
    limit: number,
) => {
    const startIndex = (page - 1) * limit;
    return items.slice(startIndex, startIndex + limit);
};

export const buildPaginationMeta = ({
                                        page,
                                        limit,
                                        totalItems,
                                    }: {
    page: number;
    limit: number;
    totalItems: number;
}): PaginationMeta => {
    const totalPages = Math.max(1, Math.ceil(totalItems / limit));

    return {
        page,
        limit,
        totalItems,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
    };
};