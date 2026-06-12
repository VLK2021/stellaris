import type {Metadata} from "next";

import {ExoplanetsCatalogPage} from "@/src/components/exoplanets/catalog/ExoplanetsCatalogPage";
import {BRAND} from "@/src/constants/brand";

export const metadata: Metadata = {
    title: "Exoplanets Catalog",
    description:
        "Browse a visual catalog of exoplanets, distant worlds, planetary systems and discovery data through Stellaris.",
    alternates: {
        canonical: `${BRAND.url}/exoplanets/catalog`,
    },
    openGraph: {
        title: "Exoplanets Catalog | Stellaris",
        description:
            "Explore a structured catalog of distant planets and exoplanet discoveries.",
        url: `${BRAND.url}/exoplanets/catalog`,
        siteName: BRAND.name,
        type: "website",
    },
};

export default function Page() {
    return <ExoplanetsCatalogPage />;
}