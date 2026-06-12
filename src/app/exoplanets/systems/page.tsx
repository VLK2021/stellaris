import type {Metadata} from "next";

import {ExoplanetsSystemsPage} from "@/src/components/exoplanets/systems/ExoplanetsSystemsPage";
import {BRAND} from "@/src/constants/brand";

export const metadata: Metadata = {
    title: "Exoplanetary Systems",
    description:
        "Explore exoplanetary systems, host stars, multi-planet systems and distant planetary architecture through Stellaris.",
    alternates: {
        canonical: `${BRAND.url}/exoplanets/systems`,
    },
    openGraph: {
        title: "Exoplanetary Systems | Stellaris",
        description:
            "Discover distant planetary systems and their exoplanet architecture.",
        url: `${BRAND.url}/exoplanets/systems`,
        siteName: BRAND.name,
        type: "website",
    },
};

export default function Page() {
    return <ExoplanetsSystemsPage />;
}