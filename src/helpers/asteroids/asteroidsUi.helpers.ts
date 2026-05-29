import type {
    AsteroidItem,
} from "@/src/types/asteroids/asteroids.types";

import type {
    AsteroidsHazardFilter,
    AsteroidsSort,
} from "@/src/types/asteroids/asteroidsUi.types";

export const getTodayDate = () => {
    return new Date().toISOString().slice(0, 10);
};

export const getDatePlusDays = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);

    return date.toISOString().slice(0, 10);
};

export const formatNumber = (value: number | null, digits = 0) => {
    if (value === null || !Number.isFinite(value)) return "—";

    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: digits,
    }).format(value);
};

export const formatKm = (value: number | null) => {
    if (value === null || !Number.isFinite(value)) return "—";

    if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(2)}M km`;
    }

    return `${formatNumber(value)} km`;
};

export const getPrimaryApproach = (item: AsteroidItem) => {
    return item.closeApproaches[0] ?? null;
};

export const getAsteroidVelocity = (item: AsteroidItem) => {
    return getPrimaryApproach(item)?.velocityKmH ?? null;
};

export const getAsteroidDistance = (item: AsteroidItem) => {
    return getPrimaryApproach(item)?.missDistanceKm ?? null;
};

export const filterAsteroidsByHazard = (
    items: AsteroidItem[],
    filter: AsteroidsHazardFilter,
) => {
    if (filter === "all") return items;

    return items.filter((item) =>
        filter === "hazardous"
            ? item.isPotentiallyHazardous
            : !item.isPotentiallyHazardous,
    );
};

export const sortAsteroids = (
    items: AsteroidItem[],
    sort: AsteroidsSort,
) => {
    return [...items].sort((a, b) => {
        if (sort === "name") {
            return a.name.localeCompare(b.name);
        }

        if (sort === "fastest") {
            return (getAsteroidVelocity(b) ?? 0) - (getAsteroidVelocity(a) ?? 0);
        }

        if (sort === "largest") {
            return (b.estimatedDiameter.avgKm ?? 0) - (a.estimatedDiameter.avgKm ?? 0);
        }

        return (getAsteroidDistance(a) ?? Infinity) - (getAsteroidDistance(b) ?? Infinity);
    });
};