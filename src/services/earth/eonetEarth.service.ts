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
    EarthEventDetailsResponse,
    EarthEventsQuery,
    EarthEventsResponse,
} from "@/src/types/earth/earth.types";

import type {
    RawEonetEvent,
    RawEonetEventsResponse,
} from "@/src/types/earth/earthRaw.types";

const sortEventsByLatestDate = (events: ReturnType<typeof normalizeEonetEvent>[]) => {
    return [...events].sort(
        (a, b) =>
            new Date(b.latestDate ?? 0).getTime() -
            new Date(a.latestDate ?? 0).getTime(),
    );
};

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

    let events = sortEventsByLatestDate(
        (response.events ?? []).map(normalizeEonetEvent),
    );

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

export const getEonetEventById = async (
    eventId: string,
): Promise<EarthEventDetailsResponse> => {
    if (!eventId) {
        throw new Error("Earth event id is required.");
    }

    const response = await fetchEarthJson<RawEonetEvent>({
        url: `${EONET_API_URL}/events/${encodeURIComponent(eventId)}`,
        revalidate: EARTH_REVALIDATE_SECONDS.eonet,
        withApiKey: false,
    });

    return {
        success: true,
        data: normalizeEonetEvent(response),
    };
};