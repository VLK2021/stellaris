import type {
    EXOPLANET_ORDER_OPTIONS,
    EXOPLANET_SORT_OPTIONS,
} from "@/src/constants/exoplanets/exoplanets.constants";

export type ExoplanetSortBy = (typeof EXOPLANET_SORT_OPTIONS)[number];
export type ExoplanetOrder = (typeof EXOPLANET_ORDER_OPTIONS)[number];

export type ExoplanetPlanet = {
    pl_name: string | null;
    hostname: string | null;
    sy_dist: number | null;
    disc_year: number | null;
    discoverymethod: string | null;
    pl_rade: number | null;
    pl_bmasse: number | null;
    pl_orbper: number | null;
    pl_eqt: number | null;
    st_teff: number | null;
    st_rad: number | null;
    st_mass: number | null;
};

export type ExoplanetFilters = {
    search: string;
    discoveryMethod: string;
    yearFrom: string;
    yearTo: string;
    radiusMax: string;
    tempMin: string;
    tempMax: string;
    sortBy: ExoplanetSortBy;
    order: ExoplanetOrder;
    limit: number;
    page: number;
};