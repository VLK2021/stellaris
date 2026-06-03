export type RawMarsCamera = {
    id?: number;
    name?: string;
    full_name?: string;
    rover_id?: number;
};

export type RawMarsRover = {
    id?: number;
    name?: string;
    landing_date?: string;
    launch_date?: string;
    status?: string;
    max_sol?: number;
    max_date?: string;
    total_photos?: number;
    cameras?: RawMarsCamera[];
};

export type RawMarsPhoto = {
    id?: number;
    sol?: number;
    img_src?: string;
    earth_date?: string;
    camera?: RawMarsCamera;
    rover?: RawMarsRover;
};

export type RawMarsPhotosResponse = {
    photos?: RawMarsPhoto[];
};

export type RawMarsManifestPhotoDay = {
    sol?: number;
    earth_date?: string;
    total_photos?: number;
    cameras?: string[];
};

export type RawMarsManifest = {
    name?: string;
    landing_date?: string;
    launch_date?: string;
    status?: string;
    max_sol?: number;
    max_date?: string;
    total_photos?: number;
    photos?: RawMarsManifestPhotoDay[];
};

export type RawMarsManifestResponse = {
    photo_manifest?: RawMarsManifest;
};