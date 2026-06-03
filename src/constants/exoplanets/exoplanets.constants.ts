export const EXOPLANET_TAP_SYNC_URL =
    "https://exoplanetarchive.ipac.caltech.edu/TAP/sync";

export const EXOPLANET_DEFAULT_LIMIT = 24;

export const EXOPLANET_COLUMNS = [
    "pl_name",
    "hostname",
    "sy_dist",
    "disc_year",
    "discoverymethod",
    "pl_rade",
    "pl_bmasse",
    "pl_orbper",
    "pl_eqt",
    "st_teff",
    "st_rad",
    "st_mass",
] as const;

export const EXOPLANET_SORT_OPTIONS = [
    "pl_name",
    "disc_year",
    "sy_dist",
    "pl_rade",
    "pl_bmasse",
    "pl_eqt",
] as const;

export const EXOPLANET_ORDER_OPTIONS = ["asc", "desc"] as const;