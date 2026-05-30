export const DONKI_API_PATHS = {
    cme: "/DONKI/CME",
    cmeAnalysis: "/DONKI/CMEAnalysis",
    gst: "/DONKI/GST",
    ips: "/DONKI/IPS",
    flr: "/DONKI/FLR",
    sep: "/DONKI/SEP",
    mpc: "/DONKI/MPC",
    rbe: "/DONKI/RBE",
    hss: "/DONKI/HSS",
    enlil: "/DONKI/WSAEnlilSimulations",
    notifications: "/DONKI/notifications",
};

export const SPACE_WEATHER_EVENT_TYPES = [
    "all",
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
] as const;

export const SPACE_WEATHER_DEFAULT_PAGE = 1;
export const SPACE_WEATHER_DEFAULT_LIMIT = 24;
export const SPACE_WEATHER_MAX_LIMIT = 96;

export const SPACE_WEATHER_CHUNK_DAYS = 30;