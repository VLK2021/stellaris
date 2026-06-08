import {NextResponse} from "next/server";

import {getMarsFilters} from "@/src/services/mars";

export async function GET() {
    try {
        const data = await getMarsFilters();

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                data: {
                    rovers: [],
                },
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to load Mars filters.",
            },
            {status: 500},
        );
    }
}