import {fetchNasaJson} from "@/src/services/nasaClient.service";

import {
    ASTEROIDS_API_PATHS,
} from "@/src/constants/asteroids/asteroids.constants";

import {normalizeAsteroid} from "@/src/helpers/asteroids/asteroids.helpers";

import type {RawNeoAsteroid} from "@/src/types/asteroids/asteroidsRaw.types";

export const getAsteroidById = async (id: string) => {
    if (!id) {
        throw new Error("Asteroid ID is required.");
    }

    const response = await fetchNasaJson<RawNeoAsteroid>(
        `${ASTEROIDS_API_PATHS.lookup}/${id}`,
        {
            revalidate: 60 * 60,
            timeoutMs: 60000,
        },
    );

    return normalizeAsteroid(response);
};