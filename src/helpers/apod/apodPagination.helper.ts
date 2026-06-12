import type {ApodPaginationMeta} from "@/src/types/apod/apodPagination.types";

export const MAX_APOD_RANGE_DAYS = 365;
export const APOD_CHUNK_DAYS = 30;

export const getDaysBetweenDates = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};

export const validateApodRange = (startDate: string, endDate: string) => {
    const days = getDaysBetweenDates(startDate, endDate);

    if (days < 0) {
        throw new Error("End date must be greater than start date");
    }

    if (days > MAX_APOD_RANGE_DAYS) {
        throw new Error(`Maximum period is ${MAX_APOD_RANGE_DAYS} days`);
    }
};

export const splitApodRangeIntoChunks = (
    startDate: string,
    endDate: string,
    chunkDays = APOD_CHUNK_DAYS,
) => {
    validateApodRange(startDate, endDate);

    const chunks: {startDate: string; endDate: string}[] = [];

    let current = new Date(startDate);
    const end = new Date(endDate);

    while (current <= end) {
        const chunkStart = new Date(current);
        const chunkEnd = new Date(current);

        chunkEnd.setDate(chunkEnd.getDate() + chunkDays - 1);

        if (chunkEnd > end) {
            chunkEnd.setTime(end.getTime());
        }

        chunks.push({
            startDate: chunkStart.toISOString().slice(0, 10),
            endDate: chunkEnd.toISOString().slice(0, 10),
        });

        current = new Date(chunkEnd);
        current.setDate(current.getDate() + 1);
    }

    return chunks;
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