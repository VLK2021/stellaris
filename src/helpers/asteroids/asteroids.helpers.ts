import {
    ASTEROIDS_MAX_FEED_DAYS,
} from "@/src/constants/asteroids/asteroids.constants";

import type {
    AsteroidCloseApproach,
    AsteroidDiameter,
    AsteroidItem,
    AsteroidsFeedStats,
} from "@/src/types/asteroids/asteroids.types";

import type {
    RawNeoAsteroid,
    RawNeoCloseApproach,
} from "@/src/types/asteroids/asteroidsRaw.types";

const toNumber = (value?: string | number | null) => {
    if (value === undefined || value === null) return null;

    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : null;
};

export const getDaysBetween = (startDate: string, endDate: string) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
};

export const validateAsteroidsFeedRange = (
    startDate: string,
    endDate: string,
) => {
    if (!startDate || !endDate) {
        throw new Error("Start date and end date are required.");
    }

    const days = getDaysBetween(startDate, endDate);

    if (days < 0) {
        throw new Error("End date cannot be earlier than start date.");
    }

    if (days > ASTEROIDS_MAX_FEED_DAYS) {
        throw new Error(`NASA NeoWs Feed supports maximum ${ASTEROIDS_MAX_FEED_DAYS} days.`);
    }
};

const normalizeDiameter = (item: RawNeoAsteroid): AsteroidDiameter => {
    const minKm = item.estimated_diameter?.kilometers?.estimated_diameter_min ?? null;
    const maxKm = item.estimated_diameter?.kilometers?.estimated_diameter_max ?? null;

    return {
        minKm,
        maxKm,
        avgKm: minKm !== null && maxKm !== null ? (minKm + maxKm) / 2 : null,
    };
};

const normalizeApproach = (
    approach: RawNeoCloseApproach,
): AsteroidCloseApproach => ({
    date: approach.close_approach_date ?? "",
    fullDate: approach.close_approach_date_full ?? "",
    orbitingBody: approach.orbiting_body ?? "",
    velocityKmH: toNumber(approach.relative_velocity?.kilometers_per_hour),
    missDistanceKm: toNumber(approach.miss_distance?.kilometers),
    missDistanceLunar: toNumber(approach.miss_distance?.lunar),
});

export const normalizeAsteroid = (item: RawNeoAsteroid): AsteroidItem => ({
    id: item.id ?? "",
    neoReferenceId: item.neo_reference_id ?? "",
    name: item.name ?? "",
    nasaJplUrl: item.nasa_jpl_url ?? null,
    absoluteMagnitudeH: item.absolute_magnitude_h ?? null,
    estimatedDiameter: normalizeDiameter(item),
    isPotentiallyHazardous: Boolean(item.is_potentially_hazardous_asteroid),
    isSentryObject: Boolean(item.is_sentry_object),
    closeApproaches: (item.close_approach_data ?? []).map(normalizeApproach),
});

const getClosestDistance = (item: AsteroidItem) => {
    const distances = item.closeApproaches
        .map((approach) => approach.missDistanceKm)
        .filter((value): value is number => value !== null);

    return distances.length ? Math.min(...distances) : Number.POSITIVE_INFINITY;
};

const getFastestVelocity = (item: AsteroidItem) => {
    const velocities = item.closeApproaches
        .map((approach) => approach.velocityKmH)
        .filter((value): value is number => value !== null);

    return velocities.length ? Math.max(...velocities) : 0;
};

export const buildAsteroidsStats = (
    items: AsteroidItem[],
): AsteroidsFeedStats => {
    const hazardous = items.filter((item) => item.isPotentiallyHazardous).length;

    return {
        total: items.length,
        hazardous,
        safe: items.length - hazardous,
        closest: items.length
            ? [...items].sort((a, b) => getClosestDistance(a) - getClosestDistance(b))[0]
            : null,
        fastest: items.length
            ? [...items].sort((a, b) => getFastestVelocity(b) - getFastestVelocity(a))[0]
            : null,
        largest: items.length
            ? [...items].sort(
                (a, b) =>
                    (b.estimatedDiameter.avgKm ?? 0) -
                    (a.estimatedDiameter.avgKm ?? 0),
            )[0]
            : null,
    };
};