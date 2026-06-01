import {
    EARTH_REVALIDATE_SECONDS,
    EONET_API_URL,
} from "@/src/constants/earth/earth.constants";

import {
    normalizeEonetEvent,
    paginateEarthItems,
} from "@/src/helpers/earth";

import {fetchEarthJson} from "./nasaEarthClient.service";

import type {
    EarthEventsQuery,
    EarthEventsResponse,
} from "@/src/types/earth/earth.types";

import type {RawEonetEventsResponse} from "@/src/types/earth/earthRaw.types";

export const getEonetEvents = async ({
                                         page = 1,
                                         limit = 24,
                                         status = "all",
                                         category,
                                     }: EarthEventsQuery): Promise<EarthEventsResponse> => {
    const response = await fetchEarthJson<RawEonetEventsResponse>({
        url: `${EONET_API_URL}/events`,
        revalidate: EARTH_REVALIDATE_SECONDS.eonet,
        withApiKey: false,
    });

    let events = (response.events ?? []).map(normalizeEonetEvent);

    if (status !== "all") {
        events = events.filter((event) => event.status === status);
    }

    if (category) {
        events = events.filter((event) =>
            event.categories.some(
                (item) =>
                    item.id === category ||
                    item.title.toLowerCase() === category.toLowerCase(),
            ),
        );
    }

    const result = paginateEarthItems({
        items: events,
        page,
        limit,
    });

    return {
        success: true,
        data: result.data,
        pagination: result.pagination,
    };
};