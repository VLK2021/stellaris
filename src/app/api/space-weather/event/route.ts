import {NextRequest, NextResponse} from "next/server";

import {getSpaceWeatherEventDetails} from "@/src/services/space-weather/donkiEventDetails.service";

import type {
    SpaceWeatherEvent,
} from "@/src/types/space-weather/spaceWeather.types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const eventId = searchParams.get("eventId") ?? "";
        const type = searchParams.get("type") as SpaceWeatherEvent["type"] | null;
        const startDate = searchParams.get("startDate") ?? "";
        const endDate = searchParams.get("endDate") ?? "";

        if (!type) {
            throw new Error("Event type is required.");
        }

        const data = await getSpaceWeatherEventDetails({
            eventId,
            type,
            startDate,
            endDate,
        });

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to load space weather event details.",
            },
            {status: 500},
        );
    }
}