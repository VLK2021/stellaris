import {NextResponse} from "next/server";

import {getMediaAssets} from "@/src/services/media";

import type {MediaApiResponse} from "@/src/types/media";

type Props = {
    params: Promise<{
        nasaId: string;
    }>;
};

export async function GET(_: Request, {params}: Props) {
    try {
        const {nasaId} = await params;

        const data = await getMediaAssets(nasaId);

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
                    : "NASA media assets failed.",
        };

        return NextResponse.json(response, {status: 500});
    }
}