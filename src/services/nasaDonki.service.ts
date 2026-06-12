import type {NasaLiveDonki} from "@/src/types/nasaLive";
import {fetchNasaJson} from "./nasaClient.service";

export type DonkiDateParams = {
    startDate?: string;
    endDate?: string;
};

type DonkiEvent = {
    startTime?: string;
    eventTime?: string;
    peakTime?: string;
};

const getDateDaysAgo = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() - days);

    return date.toISOString().slice(0, 10);
};

const getToday = () => new Date().toISOString().slice(0, 10);

const getLatestDate = (events: DonkiEvent[]) => {
    const dates = events
        .map((event) => event.startTime || event.eventTime || event.peakTime)
        .filter(Boolean)
        .sort();

    return dates.at(-1) ?? null;
};

const getDonkiEvents = async <T>(
    endpoint: string,
    params: DonkiDateParams = {},
): Promise<T[]> => {
    try {
        return await fetchNasaJson<T[]>(`/DONKI/${endpoint}`, {
            params: {
                startDate: params.startDate ?? getDateDaysAgo(7),
                endDate: params.endDate ?? getToday(),
            },
            revalidate: 60 * 30,
            timeoutMs: 20000,
        });
    } catch {
        return [];
    }
};

export const getDonkiCme = (params?: DonkiDateParams) =>
    getDonkiEvents<DonkiEvent>("CME", params);

export const getDonkiCmeAnalysis = (params?: DonkiDateParams) =>
    getDonkiEvents<DonkiEvent>("CMEAnalysis", params);

export const getDonkiGst = (params?: DonkiDateParams) =>
    getDonkiEvents<DonkiEvent>("GST", params);

export const getDonkiIps = (params?: DonkiDateParams) =>
    getDonkiEvents<DonkiEvent>("IPS", params);

export const getDonkiFlr = (params?: DonkiDateParams) =>
    getDonkiEvents<DonkiEvent>("FLR", params);

export const getDonkiSep = (params?: DonkiDateParams) =>
    getDonkiEvents<DonkiEvent>("SEP", params);

export const getDonkiMpc = (params?: DonkiDateParams) =>
    getDonkiEvents<DonkiEvent>("MPC", params);

export const getDonkiRbe = (params?: DonkiDateParams) =>
    getDonkiEvents<DonkiEvent>("RBE", params);

export const getDonkiHss = (params?: DonkiDateParams) =>
    getDonkiEvents<DonkiEvent>("HSS", params);

export const getNasaDonkiSummary = async (): Promise<NasaLiveDonki> => {
    const params = {
        startDate: getDateDaysAgo(7),
        endDate: getToday(),
    };

    const [solarFlares, cmeEvents, geomagneticStorms] =
        await Promise.all([
            getDonkiFlr(params),
            getDonkiCme(params),
            getDonkiGst(params),
        ]);

    return {
        solarFlares: solarFlares.length,
        cmeEvents: cmeEvents.length,
        geomagneticStorms: geomagneticStorms.length,
        latestEventDate: getLatestDate([
            ...solarFlares,
            ...cmeEvents,
            ...geomagneticStorms,
        ]),
    };
};