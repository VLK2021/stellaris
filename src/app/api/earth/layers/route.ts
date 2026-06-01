import {NextRequest, NextResponse} from "next/server";

import {getGibsLayers} from "@/src/services/earth";

const toNumber = (value: string | null) => {
    const parsed = Number(value);

    return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
};

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const response = await getGibsLayers({
            page: toNumber(searchParams.get("page")),
            limit: toNumber(searchParams.get("limit")),
            search: searchParams.get("search") ?? "",
            format: searchParams.get("format") ?? undefined,
            sortBy:
                searchParams.get("sortBy") === "id" ||
                searchParams.get("sortBy") === "format" ||
                searchParams.get("sortBy") === "title"
                    ? searchParams.get("sortBy") as "title" | "id" | "format"
                    : "title",
            order: searchParams.get("order") === "desc" ? "desc" : "asc",
        });

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