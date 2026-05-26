export type MarsRoverName = "curiosity" | "opportunity" | "spirit";

export type MarsPhotoCamera =
    | "FHAZ"
    | "RHAZ"
    | "MAST"
    | "CHEMCAM"
    | "MAHLI"
    | "MARDI"
    | "NAVCAM"
    | "PANCAM"
    | "MINITES";

export type NasaLiveApod = {
    title: string;
    date: string;
    explanation: string;
    mediaType: string;
    imageUrl: string | null;
    hdUrl: string | null;
    copyright?: string;
};

export type NasaLiveNeo = {
    totalToday: number;
    closestName: string;
    closestDistanceKm: number;
    closestVelocityKmh: number;
    estimatedDiameterMeters: number;
    isHazardous: boolean;
};

export type NasaLiveDonki = {
    solarFlares: number;
    cmeEvents: number;
    geomagneticStorms: number;
    latestEventDate: string | null;
};

export type NasaLiveEpic = {
    identifier: string;
    caption: string;
    date: string;
    imageUrl: string;
};

export type NasaLiveMediaItem = {
    title: string;
    description: string;
    nasaId: string;
    dateCreated: string;
    imageUrl: string | null;
};

export type IssPosition = {
    latitude: number;
    longitude: number;
    altitudeKm: number;
    velocityKmh: number;
    visibility: string;
    timestamp: number;
};

export type NasaLiveData = {
    apod: NasaLiveApod | null;
    neo: NasaLiveNeo | null;
    donki: NasaLiveDonki | null;
    epic: NasaLiveEpic | null;
    marsMedia: NasaLiveMediaItem | null;
    iss: IssPosition | null;
    updatedAt: string;
};

export type NasaLiveApiResponse = {
    success: boolean;
    data: NasaLiveData;
};