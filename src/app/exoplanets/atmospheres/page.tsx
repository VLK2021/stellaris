import type {Metadata} from "next";

import {ExoplanetsAtmospheresPage} from "@/src/components/exoplanets/atmospheres";
import {BRAND} from "@/src/constants/brand";

export const metadata: Metadata = {
    title: "Exoplanet Atmospheres",
    description:
        "Explore exoplanet atmospheres, atmospheric composition, observation methods and NASA-powered research data about distant worlds.",
    alternates: {
        canonical: `${BRAND.url}/exoplanets/atmospheres`,
    },
    openGraph: {
        title: "Exoplanet Atmospheres | Stellaris",
        description:
            "Explore atmospheres of distant planets through a visual exoplanet research interface.",
        url: `${BRAND.url}/exoplanets/atmospheres`,
        siteName: BRAND.name,
        type: "website",
    },
};

export default function AtmospherePage() {
    return <ExoplanetsAtmospheresPage />;
}