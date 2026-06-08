import {getLatestMarsRoverPhotos} from "./marsPhotos.service";
import {
    getMarsRoversSummary,
    MARS_ROVERS,
} from "./marsRovers.service";

import type {
    MarsOverview,
    MarsPhoto,
} from "@/src/types/mars";

export const getMarsOverview = async (): Promise<MarsOverview> => {
    const rovers = await getMarsRoversSummary();

    const latestPhotosResults = await Promise.allSettled(
        MARS_ROVERS.map((rover) => getLatestMarsRoverPhotos(rover)),
    );

    const latestPhotos = latestPhotosResults
        .flatMap((result) =>
            result.status === "fulfilled" ? result.value : [],
        )
        .slice(0, 24) as MarsPhoto[];

    const latestEarthDate =
        latestPhotos
            .map((photo) => photo.earth_date)
            .filter(Boolean)
            .sort()
            .at(-1) ?? null;

    return {
        rovers,
        latestPhotos,
        stats: {
            rovers: rovers.length,
            activeRovers: rovers.filter((rover) => rover.status === "active").length,
            totalPhotos: latestPhotos.length,
            latestEarthDate,
        },
    };
};