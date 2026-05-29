import {getAsteroidById} from "./asteroidsLookup.service";
import {getAsteroidSbdbDetails} from "./asteroidSbdb.service";

import type {AsteroidDetails} from "@/src/types/asteroids/asteroidDetails.types";

export const getAsteroidDetails = async (
    id: string,
): Promise<AsteroidDetails> => {
    const asteroid = await getAsteroidById(id);
    const sbdb = await getAsteroidSbdbDetails(id);

    return {
        asteroid,
        orbitParameters: sbdb.orbitParameters,
        physicalParameters: sbdb.physicalParameters,
        sbdbAvailable: sbdb.sbdbAvailable,
    };
};