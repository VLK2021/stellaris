import {buildSpaceWeatherStats} from "@/src/helpers/space-weather/spaceWeatherStats.helpers";

import {getSpaceWeatherEvents} from "./donkiEvents.service";
import {getSpaceWeatherNotifications} from "./donkiNotifications.service";

export const getSpaceWeatherOverview = async ({
                                                  startDate,
                                                  endDate,
                                              }: {
    startDate: string;
    endDate: string;
}) => {
    const [eventsResult, notificationsResult] =
        await Promise.allSettled([
            getSpaceWeatherEvents({
                startDate,
                endDate,
                type: "all",
                page: 1,
                limit: 24,
            }),

            getSpaceWeatherNotifications({
                startDate,
                endDate,
                type: "all",
                page: 1,
                limit: 6,
            }),
        ]);

    const events =
        eventsResult.status === "fulfilled"
            ? eventsResult.value
            : {
                data: [],
                stats: buildSpaceWeatherStats([]),
            };

    const notifications =
        notificationsResult.status === "fulfilled"
            ? notificationsResult.value
            : {
                data: [],
            };

    return {
        stats: events.stats,
        latestEvents: events.data,
        latestNotifications: notifications.data,
    };
};