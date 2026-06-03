import type {
    MarsCamera,
    MarsManifest,
    MarsManifestPhotoDay,
    MarsPhoto,
    MarsRover,
} from "@/src/types/mars/mars.types";

import type {
    RawMarsCamera,
    RawMarsManifest,
    RawMarsManifestPhotoDay,
    RawMarsPhoto,
    RawMarsRover,
} from "@/src/types/mars/marsRaw.types";

const toNumberOrNull = (value: unknown) => {
    return typeof value === "number" && Number.isFinite(value) ? value : null;
};

export const normalizeMarsCamera = (camera?: RawMarsCamera): MarsCamera => {
    return {
        id: toNumberOrNull(camera?.id),
        name: camera?.name ?? "UNKNOWN",
        fullName: camera?.full_name ?? camera?.name ?? "Unknown camera",
        roverId: toNumberOrNull(camera?.rover_id),
    };
};

export const normalizeMarsRover = (rover?: RawMarsRover): MarsRover => {
    return {
        id: toNumberOrNull(rover?.id),
        name: rover?.name ?? "Unknown rover",
        landingDate: rover?.landing_date ?? null,
        launchDate: rover?.launch_date ?? null,
        status: rover?.status ?? null,
        maxSol: toNumberOrNull(rover?.max_sol),
        maxDate: rover?.max_date ?? null,
        totalPhotos: rover?.total_photos ?? 0,
        cameras: rover?.cameras?.map(normalizeMarsCamera) ?? [],
    };
};

export const normalizeMarsPhoto = (photo: RawMarsPhoto): MarsPhoto => {
    return {
        id: photo.id ?? 0,
        sol: photo.sol ?? 0,
        imgSrc: photo.img_src ?? "",
        earthDate: photo.earth_date ?? "",
        camera: normalizeMarsCamera(photo.camera),
        rover: normalizeMarsRover(photo.rover),
        raw: photo as Record<string, unknown>,
    };
};

const normalizeManifestDay = (
    day: RawMarsManifestPhotoDay,
): MarsManifestPhotoDay => {
    return {
        sol: day.sol ?? 0,
        earthDate: day.earth_date ?? "",
        totalPhotos: day.total_photos ?? 0,
        cameras: day.cameras ?? [],
    };
};

export const normalizeMarsManifest = (
    manifest: RawMarsManifest,
): MarsManifest => {
    return {
        rover: normalizeMarsRover({
            name: manifest.name,
            landing_date: manifest.landing_date,
            launch_date: manifest.launch_date,
            status: manifest.status,
            max_sol: manifest.max_sol,
            max_date: manifest.max_date,
            total_photos: manifest.total_photos,
        }),
        photos: manifest.photos?.map(normalizeManifestDay) ?? [],
    };
};