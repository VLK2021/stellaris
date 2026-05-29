import type {
    AsteroidCloseApproach,
    AsteroidItem,
} from "@/src/types/asteroids/asteroids.types";

export const getEarthApproaches = (asteroid: AsteroidItem) => {
    return asteroid.closeApproaches.filter(
        (approach) => approach.orbitingBody.toLowerCase() === "earth",
    );
};

export const getClosestEarthApproaches = (
    asteroid: AsteroidItem,
    limit = 10,
) => {
    return getEarthApproaches(asteroid)
        .filter((item) => item.missDistanceKm !== null)
        .sort((a, b) => (a.missDistanceKm ?? Infinity) - (b.missDistanceKm ?? Infinity))
        .slice(0, limit);
};

export const getFastestApproach = (
    approaches: AsteroidCloseApproach[],
) => {
    return [...approaches]
        .filter((item) => item.velocityKmH !== null)
        .sort((a, b) => (b.velocityKmH ?? 0) - (a.velocityKmH ?? 0))[0] ?? null;
};

export const getClosestApproach = (
    approaches: AsteroidCloseApproach[],
) => {
    return [...approaches]
        .filter((item) => item.missDistanceKm !== null)
        .sort((a, b) => (a.missDistanceKm ?? Infinity) - (b.missDistanceKm ?? Infinity))[0] ?? null;
};