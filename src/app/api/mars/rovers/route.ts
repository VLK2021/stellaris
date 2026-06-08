import {NextResponse} from "next/server";

import {getMarsRoversSummary} from "@/src/services/mars";

export async function GET() {
    try {
        const data = await getMarsRoversSummary();

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                data: [],
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to load Mars rovers.",
            },
            {status: 500},
        );
    }
}