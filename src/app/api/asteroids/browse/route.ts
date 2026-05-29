import {NextRequest, NextResponse} from "next/server";

import {getAsteroidsBrowse} from "@/src/services/asteroids/asteroidsBrowse.service";

export const dynamic = "force-dynamic";

const toNumber = (value: string | null) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
};

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const result = await getAsteroidsBrowse({
            page: toNumber(searchParams.get("page")),
            limit: toNumber(searchParams.get("limit")),
        });

        return NextResponse.json({
            success: true,
            data: result.items,
            pagination: result.pagination,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to browse asteroids.",
            },
            {status: 500},
        );
    }
}