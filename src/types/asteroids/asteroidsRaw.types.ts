export type RawNeoDiameter = {
    kilometers?: {
        estimated_diameter_min?: number;
        estimated_diameter_max?: number;
    };
};

export type RawNeoCloseApproach = {
    close_approach_date?: string;
    close_approach_date_full?: string;
    orbiting_body?: string;
    relative_velocity?: {
        kilometers_per_hour?: string;
    };
    miss_distance?: {
        kilometers?: string;
        lunar?: string;
    };
};

export type RawNeoAsteroid = {
    id?: string;
    neo_reference_id?: string;
    name?: string;
    nasa_jpl_url?: string;
    absolute_magnitude_h?: number;
    estimated_diameter?: RawNeoDiameter;
    is_potentially_hazardous_asteroid?: boolean;
    is_sentry_object?: boolean;
    close_approach_data?: RawNeoCloseApproach[];
};

export type RawNeoFeedResponse = {
    element_count?: number;
    near_earth_objects?: Record<string, RawNeoAsteroid[]>;
};

export type RawNeoBrowseResponse = {
    page?: {
        size?: number;
        total_elements?: number;
        total_pages?: number;
        number?: number;
    };
    near_earth_objects?: RawNeoAsteroid[];
};