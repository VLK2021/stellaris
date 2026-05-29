import {fetchNasaJson} from "@/src/services/nasaClient.service";

import {
    ASTEROIDS_API_PATHS,
    ASTEROIDS_DEFAULT_LIMIT,
    ASTEROIDS_DEFAULT_PAGE,
    ASTEROIDS_MAX_LIMIT,
} from "@/src/constants/asteroids/asteroids.constants";

import {normalizeAsteroid} from "@/src/helpers/asteroids/asteroids.helpers";

import type {PaginationMeta} from "@/src/types/common/pagination.types";
import type {RawNeoBrowseResponse} from "@/src/types/asteroids/asteroidsRaw.types";

const normalizePage = (page?: number) => {
    if (!page || page < 1) return ASTEROIDS_DEFAULT_PAGE;
    return page;
};

const normalizeLimit = (limit?: number) => {
    if (!limit || limit < 1) return ASTEROIDS_DEFAULT_LIMIT;
    return Math.min(limit, ASTEROIDS_MAX_LIMIT);
};

export const getAsteroidsBrowse = async ({
                                             page,
                                             limit,
                                         }: {
    page?: number;
    limit?: number;
}) => {
    const currentPage = normalizePage(page);
    const pageSize = normalizeLimit(limit);

    const response = await fetchNasaJson<RawNeoBrowseResponse>(
        ASTEROIDS_API_PATHS.browse,
        {
            params: {
                page: currentPage - 1,
                size: pageSize,
            },
            revalidate: 60 * 60,
            timeoutMs: 60000,
        },
    );

    const nasaPage = response.page;

    const pagination: PaginationMeta = {
        page: (nasaPage?.number ?? 0) + 1,
        limit: nasaPage?.size ?? pageSize,
        totalItems: nasaPage?.total_elements ?? 0,
        totalPages: nasaPage?.total_pages ?? 1,
        hasNext: ((nasaPage?.number ?? 0) + 1) < (nasaPage?.total_pages ?? 1),
        hasPrev: (nasaPage?.number ?? 0) > 0,
    };

    return {
        items: (response.near_earth_objects ?? []).map(normalizeAsteroid),
        pagination,
    };
};