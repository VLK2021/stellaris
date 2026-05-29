import {NextRequest, NextResponse} from "next/server";

import {getAsteroidsFeed} from "@/src/services/asteroids/asteroidsFeed.service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const startDate = searchParams.get("start_date") ?? "";
        const endDate = searchParams.get("end_date") ?? "";

        const result = await getAsteroidsFeed({
            startDate,
            endDate,
        });

        return NextResponse.json({
            success: true,
            data: result.items,
            stats: result.stats,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to load asteroids feed.",
            },
            {status: 500},
        );
    }
}