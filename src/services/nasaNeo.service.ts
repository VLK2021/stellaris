import type {NasaLiveNeo} from "@/src/types/nasaLive";
import {fetchNasaJson} from "./nasaClient.service";

type NeoItem = {
    id: string;
    name: string;
    is_potentially_hazardous_asteroid: boolean;
    estimated_diameter: {
        meters: {
            estimated_diameter_max: number;
        };
    };
    close_approach_data: {
        miss_distance: {
            kilometers: string;
        };
        relative_velocity: {
            kilometers_per_hour: string;
        };
    }[];
};

type NeoFeedResponse = {
    near_earth_objects: Record<string, NeoItem[]>;
};

export type NeoFeedParams = {
    startDate?: string;
    endDate?: string;
};

const today = () => new Date().toISOString().slice(0, 10);

export const getNeoFeed = async (params: NeoFeedParams = {}) => {
    const startDate = params.startDate ?? today();
    const endDate = params.endDate ?? startDate;

    return fetchNasaJson<NeoFeedResponse>("/neo/rest/v1/feed", {
        params: {
            start_date: startDate,
            end_date: endDate,
        },
    });
};

export const getNeoLookup = async (asteroidId: string) => {
    return fetchNasaJson<NeoItem>(`/neo/rest/v1/neo/${asteroidId}`);
};

export const getNeoBrowse = async (page = 0, size = 20) => {
    return fetchNasaJson("/neo/rest/v1/neo/browse", {
        params: {page, size},
    });
};

export const getNasaNeoToday = async (): Promise<NasaLiveNeo> => {
    const date = today();
    const data = await getNeoFeed({startDate: date, endDate: date});
    const objects = data.near_earth_objects[date] ?? [];

    const sorted = [...objects].sort((a, b) => {
        const aDistance = Number(a.close_approach_data[0]?.miss_distance.kilometers ?? Infinity);
        const bDistance = Number(b.close_approach_data[0]?.miss_distance.kilometers ?? Infinity);
        return aDistance - bDistance;
    });

    const closest = sorted[0];

    if (!closest) {
        return {
            totalToday: 0,
            closestName: "No objects today",
            closestDistanceKm: 0,
            closestVelocityKmh: 0,
            estimatedDiameterMeters: 0,
            isHazardous: false,
        };
    }

    const approach = closest.close_approach_data[0];

    return {
        totalToday: objects.length,
        closestName: closest.name,
        closestDistanceKm: Math.round(Number(approach.miss_distance.kilometers)),
        closestVelocityKmh: Math.round(Number(approach.relative_velocity.kilometers_per_hour)),
        estimatedDiameterMeters: Math.round(closest.estimated_diameter.meters.estimated_diameter_max),
        isHazardous: closest.is_potentially_hazardous_asteroid,
    };
};