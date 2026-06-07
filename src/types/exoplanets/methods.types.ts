export type ExoplanetMethodItem = {
    method: string;
    planets: number;
    systems: number;
    firstYear: number | null;
    lastYear: number | null;
    avgDistance: number | null;
    avgRadius: number | null;
    avgMass: number | null;
    avgTemperature: number | null;
};

export type ExoplanetsMethodsPagination = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};

export type ExoplanetsMethodsApiResponse = {
    success: boolean;
    data: ExoplanetMethodItem[];
    message?: string;
    pagination: ExoplanetsMethodsPagination;
};