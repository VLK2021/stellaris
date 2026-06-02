import {NextRequest, NextResponse} from "next/server";

import {getGibsLayerDetails} from "@/src/services/earth/gibsEarth.service";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(_request: NextRequest, {params}: Props) {
    try {
        const {id} = await params;

        const data = await getGibsLayerDetails(decodeURIComponent(id));

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
                        : "Failed to load NASA GIBS layer details.",
            },
            {status: 500},
        );
    }
}