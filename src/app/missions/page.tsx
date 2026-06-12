import type {Metadata} from "next";

import {MissionsPage} from "@/src/components/mission";
import {
    getMissionStats,
    getMissions,
} from "@/src/services/missions";
import {BRAND} from "@/src/constants/brand";

export const metadata: Metadata = {
    title: "NASA Missions Archive",
    description:
        "Explore NASA missions through aggregated open data: mission history, spacecraft, operators, timelines, media, crew and source references.",
    alternates: {
        canonical: `${BRAND.url}/missions`,
    },
    openGraph: {
        title: "NASA Missions Archive | Stellaris",
        description:
            "Browse historic and modern NASA missions through a structured mission archive.",
        url: `${BRAND.url}/missions`,
        siteName: BRAND.name,
        type: "website",
    },
};

export default function Page() {
    const missions = getMissions();
    const stats = getMissionStats();

    return (
        <MissionsPage
            missions={missions}
            stats={stats}
        />
    );
}