import type {PaginationMeta} from "@/src/types/common/pagination.types";
import type {
    SpaceWeatherEvent,
    SpaceWeatherStats,
    SpaceWeatherTypeFilter,
} from "./spaceWeather.types";
import type {SpaceWeatherNotification} from "./spaceWeatherNotification.types";

export type SpaceWeatherTab = "overview" | "events" | "notifications";

export type SpaceWeatherExplorerState = {
    tab: SpaceWeatherTab;
    startDate: string;
    endDate: string;
    type: SpaceWeatherTypeFilter;
    page: number;
    limit: number;
};

export type SpaceWeatherOverviewData = {
    stats: SpaceWeatherStats;
    latestEvents: SpaceWeatherEvent[];
    latestNotifications: SpaceWeatherNotification[];
};

export type SpaceWeatherApiState = {
    overview: SpaceWeatherOverviewData | null;
    events: SpaceWeatherEvent[];
    notifications: SpaceWeatherNotification[];
    stats: SpaceWeatherStats | null;
    pagination: PaginationMeta | null;
    loading: boolean;
    error: string | null;
};

export type SpaceWeatherLocale = {
    badge: string;
    title: string;
    text: string;
    overview: string;
    events: string;
    notifications: string;
    startDate: string;
    endDate: string;
    type: string;
    load: string;
    loading: string;
    all: string;
    total: string;
    cme: string;
    cmeAnalysis: string;
    gst: string;
    ips: string;
    flr: string;
    sep: string;
    mpc: string;
    rbe: string;
    hss: string;
    enlil: string;
    strongestFlare: string;
    fastestCme: string;
    strongestStorm: string;
    latestEvent: string;
    speed: string;
    halfAngle: string;
    coordinates: string;
    kpIndex: string;
    classType: string;
    sourceLocation: string;
    activeRegion: string;
    catalog: string;
    instruments: string;
    linkedEvents: string;
    note: string;
    source: string;
    issueTime: string;
    noData: string;
    clear: string;
};