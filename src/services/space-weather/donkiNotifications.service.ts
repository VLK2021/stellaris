import {DONKI_API_PATHS} from "@/src/constants/space-weather/spaceWeather.constants";

import {validateDateRange} from "@/src/helpers/space-weather/spaceWeatherDate.helpers";
import {normalizeNotification} from "@/src/helpers/space-weather/spaceWeatherNotification.helpers";

import {
    buildPaginationMeta,
    normalizeLimit,
    normalizePage,
    paginateItems,
} from "@/src/helpers/space-weather/spaceWeatherPagination.helpers";

import type {
    RawDonkiNotification,
    SpaceWeatherNotificationsQuery,
    SpaceWeatherNotificationType,
} from "@/src/types/space-weather/spaceWeatherNotification.types";

import {fetchDonkiRange} from "./donkiClient.service";

const filterByNotificationType = (
    items: ReturnType<typeof normalizeNotification>[],
    type: SpaceWeatherNotificationType = "all",
) => {
    if (type === "all") return items;

    return items.filter(
        (item) => item.type.toLowerCase() === type.toLowerCase(),
    );
};

export const getSpaceWeatherNotifications = async ({
                                                       startDate,
                                                       endDate,
                                                       type = "all",
                                                       page,
                                                       limit,
                                                   }: SpaceWeatherNotificationsQuery) => {
    validateDateRange(startDate, endDate);

    const raw = await fetchDonkiRange<RawDonkiNotification>({
        path: DONKI_API_PATHS.notifications,
        startDate,
        endDate,
        extraParams: {
            type,
        },
        chunked: true,
    });

    const normalized = raw
        .map(normalizeNotification)
        .sort(
            (a, b) =>
                new Date(b.issueTime ?? 0).getTime() -
                new Date(a.issueTime ?? 0).getTime(),
        );

    const filtered = filterByNotificationType(normalized, type);

    const currentPage = normalizePage(page);
    const pageSize = normalizeLimit(limit);

    return {
        data: paginateItems(filtered, currentPage, pageSize),
        pagination: buildPaginationMeta({
            page: currentPage,
            limit: pageSize,
            totalItems: filtered.length,
        }),
    };
};