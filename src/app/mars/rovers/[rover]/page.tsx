import {notFound} from "next/navigation";

import {MarsRoverDetailsPage} from "@/src/components/mars/rovers/details";
import {
    getMarsRoverMeta,
    MARS_ROVERS,
} from "@/src/services/mars";

import type {MarsRoverName} from "@/src/types/mars";

type Props = {
    params: Promise<{
        rover: string;
    }>;
};

const isMarsRover = (value: string): value is MarsRoverName => {
    return MARS_ROVERS.includes(value as MarsRoverName);
};

export default async function Page({params}: Props) {
    const {rover} = await params;

    if (!isMarsRover(rover)) {
        notFound();
    }

    const data = getMarsRoverMeta(rover);

    return <MarsRoverDetailsPage rover={data} />;
}