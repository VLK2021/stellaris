import {NextRequest, NextResponse} from "next/server";

import {getEarthEventEnrichment} from "@/src/services/earth/earthEventEnrichment.service";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(_request: NextRequest, {params}: Props) {
    try {
        const {id} = await params;

        const data = await getEarthEventEnrichment(decodeURIComponent(id));

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to load Earth event details.",
            },
            {status: 500},
        );
    }
}