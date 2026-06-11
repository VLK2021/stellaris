import {NextRequest, NextResponse} from "next/server";

import {getAggregatedMissionBySlug} from "@/src/services/missions";

export const GET = async (request: NextRequest) => {
    try {
        const slug =
            request.nextUrl.searchParams.get("slug") ?? "apollo-11";

        const data = await getAggregatedMissionBySlug(slug);

        if (!data) {
            return NextResponse.json(
                {
                    success: false,
                    data: null,
                    message: "Mission not found.",
                },
                {
                    status: 404,
                },
            );
        }

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                data: null,
                message:
                    error instanceof Error
                        ? error.message
                        : "Mission aggregation failed.",
            },
            {
                status: 500,
            },
        );
    }
};