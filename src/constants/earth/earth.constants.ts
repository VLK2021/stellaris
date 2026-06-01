export const NASA_API_BASE_URL = "https://api.nasa.gov";

export const EARTH_REVALIDATE_SECONDS = {
    eonet: 60 * 30,
    epic: 60 * 60 * 6,
    epicDates: 60 * 60 * 24,
    gibs: 60 * 60 * 24,
};

export const EONET_API_URL = "https://eonet.gsfc.nasa.gov/api/v3";

export const EONET_EVENT_LIMIT = 24;

export const EONET_STATUS_OPTIONS = ["all", "open", "closed"] as const;

export const EPIC_IMAGE_TYPES = ["natural", "enhanced"] as const;

export const GIBS_SAMPLE_LAYERS = [
    {
        id: "VIIRS_SNPP_CorrectedReflectance_TrueColor",
        title: "VIIRS SNPP Corrected Reflectance True Color",
        type: "Global imagery",
        source: "GIBS / Worldview",
    },
    {
        id: "MODIS_Terra_CorrectedReflectance_TrueColor",
        title: "MODIS Terra Corrected Reflectance True Color",
        type: "Global imagery",
        source: "GIBS / Worldview",
    },
    {
        id: "VIIRS_Black_Marble",
        title: "VIIRS Black Marble Night Lights",
        type: "Night imagery",
        source: "GIBS / Worldview",
    },
] as const;