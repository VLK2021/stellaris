import {NextRequest, NextResponse} from "next/server";

import {
    getMarsRoverMeta,
    getMarsRoverPhotos,
    MARS_ROVERS,
} from "@/src/services/mars";

import type {MarsRoverName} from "@/src/types/mars";

const isMarsRover = (value: string | null): value is MarsRoverName => {
    return Boolean(value && MARS_ROVERS.includes(value as MarsRoverName));
};

const getNumber = (value: string | null) => {
    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : undefined;
};

export async function GET(request: NextRequest) {
    try {
        const {searchParams} = request.nextUrl;

        const roverParam = searchParams.get("rover");

        if (!isMarsRover(roverParam)) {
            return NextResponse.json(
                {
                    success: false,
                    data: {
                        photos: [],
                        query: {
                            rover: roverParam,
                        },
                    },
                    message: "Invalid Mars rover.",
                },
                {status: 400},
            );
        }

        const meta = getMarsRoverMeta(roverParam);

        const data = await getMarsRoverPhotos({
            rover: roverParam,
            sol: getNumber(searchParams.get("sol")),
            earthDate: searchParams.get("earthDate") ?? meta.defaultEarthDate,
            camera: searchParams.get("camera") ?? undefined,
            page: getNumber(searchParams.get("page")) ?? 1,
        });

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                data: {
                    photos: [],
                    query: {},
                },
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to load Mars photos.",
            },
            {status: 500},
        );
    }
}