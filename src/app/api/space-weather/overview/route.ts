import {NextRequest, NextResponse} from "next/server";

import {getSpaceWeatherOverview} from "@/src/services/space-weather/spaceWeatherOverview.service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const result = await getSpaceWeatherOverview({
            startDate: searchParams.get("startDate") ?? "",
            endDate: searchParams.get("endDate") ?? "",
        });

        return NextResponse.json({
            success: true,
            data: result,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to load space weather overview.",
            },
            {status: 500},
        );
    }
}