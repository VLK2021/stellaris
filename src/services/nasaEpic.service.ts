import {buildNasaUrl, fetchNasaJson} from "./nasaClient.service";

export type EpicCollection = "natural" | "enhanced" | "aerosol" | "cloud";
export type EpicImageFormat = "png" | "jpg" | "thumbs";

export type EpicCoordinates = {
    lat: number;
    lon: number;
};

export type EpicPosition = {
    x: number;
    y: number;
    z: number;
};

export type EpicAttitudeQuaternions = {
    q0: number;
    q1: number;
    q2: number;
    q3: number;
};

export type EpicImage = {
    identifier: string;
    caption: string;
    image: string;
    version: string;
    date: string;
    centroid_coordinates?: EpicCoordinates;
    dscovr_j2000_position?: EpicPosition;
    lunar_j2000_position?: EpicPosition;
    sun_j2000_position?: EpicPosition;
    attitude_quaternions?: EpicAttitudeQuaternions;
    coords?: {
        centroid_coordinates?: EpicCoordinates;
        dscovr_j2000_position?: EpicPosition;
        lunar_j2000_position?: EpicPosition;
        sun_j2000_position?: EpicPosition;
        attitude_quaternions?: EpicAttitudeQuaternions;
    };
};

export type EpicAvailableDate = {
    date: string;
};

type EpicArchiveImageParams = {
    collection: EpicCollection;
    image: string;
    date: string;
    format?: EpicImageFormat;
};

const EPIC_BASE_URL = "https://api.nasa.gov";

const getDateParts = (date: string) => {
    const pureDate = date.includes(" ") ? date.split(" ")[0] : date;
    const [year, month, day] = pureDate.split("-");

    return {year, month, day};
};

export const buildEpicArchiveImageUrl = ({
                                             collection,
                                             image,
                                             date,
                                             format = "png",
                                         }: EpicArchiveImageParams) => {
    const {year, month, day} = getDateParts(date);
    const extension = format === "thumbs" ? "jpg" : format;

    return buildNasaUrl(
        `/EPIC/archive/${collection}/${year}/${month}/${day}/${format}/${image}.${extension}`,
    );
};

export const attachEpicImageUrls = (
    images: EpicImage[],
    collection: EpicCollection,
) => {
    return images.map((item) => ({
        ...item,
        imageUrl: buildEpicArchiveImageUrl({
            collection,
            image: item.image,
            date: item.date,
            format: "png",
        }),
        jpgUrl: buildEpicArchiveImageUrl({
            collection,
            image: item.image,
            date: item.date,
            format: "jpg",
        }),
        thumbnailUrl: buildEpicArchiveImageUrl({
            collection,
            image: item.image,
            date: item.date,
            format: "thumbs",
        }),
    }));
};

export const getEpicLatest = async (
    collection: EpicCollection = "natural",
) => {
    const data = await fetchNasaJson<EpicImage[]>(`/EPIC/api/${collection}`);

    return attachEpicImageUrls(data, collection);
};

export const getEpicByDate = async (
    date: string,
    collection: EpicCollection = "natural",
) => {
    const data = await fetchNasaJson<EpicImage[]>(
        `/EPIC/api/${collection}/date/${date}`,
    );

    return attachEpicImageUrls(data, collection);
};

export const getEpicAllDates = async (
    collection: EpicCollection = "natural",
) => {
    return fetchNasaJson<EpicAvailableDate[]>(`/EPIC/api/${collection}/all`);
};

export const getEpicAvailableDates = async (
    collection: EpicCollection = "natural",
) => {
    return fetchNasaJson<EpicAvailableDate[]>(
        `/EPIC/api/${collection}/available`,
    );
};

export const getEpicNatural = () => getEpicLatest("natural");
export const getEpicEnhanced = () => getEpicLatest("enhanced");
export const getEpicAerosol = () => getEpicLatest("aerosol");
export const getEpicCloud = () => getEpicLatest("cloud");

export const getEpicNaturalByDate = (date: string) =>
    getEpicByDate(date, "natural");

export const getEpicEnhancedByDate = (date: string) =>
    getEpicByDate(date, "enhanced");

export const getEpicAerosolByDate = (date: string) =>
    getEpicByDate(date, "aerosol");

export const getEpicCloudByDate = (date: string) =>
    getEpicByDate(date, "cloud");

export const getEpicNaturalAllDates = () => getEpicAllDates("natural");
export const getEpicEnhancedAllDates = () => getEpicAllDates("enhanced");
export const getEpicAerosolAllDates = () => getEpicAllDates("aerosol");
export const getEpicCloudAllDates = () => getEpicAllDates("cloud");

export const getEpicNaturalAvailableDates = () =>
    getEpicAvailableDates("natural");

export const getEpicEnhancedAvailableDates = () =>
    getEpicAvailableDates("enhanced");

export const getEpicAerosolAvailableDates = () =>
    getEpicAvailableDates("aerosol");

export const getEpicCloudAvailableDates = () =>
    getEpicAvailableDates("cloud");

export const getLatestEpicImage = async () => {
    const images = await getEpicNatural();

    const item = images[0];

    if (!item) {
        return null;
    }

    return {
        identifier: item.identifier,
        caption: item.caption,
        date: item.date,
        imageUrl: item.imageUrl,
    };
};