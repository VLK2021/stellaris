import type {Metadata} from "next";

import {Home} from "@/src/components/home/Home";
import {getNasaAssets} from "@/src/services/nasaAssets.service";
import {BRAND} from "@/src/constants/brand";

export const metadata: Metadata = {
    title: "Stellaris — NASA Open Data Space Explorer",
    description:
        "Explore NASA open data through an immersive space platform: Earth imagery, Mars rovers, asteroids, space weather, missions, exoplanets, APOD and cosmic media.",
    alternates: {
        canonical: BRAND.url,
    },
    openGraph: {
        title: "Stellaris — NASA Open Data Space Explorer",
        description:
            "A cinematic space exploration platform powered by NASA open data.",
        url: BRAND.url,
        siteName: BRAND.name,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Stellaris — NASA Open Data Space Explorer",
        description:
            "Explore Earth, Mars, asteroids, missions, exoplanets and space weather through NASA open data.",
    },
};

export default async function Page() {
    const assets = await getNasaAssets();

    return <Home assets={assets} />;
}