import type {Metadata} from "next";

import {AsteroidsPageClient} from "@/src/components/asteroids";
import {BRAND} from "@/src/constants/brand";

export const metadata: Metadata = {
    title: "Near Earth Asteroids Tracker",
    description:
        "Track near-Earth objects and asteroid data powered by NASA NeoWs. Explore close approaches, hazardous objects, sizes and orbital details.",
    alternates: {
        canonical: `${BRAND.url}/asteroids`,
    },
    openGraph: {
        title: "Near Earth Asteroids Tracker | Stellaris",
        description:
            "Explore NASA asteroid data, close approaches and near-Earth object monitoring.",
        url: `${BRAND.url}/asteroids`,
        siteName: BRAND.name,
        type: "website",
    },
};

const AsteroidsPage = () => {
    return <AsteroidsPageClient />;
};

export default AsteroidsPage;