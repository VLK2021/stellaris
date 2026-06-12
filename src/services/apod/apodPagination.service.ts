import {
    buildPaginationMeta,
    splitApodRangeIntoChunks,
    validateApodRange,
} from "@/src/helpers/apod/apodPagination.helper";

import {getApodExplorerData} from "@/src/services/apod/apodExplorer.service";

import type {ApodItem} from "@/src/types/apod/apod.types";

const APOD_RANGE_CACHE_TTL = 1000 * 60 * 30;

type CacheItem = {
    data: ApodItem[];
    expiresAt: number;
};

const cache = new Map<string, CacheItem>();

const getCacheKey = (startDate: string, endDate: string) => {
    return `${startDate}:${endDate}`;
};

const getCachedRange = (startDate: string, endDate: string) => {
    const cached = cache.get(getCacheKey(startDate, endDate));

    if (!cached || cached.expiresAt < Date.now()) {
        return null;
    }

    return cached.data;
};

const setCachedRange = (
    startDate: string,
    endDate: string,
    data: ApodItem[],
) => {
    cache.set(getCacheKey(startDate, endDate), {
        data,
        expiresAt: Date.now() + APOD_RANGE_CACHE_TTL,
    });
};

const asArray = (data: ApodItem | ApodItem[]) => {
    return Array.isArray(data) ? data : [data];
};

export const getPaginatedApod = async ({
                                           startDate,
                                           endDate,
                                           page = 1,
                                           limit = 24,
                                       }: {
    startDate: string;
    endDate: string;
    page?: number;
    limit?: number;
}) => {
    validateApodRange(startDate, endDate);

    const cached = getCachedRange(startDate, endDate);

    const items =
        cached ??
        (
            await Promise.allSettled(
                splitApodRangeIntoChunks(startDate, endDate).map((chunk) =>
                    getApodExplorerData({
                        startDate: chunk.startDate,
                        endDate: chunk.endDate,
                        thumbs: true,
                    }),
                ),
            )
        )
            .filter((result) => result.status === "fulfilled")
            .flatMap((result) => asArray(result.value));

    if (!cached) {
        setCachedRange(startDate, endDate, items);
    }

    const sortedItems = [...items].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    const safePage = page < 1 ? 1 : page;
    const safeLimit = limit < 1 ? 24 : limit;

    const startIndex = (safePage - 1) * safeLimit;
    const endIndex = startIndex + safeLimit;

    return {
        data: sortedItems.slice(startIndex, endIndex),
        pagination: buildPaginationMeta({
            page: safePage,
            limit: safeLimit,
            totalItems: sortedItems.length,
        }),
    };
};