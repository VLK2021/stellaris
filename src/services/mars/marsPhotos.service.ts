import {fetchMarsJson} from "./marsClient.service";

import type {
    MarsPhoto,
    MarsPhotosQuery,
    MarsPhotosResponse,
} from "@/src/types/mars";

type RawPhotosResponse = {
    photos?: MarsPhoto[];
    latest_photos?: MarsPhoto[];
    data?: MarsPhoto[];
};

const MARS_PHOTOS_PAGE_SIZE = 25;

const normalizeCamera = (camera?: string) => {
    return camera ? camera.toLowerCase() : undefined;
};

const normalizePhotosResponse = (response: RawPhotosResponse | MarsPhoto[]) => {
    if (Array.isArray(response)) return response;

    return response.photos ?? response.latest_photos ?? response.data ?? [];
};

export const getMarsRoverPhotos = async (
    query: MarsPhotosQuery,
): Promise<MarsPhotosResponse> => {
    const params: Record<string, string | number | undefined> = {
        page: query.page ?? 1,
    };

    if (query.earthDate) {
        params.earth_date = query.earthDate;
    }

    if (query.sol !== undefined) {
        params.sol = query.sol;
    }

    const camera = normalizeCamera(query.camera);

    if (camera) {
        params.camera = camera;
    }

    const response = await fetchMarsJson<RawPhotosResponse | MarsPhoto[]>({
        path: `/rovers/${query.rover}/photos`,
        revalidate: 60 * 60,
        params,
    });

    const photos = normalizePhotosResponse(response);

    return {
        photos,
        query,
        meta: {
            page: query.page ?? 1,
            pageSize: MARS_PHOTOS_PAGE_SIZE,
            count: photos.length,
            hasNextPage: photos.length === MARS_PHOTOS_PAGE_SIZE,
        },
    };
};

export const getLatestMarsRoverPhotos = async (
    rover: MarsPhotosQuery["rover"],
): Promise<MarsPhoto[]> => {
    const response = await getMarsRoverPhotos({
        rover,
        page: 1,
    });

    return response.photos;
};