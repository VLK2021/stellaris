import type {EarthPaginationMeta} from "@/src/types/earth/earth.types";

export const paginateEarthItems = <T>({
    items,
    page = 1,
    limit = 24,
}: {
    items: T[];
    page?: number;
    limit?: number;
}) => {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);

    const total = items.length;
    const totalPages = Math.max(1, Math.ceil(total / safeLimit));
    const start = (safePage - 1) * safeLimit;

    const data = items.slice(start, start + safeLimit);

    const pagination: EarthPaginationMeta = {
        page: safePage,
        limit: safeLimit,
        total,
        totalPages,
        hasNextPage: safePage < totalPages,
        hasPrevPage: safePage > 1,
    };

    return {
        data,
        pagination,
    };
};