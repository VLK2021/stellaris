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

import {validateDateRange} from "@/src/helpers/space-weather/spaceWeatherDate.helpers";

import type {
    SpaceWeatherEvent,
} from "@/src/types/space-weather/spaceWeather.types";

import type {
    SpaceWeatherEventDetails,
    SpaceWeatherEventDetailsQuery,
    SpaceWeatherRawEventPayload,
} from "@/src/types/space-weather/spaceWeatherEventDetails.types";

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

type NormalizedWithRaw = {
    event: SpaceWeatherEvent;
    raw: SpaceWeatherRawEventPayload;
};

const normalizeRawPayload = <T extends object>(
    item: T,
): SpaceWeatherRawEventPayload => {
    return item as SpaceWeatherRawEventPayload;
};

const getEventsByType = async ({
                                   type,
                                   startDate,
                                   endDate,
                               }: Pick<SpaceWeatherEventDetailsQuery, "type" | "startDate" | "endDate">): Promise<NormalizedWithRaw[]> => {
    if (type === "CME") {
        const items = await fetchDonkiRange<RawDonkiCme>({
            path: DONKI_API_PATHS.cme,
            startDate,
            endDate,
        });

        return items.map((item) => ({
            event: normalizeCme(item),
            raw: normalizeRawPayload(item),
        }));
    }

    if (type === "CME_ANALYSIS") {
        const items = await fetchDonkiRange<RawDonkiCmeAnalysis>({
            path: DONKI_API_PATHS.cmeAnalysis,
            startDate,
            endDate,
        });

        return items.map((item) => ({
            event: normalizeCmeAnalysis(item),
            raw: normalizeRawPayload(item),
        }));
    }

    if (type === "GST") {
        const items = await fetchDonkiRange<RawDonkiGst>({
            path: DONKI_API_PATHS.gst,
            startDate,
            endDate,
        });

        return items.map((item) => ({
            event: normalizeGst(item),
            raw: normalizeRawPayload(item),
        }));
    }

    if (type === "IPS") {
        const items = await fetchDonkiRange<RawDonkiIps>({
            path: DONKI_API_PATHS.ips,
            startDate,
            endDate,
        });

        return items.map((item) => ({
            event: normalizeIps(item),
            raw: normalizeRawPayload(item),
        }));
    }

    if (type === "FLR") {
        const items = await fetchDonkiRange<RawDonkiFlr>({
            path: DONKI_API_PATHS.flr,
            startDate,
            endDate,
        });

        return items.map((item) => ({
            event: normalizeFlr(item),
            raw: normalizeRawPayload(item),
        }));
    }

    if (type === "SEP") {
        const items = await fetchDonkiRange<RawDonkiSep>({
            path: DONKI_API_PATHS.sep,
            startDate,
            endDate,
        });

        return items.map((item) => ({
            event: normalizeSep(item),
            raw: normalizeRawPayload(item),
        }));
    }

    if (type === "MPC") {
        const items = await fetchDonkiRange<RawDonkiMpc>({
            path: DONKI_API_PATHS.mpc,
            startDate,
            endDate,
        });

        return items.map((item) => ({
            event: normalizeMpc(item),
            raw: normalizeRawPayload(item),
        }));
    }

    if (type === "RBE") {
        const items = await fetchDonkiRange<RawDonkiRbe>({
            path: DONKI_API_PATHS.rbe,
            startDate,
            endDate,
        });

        return items.map((item) => ({
            event: normalizeRbe(item),
            raw: normalizeRawPayload(item),
        }));
    }

    if (type === "HSS") {
        const items = await fetchDonkiRange<RawDonkiHss>({
            path: DONKI_API_PATHS.hss,
            startDate,
            endDate,
        });

        return items.map((item) => ({
            event: normalizeHss(item),
            raw: normalizeRawPayload(item),
        }));
    }

    if (type === "ENLIL") {
        const items = await fetchDonkiRange<RawDonkiEnlil>({
            path: DONKI_API_PATHS.enlil,
            startDate,
            endDate,
        });

        return items.map((item) => ({
            event: normalizeEnlil(item),
            raw: normalizeRawPayload(item),
        }));
    }

    return [];
};

const collectRelatedEvents = async ({
                                        event,
                                        startDate,
                                        endDate,
                                    }: {
    event: SpaceWeatherEvent;
    startDate: string;
    endDate: string;
}) => {
    const relatedIds = new Set(event.linkedEvents);

    if (!relatedIds.size) {
        return [];
    }

    const types: SpaceWeatherEvent["type"][] = [
        "CME",
        "CME_ANALYSIS",
        "GST",
        "IPS",
        "FLR",
        "SEP",
        "MPC",
        "RBE",
        "HSS",
        "ENLIL",
    ];

    const groups = await Promise.all(
        types.map((type) =>
            getEventsByType({
                type,
                startDate,
                endDate,
            }),
        ),
    );

    return groups
        .flat()
        .map((item) => item.event)
        .filter((item) => relatedIds.has(item.id));
};

export const getSpaceWeatherEventDetails = async ({
                                                      eventId,
                                                      type,
                                                      startDate,
                                                      endDate,
                                                  }: SpaceWeatherEventDetailsQuery): Promise<SpaceWeatherEventDetails> => {
    validateDateRange(startDate, endDate);

    if (!eventId) {
        throw new Error("Event ID is required.");
    }

    const items = await getEventsByType({
        type,
        startDate,
        endDate,
    });

    const found = items.find((item) => item.event.id === eventId);

    if (!found) {
        throw new Error("Space weather event was not found in selected date range.");
    }

    const relatedEvents = await collectRelatedEvents({
        event: found.event,
        startDate,
        endDate,
    });

    return {
        event: found.event,
        raw: found.raw,
        relatedEvents,
    };
};