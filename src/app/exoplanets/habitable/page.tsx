import type {Metadata} from "next";

import {ExoplanetsHabitablePage} from "@/src/components/exoplanets/habitable";
import {BRAND} from "@/src/constants/brand";

export const metadata: Metadata = {
    title: "Potentially Habitable Exoplanets",
    description:
        "Explore potentially habitable exoplanets, Earth-like worlds and distant planetary environments through Stellaris.",
    alternates: {
        canonical: `${BRAND.url}/exoplanets/habitable`,
    },
    openGraph: {
        title: "Potentially Habitable Exoplanets | Stellaris",
        description:
            "Discover habitable-zone exoplanets and Earth-like distant worlds.",
        url: `${BRAND.url}/exoplanets/habitable`,
        siteName: BRAND.name,
        type: "website",
    },
};

export default function Page() {
    return <ExoplanetsHabitablePage />;
}