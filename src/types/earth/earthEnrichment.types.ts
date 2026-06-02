import type {
    EarthEvent,
    EpicImage,
} from "@/src/types/earth/earth.types";

export type EarthOfficialSourceDetails = {
    id: string;
    title: string | null;
    homepage: string | null;
    eventsApiLink: string | null;
    raw: Record<string, unknown>;
};

export type EarthOfficialCategoryDetails = {
    id: string;
    title: string;
    description: string | null;
    layersCount: number;
    raw: Record<string, unknown>;
};

export type EarthEventDataCompleteness = {
    hasDescription: boolean;
    hasSources: boolean;
    hasGeometry: boolean;
    hasCoordinates: boolean;
    hasCategories: boolean;
    hasOfficialSourceDetails: boolean;
    hasCategoryDetails: boolean;
    hasEpicBackground: boolean;
};

export type EarthEventEnrichment = {
    event: EarthEvent;
    officialSources: EarthOfficialSourceDetails[];
    officialCategories: EarthOfficialCategoryDetails[];
    epicBackground: EpicImage | null;
    readableSummary: {
        title: string;
        category: string;
        status: string;
        latestDate: string | null;
        coordinates: number[] | null;
        geometryPoints: number;
        sourceIds: string[];
    };
    completeness: EarthEventDataCompleteness;
};

export type EarthEventEnrichmentResponse = {
    success: boolean;
    data: EarthEventEnrichment;
};