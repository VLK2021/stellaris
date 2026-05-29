import type {
    AsteroidItem,
    AsteroidsFeedStats,
} from "./asteroids.types";

import type {PaginationMeta} from "@/src/types/common/pagination.types";

export type AsteroidsMode = "feed" | "browse" | "lookup";

export type AsteroidsSort = "closest" | "fastest" | "largest" | "name";

export type AsteroidsHazardFilter = "all" | "hazardous" | "safe";

export type AsteroidsExplorerState = {
    mode: AsteroidsMode;
    startDate: string;
    endDate: string;
    asteroidId: string;
    page: number;
    limit: number;
    sort: AsteroidsSort;
    hazardFilter: AsteroidsHazardFilter;
};

export type AsteroidsExplorerApiState = {
    items: AsteroidItem[];
    selected: AsteroidItem | null;
    stats: AsteroidsFeedStats | null;
    pagination: PaginationMeta | null;
    loading: boolean;
    error: string | null;
};

export type AsteroidsLocale = {
    badge: string;
    title: string;
    text: string;
    feed: string;
    browse: string;
    lookup: string;
    startDate: string;
    endDate: string;
    asteroidId: string;
    load: string;
    loading: string;
    sort: string;
    closest: string;
    fastest: string;
    largest: string;
    name: string;
    hazard: string;
    all: string;
    hazardous: string;
    safe: string;
    total: string;
    hazardousCount: string;
    safeCount: string;
    closestObject: string;
    fastestObject: string;
    largestObject: string;
    diameter: string;
    velocity: string;
    distance: string;
    magnitude: string;
    orbitingBody: string;
    sentry: string;
    details: string;
    source: string;
    noData: string;
    clear: string;
};