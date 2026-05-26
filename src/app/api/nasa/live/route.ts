import {NextResponse} from "next/server";

import {getNasaLiveData} from "@/src/services/nasaLive.service";

export const revalidate = 900;

export const GET = async () => {
    try {
        const data = await getNasaLiveData();

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
                        : "Failed to load NASA live data",
            },
            {status: 500},
        );
    }
};