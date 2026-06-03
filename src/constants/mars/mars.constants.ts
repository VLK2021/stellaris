export const MARS_API_BASE_URL = "https://api.nasa.gov/mars-photos/api/v1";

export const MARS_REVALIDATE_SECONDS = {
    manifests: 60 * 60 * 12,
    photos: 60 * 10,
    overview: 60 * 10,
};

export const MARS_ROVERS = ["curiosity", "opportunity", "spirit"] as const;

export const MARS_SORT_OPTIONS = ["earth_date", "sol", "camera"] as const;
export const MARS_ORDER_OPTIONS = ["asc", "desc"] as const;