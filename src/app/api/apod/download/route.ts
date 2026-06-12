import {NextRequest, NextResponse} from "next/server";

export const dynamic = "force-dynamic";

const getFileNameFromUrl = (url: string) => {
    const pathname = new URL(url).pathname;
    const fileName = pathname.split("/").filter(Boolean).at(-1);

    return fileName || "stellaris-apod-image.jpg";
};

export async function GET(request: NextRequest) {
    try {
        const imageUrl = request.nextUrl.searchParams.get("url");

        if (!imageUrl) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Image URL is required.",
                },
                {status: 400},
            );
        }

        const response = await fetch(imageUrl, {
            headers: {
                Accept: "image/*",
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Failed to download image.",
                },
                {status: response.status},
            );
        }

        const contentType =
            response.headers.get("content-type") ?? "image/jpeg";

        const buffer = await response.arrayBuffer();

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": contentType,
                "Content-Disposition": `attachment; filename="${getFileNameFromUrl(imageUrl)}"`,
                "Cache-Control": "public, max-age=3600",
            },
        });
    } catch {
        return NextResponse.json(
            {
                success: false,
                message: "Failed to process image download.",
            },
            {status: 500},
        );
    }
}