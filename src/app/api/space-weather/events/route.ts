import {NextRequest, NextResponse} from "next/server";

import {getSpaceWeatherEvents} from "@/src/services/space-weather/donkiEvents.service";

import type {SpaceWeatherTypeFilter} from "@/src/types/space-weather/spaceWeather.types";

export const dynamic = "force-dynamic";

const toNumber = (value: string | null) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
};

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const startDate = searchParams.get("startDate") ?? "";
        const endDate = searchParams.get("endDate") ?? "";

        const type = (searchParams.get("type") ?? "all") as SpaceWeatherTypeFilter;

        const result = await getSpaceWeatherEvents({
            startDate,
            endDate,
            type,
            page: toNumber(searchParams.get("page")),
            limit: toNumber(searchParams.get("limit")),
        });

        return NextResponse.json({
            success: true,
            data: result.data,
            stats: result.stats,
            pagination: result.pagination,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to load space weather events.",
            },
            {status: 500},
        );
    }
}