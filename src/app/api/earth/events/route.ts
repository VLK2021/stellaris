import {NextRequest, NextResponse} from "next/server";

import {getEonetEvents} from "@/src/services/earth";

import type {EonetStatus} from "@/src/types/earth/earth.types";

const toNumber = (value: string | null) => {
    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : undefined;
};

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const response = await getEonetEvents({
            page: toNumber(searchParams.get("page")),
            limit: toNumber(searchParams.get("limit")),
            status: (searchParams.get("status") ?? "all") as EonetStatus,
            category: searchParams.get("category") ?? undefined,
            days: toNumber(searchParams.get("days")),
        });

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to load Earth events.",
            },
            {status: 500},
        );
    }
}