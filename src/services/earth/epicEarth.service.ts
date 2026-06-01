import {EARTH_REVALIDATE_SECONDS} from "@/src/constants/earth/earth.constants";
import {normalizeEpicImage, paginateEarthItems} from "@/src/helpers/earth";
import {createNasaUrl, fetchEarthJson} from "./nasaEarthClient.service";

import type {
    EpicImageType,
    EpicQuery,
    EpicResponse,
} from "@/src/types/earth/earth.types";

import type {RawEpicImage} from "@/src/types/earth/earthRaw.types";

export const getEpicImages = async ({
                                        type = "natural",
                                        date,
                                        page = 1,
                                        limit = 12,
                                    }: EpicQuery = {}): Promise<EpicResponse> => {
    const path = date
        ? `/EPIC/api/${type}/date/${date}`
        : `/EPIC/api/${type}`;

    const response = await fetchEarthJson<RawEpicImage[]>({
        url: createNasaUrl(path),
        revalidate: EARTH_REVALIDATE_SECONDS.epic,
    });

    const images = response.map((item) => normalizeEpicImage(item, type));

    const result = paginateEarthItems({
        items: images,
        page,
        limit,
    });

    return {
        success: true,
        data: result.data,
        pagination: result.pagination,
    };
};