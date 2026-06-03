import type {MarsPaginationMeta} from "@/src/types/mars/mars.types";

type Props<T> = {
    items: T[];
    page: number;
    limit: number;
};

export const paginateMarsItems = <T,>({
                                          items,
                                          page,
                                          limit,
                                      }: Props<T>): {
    data: T[];
    pagination: MarsPaginationMeta;
} => {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);

    const total = items.length;
    const totalPages = Math.max(1, Math.ceil(total / safeLimit));
    const start = (safePage - 1) * safeLimit;
    const end = start + safeLimit;

    return {
        data: items.slice(start, end),
        pagination: {
            page: safePage,
            limit: safeLimit,
            total,
            totalPages,
            hasNextPage: safePage < totalPages,
            hasPrevPage: safePage > 1,
        },
    };
};