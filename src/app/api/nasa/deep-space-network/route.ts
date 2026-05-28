import {NextResponse} from "next/server";

import type {
    DeepSpaceNetworkApiResponse,
    DeepSpaceSignalId,
    DeepSpaceSignalTelemetry,
} from "@/src/types/deepSpaceNetwork";

export const dynamic = "force-dynamic";

type HorizonsTarget = {
    id: DeepSpaceSignalId;
    command: string;
};

const TARGETS: HorizonsTarget[] = [
    {id: "voyager1", command: "-31"},
    {id: "jamesWebb", command: "-170"},
    {id: "newHorizons", command: "-98"},
    {id: "hubble", command: "-48"},
    {id: "mro", command: "-74"},
    {id: "perseverance", command: "-168"},
];

const CACHE_TTL = 1000 * 60 * 20;

let CACHE: DeepSpaceNetworkApiResponse | null = null;
let CACHE_TIME = 0;

const formatDelay = (minutes: number): string => {
    if (!Number.isFinite(minutes)) return "—";

    const totalSeconds = Math.round(minutes * 60);
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) return `${hours}h ${mins}m`;
    if (mins > 0) return `${mins}m ${secs}s`;

    return `${secs}s`;
};

const fetchHorizonsTelemetry = async (
    target: HorizonsTarget,
): Promise<DeepSpaceSignalTelemetry> => {
    const now = new Date();
    const stop = new Date(now.getTime() + 60 * 60 * 1000);

    const params = new URLSearchParams({
        format: "json",
        COMMAND: `'${target.command}'`,
        OBJ_DATA: "NO",
        MAKE_EPHEM: "YES",
        EPHEM_TYPE: "OBSERVER",
        CENTER: "'500@399'",
        START_TIME: `'${now.toISOString()}'`,
        STOP_TIME: `'${stop.toISOString()}'`,
        STEP_SIZE: "'1 h'",
        QUANTITIES: "'20'",
    });

    try {
        const response = await fetch(
            `https://ssd.jpl.nasa.gov/api/horizons.api?${params.toString()}`,
            {next: {revalidate: 1200}},
        );

        if (!response.ok) {
            throw new Error(`Horizons request failed: ${response.status}`);
        }

        const json = await response.json();
        const result = String(json.result ?? "");

        const dataLine =
            result
                .split("\n")
                .find((line) => line.includes("delta") || line.trim().match(/^\d{4}/)) ?? "";

        const deltaMatch = result.match(/delta\s+deldot\s+S-O-T/);
        const numberLine = result
            .split("\n")
            .find((line) => /\s\d+\.\d+/.test(line) && line.includes("A.D."));

        const numericValues = numberLine?.match(/[-+]?\d+\.\d+(?:E[-+]?\d+)?/gi) ?? [];

        const auDistance = numericValues.length > 0 ? Number(numericValues[0]) : null;
        const lightTimeMinutes = numericValues.length > 2 ? Number(numericValues[2]) : null;

        return {
            id: target.id,
            status: auDistance ? "online" : "unavailable",
            distanceKm: auDistance ? Math.round(auDistance * 149_597_870.7) : null,
            lightDelay: lightTimeMinutes ? formatDelay(lightTimeMinutes) : null,
            updatedAt: new Date().toISOString(),
        };
    } catch {
        return {
            id: target.id,
            status: "unavailable",
            distanceKm: null,
            lightDelay: null,
            updatedAt: null,
        };
    }
};

export async function GET() {
    const now = Date.now();

    if (CACHE && now - CACHE_TIME < CACHE_TTL) {
        return NextResponse.json(CACHE);
    }

    const signals = await Promise.all(
        TARGETS.map((target) => fetchHorizonsTelemetry(target)),
    );

    const data: DeepSpaceNetworkApiResponse = {
        success: true,
        data: {
            signals,
            updatedAt: new Date().toISOString(),
        },
    };

    CACHE = data;
    CACHE_TIME = now;

    return NextResponse.json(data);
}