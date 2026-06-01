import {
    EARTH_REVALIDATE_SECONDS,
    GIBS_WMTS_CAPABILITIES_URL,
} from "@/src/constants/earth/earth.constants";

import {parseGibsWmtsLayers} from "@/src/helpers/earth";

import {fetchEarthText} from "./nasaEarthClient.service";

import type {EarthLayersResponse} from "@/src/types/earth/earth.types";

export const getGibsLayers = async (): Promise<EarthLayersResponse> => {
    const xml = await fetchEarthText({
        url: GIBS_WMTS_CAPABILITIES_URL,
        revalidate: EARTH_REVALIDATE_SECONDS.gibs,
    });

    return {
        success: true,
        data: parseGibsWmtsLayers(xml),
    };
};