import {NextResponse} from "next/server";

import {getNasaAssets} from "@/src/services/nasaAssets.service";

export const revalidate = 60 * 60 * 24;

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
            {status: 500},
        );
    }
}