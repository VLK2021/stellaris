import {NextRequest, NextResponse} from "next/server";

import {getEpicImages} from "@/src/services/earth";
import type {EpicImageType} from "@/src/types/earth/earth.types";

const toNumber = (value: string | null) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
};

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const response = await getEpicImages({
            type: (searchParams.get("type") ?? "natural") as EpicImageType,
            date: searchParams.get("date") ?? undefined,
            page: toNumber(searchParams.get("page")),
            limit: toNumber(searchParams.get("limit")),
        });

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to load EPIC images.",
            },
            {status: 500},
        );
    }
}