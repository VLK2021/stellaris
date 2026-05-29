import {NextRequest, NextResponse} from "next/server";

import {getApodExplorerData} from "@/src/services/apod/apodExplorer.service";
import type {
    ApodExplorerApiResponse,
    ApodExplorerQuery,
} from "@/src/types/apod/apod.types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const countParam = searchParams.get("count");

        const query: ApodExplorerQuery = {
            date: searchParams.get("date") ?? undefined,
            startDate: searchParams.get("start_date") ?? undefined,
            endDate: searchParams.get("end_date") ?? undefined,
            count: countParam ? Number(countParam) : undefined,
            thumbs: searchParams.get("thumbs") !== "false",
        };

        const data = await getApodExplorerData(query);

        const response: ApodExplorerApiResponse = {
            success: true,
            data,
        };

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to load APOD data",
            },
            {status: 500},
        );
    }
}