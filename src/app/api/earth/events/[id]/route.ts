import {NextRequest, NextResponse} from "next/server";

import {getEonetEventById} from "@/src/services/earth";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(_request: NextRequest, {params}: Props) {
    try {
        const resolvedParams = await params;

        const response = await getEonetEventById(
            decodeURIComponent(resolvedParams.id),
        );

        return NextResponse.json(response);
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