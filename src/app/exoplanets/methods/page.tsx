import type {Metadata} from "next";

import {ExoplanetsMethodsPage} from "@/src/components/exoplanets/methods";
import {BRAND} from "@/src/constants/brand";

export const metadata: Metadata = {
    title: "Exoplanet Discovery Methods",
    description:
        "Learn how exoplanets are discovered through transit, radial velocity, direct imaging and other astronomical detection methods.",
    alternates: {
        canonical: `${BRAND.url}/exoplanets/methods`,
    },
    openGraph: {
        title: "Exoplanet Discovery Methods | Stellaris",
        description:
            "Explore the scientific methods used to detect distant planets.",
        url: `${BRAND.url}/exoplanets/methods`,
        siteName: BRAND.name,
        type: "website",
    },
};

export default function Page() {
    return <ExoplanetsMethodsPage />;
}