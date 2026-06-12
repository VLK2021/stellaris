import { NextResponse } from "next/server";

import { getNasaAssets } from "@/src/services/nasaAssets.service";

export const revalidate = 86400;

export async function GET() {
    try {
        const assets = await getNasaAssets();

        return NextResponse.json({
            success: true,
            data: assets,
        });
    } catch {
        return NextResponse.json(
            {
                success: false,
                data: [],
                message: "Failed to fetch NASA assets",
            },
            { status: 500 },
        );
    }
}