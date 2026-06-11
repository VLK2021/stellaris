import {NextResponse} from "next/server";

import {
    getMissionStats,
    getMissions,
} from "@/src/services/missions";

export const GET = () => {
    return NextResponse.json({
        success: true,
        data: {
            stats: getMissionStats(),
            missions: getMissions(),
        },
    });
};