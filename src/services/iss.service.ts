import type {IssPosition} from "@/src/types/nasaLive";
import {fetchNasaJson} from "./nasaClient.service";

const ISS_BASE_URL = "https://api.wheretheiss.at";

type IssResponse = {
    latitude: number;
    longitude: number;
    altitude: number;
    velocity: number;
    visibility: string;
    timestamp: number;
};

export const getIssPosition = async (): Promise<IssPosition> => {
    const data = await fetchNasaJson<IssResponse>("/v1/satellites/25544", {
        baseUrl: ISS_BASE_URL,
        withApiKey: false,
        revalidate: 10,
        timeoutMs: 10000,
    });

    return {
        latitude: data.latitude,
        longitude: data.longitude,
        altitudeKm: data.altitude,
        velocityKmh: data.velocity,
        visibility: data.visibility,
        timestamp: data.timestamp,
    };
};