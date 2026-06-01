import {NextResponse} from "next/server";

import {getGibsLayers} from "@/src/services/earth";

export async function GET() {
    try {
        const response = await getGibsLayers();

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to load NASA GIBS layers.",
            },
            {status: 500},
        );
    }
}