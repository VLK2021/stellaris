import type {Metadata} from "next";
import {notFound} from "next/navigation";

import {MarsRoverDetailsPage} from "@/src/components/mars/rovers/details";
import {
    getMarsRoverMeta,
    MARS_ROVERS,
} from "@/src/services/mars";
import {BRAND} from "@/src/constants/brand";

import type {MarsRoverName} from "@/src/types/mars";

type Props = {
    params: Promise<{
        rover: string;
    }>;
};

const isMarsRover = (value: string): value is MarsRoverName => {
    return MARS_ROVERS.includes(value as MarsRoverName);
};

const formatRoverName = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
};

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const {rover} = await params;

    if (!isMarsRover(rover)) {
        return {
            title: "Mars Rover Not Found",
        };
    }

    const name = formatRoverName(rover);

    return {
        title: `${name} Mars Rover`,
        description:
            `Explore NASA ${name} Mars rover mission data, cameras, landing date, launch date and photo archive through Stellaris.`,
        alternates: {
            canonical: `${BRAND.url}/mars/rovers/${encodeURIComponent(rover)}`,
        },
        openGraph: {
            title: `${name} Mars Rover | Stellaris`,
            description:
                `Discover NASA ${name} rover mission details and Mars exploration data.`,
            url: `${BRAND.url}/mars/rovers/${encodeURIComponent(rover)}`,
            siteName: BRAND.name,
            type: "website",
        },
    };
};

export default async function Page({params}: Props) {
    const {rover} = await params;

    if (!isMarsRover(rover)) {
        notFound();
    }

    const data = getMarsRoverMeta(rover);

    return <MarsRoverDetailsPage rover={data} />;
}