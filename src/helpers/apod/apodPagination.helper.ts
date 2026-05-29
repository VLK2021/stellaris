import type {ApodPaginationMeta} from "@/src/types/apod/apodPagination.types";

export const MAX_APOD_RANGE_DAYS = 365;

export const getDaysBetweenDates = (
    startDate: string,
    endDate: string,
) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diff = end.getTime() - start.getTime();

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const validateApodRange = (
    startDate: string,
    endDate: string,
) => {
    const days = getDaysBetweenDates(
        startDate,
        endDate,
    );

    if (days > MAX_APOD_RANGE_DAYS) {
        throw new Error(
            `Maximum period is ${MAX_APOD_RANGE_DAYS} days`,
        );
    }
};

export const buildPaginationMeta = ({
                                        page,
                                        limit,
                                        totalItems,
                                    }: {
    page: number;
    limit: number;
    totalItems: number;
}): ApodPaginationMeta => {
    const totalPages = Math.ceil(
        totalItems / limit,
    );

    return {
        page,
        limit,
        totalItems,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
    };
};