import {NextResponse} from "next/server";

import {getEarthOverview} from "@/src/services/earth";

export async function GET() {
    try {
        const response = await getEarthOverview();

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to load Earth overview.",
            },
            {status: 500},
        );
    }
}