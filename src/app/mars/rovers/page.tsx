import type {Metadata} from "next";

import {getMarsRoversSummary} from "@/src/services/mars";
import {MarsRoversPage} from "@/src/components/mars/rovers";
import {BRAND} from "@/src/constants/brand";

export const metadata: Metadata = {
    title: "Mars Rovers",
    description:
        "Explore NASA Mars rovers, their mission status, cameras, landing dates, launch dates and photo archives.",
    alternates: {
        canonical: `${BRAND.url}/mars/rovers`,
    },
    openGraph: {
        title: "Mars Rovers | Stellaris",
        description:
            "Discover NASA Mars rover missions and their exploration data.",
        url: `${BRAND.url}/mars/rovers`,
        siteName: BRAND.name,
        type: "website",
    },
};

export default async function Page() {
    const rovers = await getMarsRoversSummary();

    return <MarsRoversPage rovers={rovers} />;
}