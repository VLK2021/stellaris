import {MARS_ROVERS} from "@/src/constants/mars/mars.constants";

import {getMarsPhotos} from "./marsPhotos.service";
import {getMarsRovers} from "./marsRovers.service";

import type {
    MarsOverview,
    MarsOverviewResponse,
} from "@/src/types/mars/mars.types";

export const getMarsOverview = async (): Promise<MarsOverviewResponse> => {
    const roversResponse = await getMarsRovers();

    const latestPhotoResponses = await Promise.all(
        MARS_ROVERS.map((rover) => {
            const roverInfo = roversResponse.data.find(
                (item) => item.name.toLowerCase() === rover,
            );

            return getMarsPhotos({
                rover,
                earthDate: roverInfo?.maxDate ?? undefined,
                page: 1,
                limit: 4,
                sortBy: "earth_date",
                order: "desc",
            });
        }),
    );

    const latestPhotos = latestPhotoResponses.flatMap((response) => response.data);

    const latestEarthDate =
        roversResponse.data
            .map((rover) => rover.maxDate)
            .filter((date): date is string => Boolean(date))
            .sort()
            .at(-1) ?? null;

    const data: MarsOverview = {
        rovers: roversResponse.data,
        latestPhotos,
        stats: {
            rovers: roversResponse.data.length,
            activeRovers: roversResponse.data.filter(
                (rover) => rover.status === "active",
            ).length,
            totalPhotos: roversResponse.data.reduce(
                (sum, rover) => sum + rover.totalPhotos,
                0,
            ),
            latestEarthDate,
        },
    };

    return {
        success: true,
        data,
    };
};