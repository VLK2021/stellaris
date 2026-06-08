import {NextResponse} from "next/server";

import {getMarsOverview} from "@/src/services/mars";

export async function GET() {
    try {
        const data = await getMarsOverview();

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
                        : "Failed to load Mars overview.",
            },
            {
                status: 500,
            },
        );
    }
}