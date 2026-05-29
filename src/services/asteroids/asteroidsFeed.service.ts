import {fetchNasaJson} from "@/src/services/nasaClient.service";

import {
    ASTEROIDS_API_PATHS,
} from "@/src/constants/asteroids/asteroids.constants";

import {
    buildAsteroidsStats,
    normalizeAsteroid,
    validateAsteroidsFeedRange,
} from "@/src/helpers/asteroids/asteroids.helpers";

import type {
    AsteroidItem,
    AsteroidsFeedQuery,
} from "@/src/types/asteroids/asteroids.types";

import type {
    RawNeoFeedResponse,
} from "@/src/types/asteroids/asteroidsRaw.types";

export const getAsteroidsFeed = async ({
                                           startDate,
                                           endDate,
                                       }: AsteroidsFeedQuery) => {
    validateAsteroidsFeedRange(startDate, endDate);

    const response = await fetchNasaJson<RawNeoFeedResponse>(
        ASTEROIDS_API_PATHS.feed,
        {
            params: {
                start_date: startDate,
                end_date: endDate,
            },
            revalidate: 60 * 30,
            timeoutMs: 60000,
        },
    );

    const objects = response.near_earth_objects ?? {};

    const items: AsteroidItem[] = Object.values(objects)
        .flat()
        .map(normalizeAsteroid)
        .filter((item) => item.id);

    return {
        items,
        stats: buildAsteroidsStats(items),
    };
};