import {NextRequest, NextResponse} from "next/server";

import {getAsteroidDetails} from "@/src/services/asteroids/asteroidDetails.service";

export const dynamic = "force-dynamic";

type Params = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(
    _request: NextRequest,
    {params}: Params,
) {
    try {
        const {id} = await params;

        const data = await getAsteroidDetails(id);

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
                        : "Failed to load asteroid details.",
            },
            {status: 500},
        );
    }
}