export type AtmosphereItem = {
    pl_name: string | null;
    hostname: string | null;
    sy_dist: number | null;
    disc_year: number | null;
    discoverymethod: string | null;
    pl_rade: number | null;
    pl_bmasse: number | null;
    pl_orbper: number | null;
    pl_eqt: number | null;
    pl_dens: number | null;
    pl_insol: number | null;
    st_teff: number | null;
    st_rad: number | null;
    st_mass: number | null;
    atmosphereScore: number;
    atmosphereClass: string;
    candidateType: string;
};

export type AtmospheresPagination = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};

export type AtmospheresApiResponse = {
    success: boolean;
    data: AtmosphereItem[];
    message?: string;
    pagination: AtmospheresPagination;
};

export type AtmosphereDetailsApiResponse = {
    success: boolean;
    data?: AtmosphereItem;
    message?: string;
};