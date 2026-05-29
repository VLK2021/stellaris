import type {AsteroidItem} from "./asteroids.types";

export type SbdbOrbitParameter = {
    name: string;
    value: string | null;
    sigma: string | null;
    units: string | null;
};

export type SbdbPhysicalParameter = {
    name: string;
    value: string | null;
    units: string | null;
    reference: string | null;
};

export type AsteroidDetails = {
    asteroid: AsteroidItem;
    orbitParameters: SbdbOrbitParameter[];
    physicalParameters: SbdbPhysicalParameter[];
    sbdbAvailable: boolean;
};

export type AsteroidDetailsApiResponse = {
    success: boolean;
    data: AsteroidDetails;
};