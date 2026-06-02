import {EARTH_REVALIDATE_SECONDS} from "@/src/constants/earth/earth.constants";
import {normalizeEonetEvent} from "@/src/helpers/earth";
import {getEpicImages} from "@/src/services/earth/epicEarth.service";

import type {EarthEvent} from "@/src/types/earth/earth.types";
import type {RawEonetEvent} from "@/src/types/earth/earthRaw.types";
import type {
    EarthEventEnrichment,
    EarthOfficialCategoryDetails,
    EarthOfficialSourceDetails,
} from "@/src/types/earth/earthEnrichment.types";

type RawEonetSource = {
    id?: string;
    title?: string;
    source?: string;
    link?: string;
    [key: string]: unknown;
};

type RawEonetCategory = {
    id?: string;
    title?: string;
    description?: string;
    layers?: unknown[];
    [key: string]: unknown;
};

const EONET_BASE_URL = "https://eonet.gsfc.nasa.gov/api/v3";

const fetchOfficialJson = async <T,>(url: string): Promise<T> => {
    const response = await fetch(url, {
        next: {
            revalidate: EARTH_REVALIDATE_SECONDS.eonet,
        },
    });

    if (!response.ok) {
        throw new Error(`NASA EONET request failed: ${response.status}`);
    }

    return await response.json() as T;
};

const getEarthEventById = async (eventId: string): Promise<EarthEvent> => {
    const rawEvent = await fetchOfficialJson<RawEonetEvent>(
        `${EONET_BASE_URL}/events/${encodeURIComponent(eventId)}`,
    );

    return normalizeEonetEvent(rawEvent);
};

const normalizeOfficialSource = (
    source: RawEonetSource,
): EarthOfficialSourceDetails | null => {
    if (!source.id) return null;

    return {
        id: source.id,
        title: source.title ?? null,
        homepage: source.source ?? null,
        eventsApiLink: source.link ?? null,
        raw: source,
    };
};

const normalizeOfficialCategory = (
    category: RawEonetCategory,
): EarthOfficialCategoryDetails | null => {
    if (!category.id || !category.title) return null;

    return {
        id: category.id,
        title: category.title,
        description: category.description ?? null,
        layersCount: Array.isArray(category.layers) ? category.layers.length : 0,
        raw: category,
    };
};

const getOfficialSources = async (): Promise<EarthOfficialSourceDetails[]> => {
    const response = await fetchOfficialJson<{sources?: RawEonetSource[]}>(
        `${EONET_BASE_URL}/sources`,
    );

    return (response.sources ?? [])
        .map((source: RawEonetSource) => normalizeOfficialSource(source))
        .filter((source): source is EarthOfficialSourceDetails => Boolean(source));
};

const getOfficialCategories = async (): Promise<EarthOfficialCategoryDetails[]> => {
    const response = await fetchOfficialJson<{categories?: RawEonetCategory[]}>(
        `${EONET_BASE_URL}/categories`,
    );

    return (response.categories ?? [])
        .map((category: RawEonetCategory) => normalizeOfficialCategory(category))
        .filter((category): category is EarthOfficialCategoryDetails => Boolean(category));
};

const createReadableSummary = (event: EarthEvent) => {
    return {
        title: event.title,
        category: event.categories.map((category) => category.title).join(", "),
        status: event.status,
        latestDate: event.latestDate,
        coordinates: event.coordinates,
        geometryPoints: event.geometryCount,
        sourceIds: event.sources.map((source) => source.id),
    };
};

export const getEarthEventEnrichment = async (
    eventId: string,
): Promise<EarthEventEnrichment> => {
    const [event, sources, categories, epicResponse] = await Promise.all([
        getEarthEventById(eventId),
        getOfficialSources(),
        getOfficialCategories(),
        getEpicImages({
            type: "natural",
            page: 1,
            limit: 1,
        }),
    ]);

    const sourceIds = new Set(event.sources.map((source) => source.id));
    const categoryIds = new Set(event.categories.map((category) => category.id));

    const officialSources = sources.filter((source) => sourceIds.has(source.id));
    const officialCategories = categories.filter((category) =>
        categoryIds.has(category.id),
    );

    const epicBackground = epicResponse.data[0] ?? null;

    return {
        event,
        officialSources,
        officialCategories,
        epicBackground,
        readableSummary: createReadableSummary(event),
        completeness: {
            hasDescription: Boolean(event.description),
            hasSources: event.sources.length > 0,
            hasGeometry: event.geometry.length > 0,
            hasCoordinates: Boolean(event.coordinates),
            hasCategories: event.categories.length > 0,
            hasOfficialSourceDetails: officialSources.length > 0,
            hasCategoryDetails: officialCategories.length > 0,
            hasEpicBackground: Boolean(epicBackground),
        },
    };
};