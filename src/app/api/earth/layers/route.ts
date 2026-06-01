import {NextResponse} from "next/server";

import {GIBS_SAMPLE_LAYERS} from "@/src/constants/earth/earth.constants";

export async function GET() {
    return NextResponse.json({
        success: true,
        data: [...GIBS_SAMPLE_LAYERS],
    });
}