export type NasaAssetKey =
    | "earth"
    | "mars"
    | "moon"
    | "iss"
    | "sun"
    | "galaxy"
    | "rocket"
    | "astronaut";

export type NasaAsset = {
    key: NasaAssetKey;
    title: string;
    description: string;
    nasaId: string;
    imageUrl: string;
    href: string;
};