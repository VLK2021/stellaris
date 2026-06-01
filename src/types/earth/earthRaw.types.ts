export type RawEonetCategory = {
    id?: string;
    title?: string;
};

export type RawEonetSource = {
    id?: string;
    url?: string;
};

export type RawEonetGeometry = {
    date?: string;
    type?: string;
    coordinates?: number[];
};

export type RawEonetEvent = {
    id?: string;
    title?: string;
    description?: string | null;
    link?: string;
    closed?: string | null;
    categories?: RawEonetCategory[];
    sources?: RawEonetSource[];
    geometry?: RawEonetGeometry[];
};

export type RawEonetEventsResponse = {
    title?: string;
    description?: string;
    link?: string;
    events?: RawEonetEvent[];
};

export type RawEpicCoordinates = {
    lat?: number;
    lon?: number;
};

export type RawEpicVector = {
    x?: number;
    y?: number;
    z?: number;
};

export type RawEpicImage = {
    identifier?: string;
    caption?: string;
    image?: string;
    version?: string;
    date?: string;
    centroid_coordinates?: RawEpicCoordinates;
    dscovr_j2000_position?: RawEpicVector;
    lunar_j2000_position?: RawEpicVector;
    sun_j2000_position?: RawEpicVector;
    attitude_quaternions?: Record<string, number>;
};