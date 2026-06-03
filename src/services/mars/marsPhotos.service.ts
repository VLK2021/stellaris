import {
    MARS_REVALIDATE_SECONDS,
    MARS_ROVERS,
} from "@/src/constants/mars/mars.constants";

import {
    normalizeMarsPhoto,
    paginateMarsItems,
} from "@/src/helpers/mars";

import {fetchMarsJson} from "./nasaMarsClient.service";

import type {
    MarsOrder,
    MarsPhoto,
    MarsPhotosQuery,
    MarsPhotosResponse,
    MarsRoverName,
    MarsSortBy,
} from "@/src/types/mars/mars.types";

import type {RawMarsPhotosResponse} from "@/src/types/mars/marsRaw.types";

const DEFAULT_ROVER: MarsRoverName = "curiosity";

const isMarsRover = (value: string | undefined): value is MarsRoverName => {
    return MARS_ROVERS.includes(value as MarsRoverName);
};

const getSafeRover = (rover?: string): MarsRoverName => {
    return isMarsRover(rover) ? rover : DEFAULT_ROVER;
};

const sortPhotos = ({
                        photos,
                        sortBy,
                        order,
                    }: {
    photos: MarsPhoto[];
    sortBy: MarsSortBy;
    order: MarsOrder;
}) => {
    return [...photos].sort((a, b) => {
        const first =
            sortBy === "camera"
                ? a.camera.name
                : sortBy === "sol"
                    ? a.sol
                    : a.earthDate;

        const second =
            sortBy === "camera"
                ? b.camera.name
                : sortBy === "sol"
                    ? b.sol
                    : b.earthDate;

        const result =
            typeof first === "number" && typeof second === "number"
                ? first - second
                : String(first).localeCompare(String(second));

        return order === "desc" ? -result : result;
    });
};

export const getMarsPhotos = async ({
                                        rover,
                                        camera,
                                        earthDate,
                                        sol,
                                        page = 1,
                                        limit = 12,
                                        sortBy = "earth_date",
                                        order = "desc",
                                    }: MarsPhotosQuery = {}): Promise<MarsPhotosResponse> => {
    const safeRover = getSafeRover(rover);

    const params: Record<string, string | number | undefined> = {
        page: 1,
        camera,
    };

    if (earthDate) {
        params.earth_date = earthDate;
    } else {
        params.sol = sol ?? 1000;
    }

    const response = await fetchMarsJson<RawMarsPhotosResponse>({
        path: `/rovers/${safeRover}/photos`,
        params,
        revalidate: MARS_REVALIDATE_SECONDS.photos,
    });

    const normalized = (response.photos ?? [])
        .map(normalizeMarsPhoto)
        .filter((photo) => Boolean(photo.imgSrc));

    const sorted = sortPhotos({
        photos: normalized,
        sortBy,
        order,
    });

    const result = paginateMarsItems({
        items: sorted,
        page,
        limit,
    });

    return {
        success: true,
        data: result.data,
        pagination: result.pagination,
    };
};