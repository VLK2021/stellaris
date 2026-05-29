import {fetchNasaJson} from "@/src/services/nasaClient.service";

import type {
    RawSbdbResponse,
} from "@/src/types/asteroids/asteroidSbdbRaw.types";

import type {
    SbdbOrbitParameter,
    SbdbPhysicalParameter,
} from "@/src/types/asteroids/asteroidDetails.types";

const SBDB_BASE_URL = "https://ssd-api.jpl.nasa.gov";

const normalizeOrbitParameters = (
    data: RawSbdbResponse,
): SbdbOrbitParameter[] => {
    return (data.orbit?.elements ?? []).map((item) => ({
        name: item.name ?? "Unknown",
        value: item.value ?? null,
        sigma: item.sigma ?? null,
        units: item.units ?? null,
    }));
};

const normalizePhysicalParameters = (
    data: RawSbdbResponse,
): SbdbPhysicalParameter[] => {
    return (data.phys_par ?? []).map((item) => ({
        name: item.name ?? "Unknown",
        value: item.value ?? null,
        units: item.units ?? null,
        reference: item.ref ?? null,
    }));
};

export const getAsteroidSbdbDetails = async (id: string) => {
    try {
        const data = await fetchNasaJson<RawSbdbResponse>("/sbdb.api", {
            baseUrl: SBDB_BASE_URL,
            withApiKey: false,
            timeoutMs: 60000,
            revalidate: 60 * 60,
            params: {
                sstr: id,
                phys_par: true,
                orbit_defs: true,
            },
        });

        return {
            orbitParameters: normalizeOrbitParameters(data),
            physicalParameters: normalizePhysicalParameters(data),
            sbdbAvailable: true,
        };
    } catch {
        return {
            orbitParameters: [],
            physicalParameters: [],
            sbdbAvailable: false,
        };
    }
};