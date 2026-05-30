import {NextRequest, NextResponse} from "next/server";

import {getSpaceWeatherNotifications} from "@/src/services/space-weather/donkiNotifications.service";

import type {
    SpaceWeatherNotificationType,
} from "@/src/types/space-weather/spaceWeatherNotification.types";

export const dynamic = "force-dynamic";

const toNumber = (value: string | null) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
};

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const result = await getSpaceWeatherNotifications({
            startDate: searchParams.get("startDate") ?? "",
            endDate: searchParams.get("endDate") ?? "",
            type: (searchParams.get("type") ?? "all") as SpaceWeatherNotificationType,
            page: toNumber(searchParams.get("page")),
            limit: toNumber(searchParams.get("limit")),
        });

        return NextResponse.json({
            success: true,
            data: result.data,
            pagination: result.pagination,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to load space weather notifications.",
            },
            {status: 500},
        );
    }
}