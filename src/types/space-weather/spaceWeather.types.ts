import type {PaginationMeta} from "@/src/types/common/pagination.types";

export type SpaceWeatherEventType =
    | "CME"
    | "CME_ANALYSIS"
    | "GST"
    | "IPS"
    | "FLR"
    | "SEP"
    | "MPC"
    | "RBE"
    | "HSS"
    | "ENLIL";

export type SpaceWeatherTypeFilter = SpaceWeatherEventType | "all";

export type SpaceWeatherEvent = {
    id: string;
    type: SpaceWeatherEventType;
    title: string;
    startTime: string | null;
    endTime: string | null;
    sourceLocation: string | null;
    activeRegionNum: number | null;
    classType: string | null;
    speed: number | null;
    halfAngle: number | null;
    latitude: number | null;
    longitude: number | null;
    kpIndex: number | null;
    catalog: string | null;
    note: string | null;
    link: string | null;
    instruments: string[];
    linkedEvents: string[];
};

export type SpaceWeatherStats = {
    total: number;
    cme: number;
    cmeAnalysis: number;
    gst: number;
    ips: number;
    flr: number;
    sep: number;
    mpc: number;
    rbe: number;
    hss: number;
    enlil: number;
    strongestFlare: SpaceWeatherEvent | null;
    fastestCme: SpaceWeatherEvent | null;
    strongestStorm: SpaceWeatherEvent | null;
    latestEvent: SpaceWeatherEvent | null;
};

export type SpaceWeatherEventsQuery = {
    startDate: string;
    endDate: string;
    type?: SpaceWeatherTypeFilter;
    page?: number;
    limit?: number;
};

export type SpaceWeatherEventsResponse = {
    success: boolean;
    data: SpaceWeatherEvent[];
    stats: SpaceWeatherStats;
    pagination: PaginationMeta;
};