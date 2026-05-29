import {NextRequest, NextResponse} from "next/server";

import {getApodExplorerData} from "@/src/services/apod/apodExplorer.service";
import {getPaginatedApod} from "@/src/services/apod/apodPagination.service";

import type {
    ApodExplorerApiResponse,
    ApodExplorerQuery,
} from "@/src/types/apod/apod.types";

export const dynamic = "force-dynamic";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 24;
const MAX_LIMIT = 96;

const normalizePositiveNumber = (
    value: string | null,
    fallback: number,
    max?: number,
) => {
    const parsed = Number(value);

    if (!Number.isFinite(parsed) || parsed < 1) {
        return fallback;
    }

    if (max) {
        return Math.min(parsed, max);
    }

    return parsed;
};

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const countParam = searchParams.get("count");

        const page = normalizePositiveNumber(
            searchParams.get("page"),
            DEFAULT_PAGE,
        );

        const limit = normalizePositiveNumber(
            searchParams.get("limit"),
            DEFAULT_LIMIT,
            MAX_LIMIT,
        );

        const query: ApodExplorerQuery = {
            date: searchParams.get("date") ?? undefined,
            startDate: searchParams.get("start_date") ?? undefined,
            endDate: searchParams.get("end_date") ?? undefined,
            count: countParam ? Number(countParam) : undefined,
            thumbs: searchParams.get("thumbs") !== "false",
        };

        if (query.startDate && query.endDate && !query.count) {
            const result = await getPaginatedApod({
                startDate: query.startDate,
                endDate: query.endDate,
                page,
                limit,
            });

            return NextResponse.json({
                success: true,
                data: result.data,
                pagination: result.pagination,
            });
        }

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