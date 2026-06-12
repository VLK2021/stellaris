import {DONKI_API_PATHS} from "@/src/constants/space-weather/spaceWeather.constants";

import {
    normalizeCme,
    normalizeCmeAnalysis,
    normalizeEnlil,
    normalizeFlr,
    normalizeGst,
    normalizeHss,
    normalizeIps,
    normalizeMpc,
    normalizeRbe,
    normalizeSep,
} from "@/src/helpers/space-weather/spaceWeatherNormalize.helpers";

import {buildSpaceWeatherStats} from "@/src/helpers/space-weather/spaceWeatherStats.helpers";

import {
    buildPaginationMeta,
    normalizeLimit,
    normalizePage,
    paginateItems,
} from "@/src/helpers/space-weather/spaceWeatherPagination.helpers";

import {validateDateRange} from "@/src/helpers/space-weather/spaceWeatherDate.helpers";

import type {
    SpaceWeatherEvent,
    SpaceWeatherEventsQuery,
    SpaceWeatherTypeFilter,
} from "@/src/types/space-weather/spaceWeather.types";

import type {
    RawDonkiCme,
    RawDonkiCmeAnalysis,
    RawDonkiEnlil,
    RawDonkiFlr,
    RawDonkiGst,
    RawDonkiHss,
    RawDonkiIps,
    RawDonkiMpc,
    RawDonkiRbe,
    RawDonkiSep,
} from "@/src/types/space-weather/spaceWeatherRaw.types";

import {fetchDonkiRange} from "./donkiClient.service";

const sortEventsByDateDesc = (events: SpaceWeatherEvent[]) => {
    return [...events].sort(
        (a, b) =>
            new Date(b.startTime ?? 0).getTime() -
            new Date(a.startTime ?? 0).getTime(),
    );
};

const filterByType = (
    events: SpaceWeatherEvent[],
    type: SpaceWeatherTypeFilter = "all",
) => {
    if (type === "all") return events;

    return events.filter((event) => event.type === type);
};

const getFulfilledValue = <T>(
    result: PromiseSettledResult<T[]>,
): T[] => {
    if (result.status === "fulfilled") {
        return result.value;
    }

    return [];
};

export const getSpaceWeatherEvents = async ({
                                                startDate,
                                                endDate,
                                                type = "all",
                                                page,
                                                limit,
                                            }: SpaceWeatherEventsQuery) => {
    validateDateRange(startDate, endDate);

    const [
        cmeResult,
        cmeAnalysisResult,
        gstResult,
        ipsResult,
        flrResult,
        sepResult,
        mpcResult,
        rbeResult,
        hssResult,
        enlilResult,
    ] = await Promise.allSettled([
        fetchDonkiRange<RawDonkiCme>({
            path: DONKI_API_PATHS.cme,
            startDate,
            endDate,
        }),

        fetchDonkiRange<RawDonkiCmeAnalysis>({
            path: DONKI_API_PATHS.cmeAnalysis,
            startDate,
            endDate,
        }),

        fetchDonkiRange<RawDonkiGst>({
            path: DONKI_API_PATHS.gst,
            startDate,
            endDate,
        }),

        fetchDonkiRange<RawDonkiIps>({
            path: DONKI_API_PATHS.ips,
            startDate,
            endDate,
        }),

        fetchDonkiRange<RawDonkiFlr>({
            path: DONKI_API_PATHS.flr,
            startDate,
            endDate,
        }),

        fetchDonkiRange<RawDonkiSep>({
            path: DONKI_API_PATHS.sep,
            startDate,
            endDate,
        }),

        fetchDonkiRange<RawDonkiMpc>({
            path: DONKI_API_PATHS.mpc,
            startDate,
            endDate,
        }),

        fetchDonkiRange<RawDonkiRbe>({
            path: DONKI_API_PATHS.rbe,
            startDate,
            endDate,
        }),

        fetchDonkiRange<RawDonkiHss>({
            path: DONKI_API_PATHS.hss,
            startDate,
            endDate,
        }),

        fetchDonkiRange<RawDonkiEnlil>({
            path: DONKI_API_PATHS.enlil,
            startDate,
            endDate,
        }),
    ]);

    const cme = getFulfilledValue(cmeResult).map(normalizeCme);
    const cmeAnalysis =
        getFulfilledValue(cmeAnalysisResult).map(normalizeCmeAnalysis);
    const gst = getFulfilledValue(gstResult).map(normalizeGst);
    const ips = getFulfilledValue(ipsResult).map(normalizeIps);
    const flr = getFulfilledValue(flrResult).map(normalizeFlr);
    const sep = getFulfilledValue(sepResult).map(normalizeSep);
    const mpc = getFulfilledValue(mpcResult).map(normalizeMpc);
    const rbe = getFulfilledValue(rbeResult).map(normalizeRbe);
    const hss = getFulfilledValue(hssResult).map(normalizeHss);
    const enlil = getFulfilledValue(enlilResult).map(normalizeEnlil);

    const allEvents: SpaceWeatherEvent[] = [
        ...cme,
        ...cmeAnalysis,
        ...gst,
        ...ips,
        ...flr,
        ...sep,
        ...mpc,
        ...rbe,
        ...hss,
        ...enlil,
    ];

    const sortedEvents = sortEventsByDateDesc(allEvents);
    const filteredEvents = filterByType(sortedEvents, type);

    const currentPage = normalizePage(page);
    const pageSize = normalizeLimit(limit);

    return {
        data: paginateItems(filteredEvents, currentPage, pageSize),
        stats: buildSpaceWeatherStats(sortedEvents),
        pagination: buildPaginationMeta({
            page: currentPage,
            limit: pageSize,
            totalItems: filteredEvents.length,
        }),
    };
};