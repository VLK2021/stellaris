export const NASA_API_BASE_URL = "https://api.nasa.gov";

export const EARTH_REVALIDATE_SECONDS = {
    eonet: 60 * 30,
    epic: 60 * 60 * 6,
    epicDates: 60 * 60 * 24,
    gibs: 60 * 60 * 24,
};

export const EONET_API_URL = "https://eonet.gsfc.nasa.gov/api/v3";

export const GIBS_WMTS_CAPABILITIES_URL =
    "https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/1.0.0/WMTSCapabilities.xml";

export const EONET_EVENT_LIMIT = 24;

export const EONET_STATUS_OPTIONS = ["all", "open", "closed"] as const;

export const EPIC_IMAGE_TYPES = ["natural", "enhanced"] as const;