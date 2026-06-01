import {
    EARTH_REVALIDATE_SECONDS,
} from "@/src/constants/earth/earth.constants";

import {
    normalizeEpicImage,
} from "@/src/helpers/earth";

import {
    createNasaUrl,
    fetchEarthJson,
} from "./nasaEarthClient.service";

import type {
    EpicImageType,
    EpicResponse,
} from "@/src/types/earth/earth.types";

import type {
    RawEpicImage,
} from "@/src/types/earth/earthRaw.types";

export const getEpicImages = async ({
                                        type = "natural",
                                    }: {
    type?: EpicImageType;
}): Promise<EpicResponse> => {
    const response = await fetchEarthJson<RawEpicImage[]>({
        url: createNasaUrl(`/EPIC/api/${type}`),
        revalidate: EARTH_REVALIDATE_SECONDS.epic,
    });

    return {
        success: true,
        data: response.map((item) =>
            normalizeEpicImage(item, type),
        ),
    };
};