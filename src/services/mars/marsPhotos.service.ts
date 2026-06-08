import {fetchMarsJson} from "./marsClient.service";
import {getMarsRoverMeta} from "./marsRovers.service";

import type {
    MarsPhoto,
    MarsPhotosQuery,
    MarsPhotosResponse,
    MarsRoverName,
} from "@/src/types/mars";

type RawPhotosResponse = {
    photos?: MarsPhoto[];
    latest_photos?: MarsPhoto[];
    data?: MarsPhoto[];
};

const normalizePhotosResponse = (response: RawPhotosResponse | MarsPhoto[]) => {
    if (Array.isArray(response)) return response;

    return response.photos ?? response.latest_photos ?? response.data ?? [];
};

export const getMarsRoverPhotos = async ({
                                             rover,
                                             sol,
                                             earthDate,
                                             camera,
                                             page = 1,
                                         }: MarsPhotosQuery): Promise<MarsPhotosResponse> => {
    const params: Record<string, string | number | undefined> = {
        camera,
        page,
    };

    if (earthDate) {
        params.earth_date = earthDate;
    } else {
        params.sol = sol ?? getMarsRoverMeta(rover).defaultSol;
    }

    const response = await fetchMarsJson<RawPhotosResponse | MarsPhoto[]>({
        path: `/rovers/${rover}/photos`,
        revalidate: 60 * 60,
        params,
    });

    return {
        photos: normalizePhotosResponse(response),
        query: {
            rover,
            sol,
            earthDate,
            camera,
            page,
        },
    };
};

export const getLatestMarsRoverPhotos = async (
    rover: MarsRoverName,
): Promise<MarsPhoto[]> => {
    const meta = getMarsRoverMeta(rover);

    const response = await getMarsRoverPhotos({
        rover,
        earthDate: meta.defaultEarthDate,
        page: 1,
    });

    return response.photos;
};