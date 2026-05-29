export type RawSbdbOrbitElement = {
    name?: string;
    value?: string;
    sigma?: string;
    units?: string;
};

export type RawSbdbPhysicalParameter = {
    name?: string;
    value?: string;
    units?: string;
    ref?: string;
};

export type RawSbdbResponse = {
    object?: {
        fullname?: string;
        shortname?: string;
        des?: string;
        spkid?: string;
        orbit_class?: {
            name?: string;
            code?: string;
        };
    };
    orbit?: {
        elements?: RawSbdbOrbitElement[];
    };
    phys_par?: RawSbdbPhysicalParameter[];
};