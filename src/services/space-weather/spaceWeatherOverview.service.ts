import {getSpaceWeatherEvents} from "./donkiEvents.service";
import {getSpaceWeatherNotifications} from "./donkiNotifications.service";

export const getSpaceWeatherOverview = async ({
                                                  startDate,
                                                  endDate,
                                              }: {
    startDate: string;
    endDate: string;
}) => {
    const [events, notifications] = await Promise.all([
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

    return {
        stats: events.stats,
        latestEvents: events.data,
        latestNotifications: notifications.data,
    };
};