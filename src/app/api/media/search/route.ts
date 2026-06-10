import {NextResponse} from "next/server";

import {searchMedia} from "@/src/services/media";

import type {MediaApiResponse, MediaSearchQuery} from "@/src/types/media";

export async function GET(request: Request) {
    try {
        const {searchParams} = new URL(request.url);

        const mediaType = searchParams.get("mediaType");

        const query: MediaSearchQuery = {
            query: searchParams.get("q") ?? undefined,
            mediaType:
                mediaType === "image" ||
                mediaType === "video" ||
                mediaType === "audio"
                    ? mediaType
                    : undefined,
            center: searchParams.get("center") ?? undefined,
            yearStart: searchParams.get("yearStart") ?? undefined,
            yearEnd: searchParams.get("yearEnd") ?? undefined,
            page: Number(searchParams.get("page") ?? 1),
        };

        const data = await searchMedia(query);

        const response: MediaApiResponse<typeof data> = {
            success: true,
            data,
        };

        return NextResponse.json(response);
    } catch (error) {
        const response: MediaApiResponse<null> = {
            success: false,
            data: null,
            message:
                error instanceof Error
                    ? error.message
                    : "NASA media search failed.",
        };

        return NextResponse.json(response, {status: 500});
    }
}