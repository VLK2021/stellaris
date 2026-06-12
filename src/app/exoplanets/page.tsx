import type {Metadata} from "next";

import {ExoplanetsPage} from "@/src/components/exoplanets/ExoplanetsPage";
import {BRAND} from "@/src/constants/brand";

export const metadata: Metadata = {
    title: "Exoplanets Explorer",
    description:
        "Explore exoplanets, planetary systems, habitable worlds, atmospheres and discovery methods through a visual space research interface.",
    alternates: {
        canonical: `${BRAND.url}/exoplanets`,
    },
    openGraph: {
        title: "Exoplanets Explorer | Stellaris",
        description:
            "Discover exoplanets, planetary systems and distant worlds in an immersive research interface.",
        url: `${BRAND.url}/exoplanets`,
        siteName: BRAND.name,
        type: "website",
    },
};

export default function Page() {
    return <ExoplanetsPage />;
}