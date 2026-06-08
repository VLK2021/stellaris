export type MethodDetailsData = {
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

export type MethodDetailsApiResponse = {
    success: boolean;
    data?: MethodDetailsData;
    message?: string;
};