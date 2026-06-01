import type {
    EarthEvent,
    EpicImage,
    EpicImageType,
} from "@/src/types/earth/earth.types";

import type {
    RawEonetEvent,
    RawEpicImage,
    RawEpicVector,
} from "@/src/types/earth/earthRaw.types";

const toNumberOrNull = (value: unknown) => {
    return typeof value === "number" && Number.isFinite(value) ? value : null;
};

const normalizeVector = (value?: RawEpicVector) => {
    return {
        x: toNumberOrNull(value?.x),
        y: toNumberOrNull(value?.y),
        z: toNumberOrNull(value?.z),
    };
};

const buildEpicImageUrl = ({
                               type,
                               date,
                               image,
                           }: {
    type: EpicImageType;
    date: string;
    image: string;
}) => {
    const [datePart] = date.split(" ");
    const [year, month, day] = datePart.split("-");

    return `https://api.nasa.gov/EPIC/archive/${type}/${year}/${month}/${day}/png/${image}.png?api_key=${process.env.NASA_API_KEY || "DEMO_KEY"}`;
};

export const normalizeEonetEvent = (event: RawEonetEvent): EarthEvent => {
    const geometry = event.geometry ?? [];
    const latestGeometry = geometry[geometry.length - 1];

    return {
        id: event.id ?? "",
        title: event.title ?? "Untitled event",
        description: event.description ?? null,
        link: event.link ?? null,
        closed: event.closed ?? null,
        status: event.closed ? "closed" : "open",
        categories:
            event.categories?.map((category) => ({
                id: category.id ?? "",
                title: category.title ?? "Unknown",
            })) ?? [],
        sources:
            event.sources?.map((source) => ({
                id: source.id ?? "source",
                url: source.url ?? "",
            })) ?? [],
        geometry: geometry.map((item) => ({
            date: item.date ?? null,
            type: item.type ?? null,
            coordinates: item.coordinates ?? null,
        })),
        latestDate: latestGeometry?.date ?? null,
        coordinates: latestGeometry?.coordinates ?? null,
        geometryCount: geometry.length,
        sourceCount: event.sources?.length ?? 0,
        raw: event as Record<string, unknown>,
    };
};

export const normalizeEpicImage = (
    item: RawEpicImage,
    type: EpicImageType,
): EpicImage => {
    const identifier = item.identifier ?? item.image ?? "";
    const date = item.date ?? "";

    return {
        id: `${type}-${identifier}`,
        identifier,
        caption: item.caption ?? "",
        image: item.image ?? "",
        version: item.version ?? null,
        date,
        imageUrl:
            item.image && date
                ? buildEpicImageUrl({
                    type,
                    date,
                    image: item.image,
                })
                : "",
        type,
        centroidCoordinates: {
            lat: toNumberOrNull(item.centroid_coordinates?.lat),
            lon: toNumberOrNull(item.centroid_coordinates?.lon),
        },
        dscovrPosition: normalizeVector(item.dscovr_j2000_position),
        lunarPosition: normalizeVector(item.lunar_j2000_position),
        sunPosition: normalizeVector(item.sun_j2000_position),
        raw: item as Record<string, unknown>,
    };
};