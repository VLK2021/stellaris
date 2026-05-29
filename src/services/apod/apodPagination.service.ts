
import {
    buildPaginationMeta,
    validateApodRange,
} from "@/src/helpers/apod/apodPagination.helper";
import {getNasaApodRange} from "@/src/services";

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
    validateApodRange(
        startDate,
        endDate,
    );

    const items = await getNasaApodRange({
        startDate,
        endDate,
        thumbs: true,
    });

    const sortedItems = [...items].sort(
        (a, b) =>
            new Date(b.date).getTime() -
            new Date(a.date).getTime(),
    );

    const totalItems = sortedItems.length;

    const startIndex =
        (page - 1) * limit;

    const endIndex =
        startIndex + limit;

    const paginatedItems =
        sortedItems.slice(
            startIndex,
            endIndex,
        );

    return {
        data: paginatedItems,
        pagination: buildPaginationMeta({
            page,
            limit,
            totalItems,
        }),
    };
};