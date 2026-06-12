import type {Metadata} from "next";

import {getMarsOverview} from "@/src/services/mars";
import {MarsOverviewPage} from "@/src/components/mars/overview";
import {BRAND} from "@/src/constants/brand";

export const metadata: Metadata = {
    title: "Mars Rover Photos and Mission Data",
    description:
        "Explore Mars through NASA rover data: Curiosity, Opportunity and Spirit photos, cameras, sols, landing dates and mission archives.",
    alternates: {
        canonical: `${BRAND.url}/mars`,
    },
    openGraph: {
        title: "Mars Rover Photos and Mission Data | Stellaris",
        description:
            "Browse NASA Mars rover imagery and mission data in a cinematic Mars exploration interface.",
        url: `${BRAND.url}/mars`,
        siteName: BRAND.name,
        type: "website",
    },
};

export default async function Page() {
    const data = await getMarsOverview();

    return <MarsOverviewPage data={data} />;
}