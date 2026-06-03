import {
    MARS_REVALIDATE_SECONDS,
    MARS_ROVERS,
} from "@/src/constants/mars/mars.constants";

import {normalizeMarsManifest} from "@/src/helpers/mars";

import {fetchMarsJson} from "./nasaMarsClient.service";

import type {
    MarsManifest,
    MarsManifestResponse,
    MarsRover,
    MarsRoversResponse,
} from "@/src/types/mars/mars.types";

import type {RawMarsManifestResponse} from "@/src/types/mars/marsRaw.types";

export const getMarsManifest = async (
    rover: string,
): Promise<MarsManifestResponse> => {
    const response = await fetchMarsJson<RawMarsManifestResponse>({
        path: `/manifests/${rover}`,
        revalidate: MARS_REVALIDATE_SECONDS.manifests,
    });

    if (!response.photo_manifest) {
        throw new Error("NASA Mars manifest not found.");
    }

    return {
        success: true,
        data: normalizeMarsManifest(response.photo_manifest),
    };
};

export const getMarsRovers = async (): Promise<MarsRoversResponse> => {
    const manifests = await Promise.all(
        MARS_ROVERS.map((rover) => getMarsManifest(rover)),
    );

    const rovers: MarsRover[] = manifests.map((manifest) => manifest.data.rover);

    return {
        success: true,
        data: rovers,
    };
};