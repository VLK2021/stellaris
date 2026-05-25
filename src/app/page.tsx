import type {Metadata} from "next";

import {Home} from "@/src/components/home/Home";
import {getNasaAssets} from "@/src/services/nasaAssets.service";

export const metadata: Metadata = {
    title: "Stellaris — Explore the Universe Through NASA Open Data",
    description:
        "Stellaris is a premium cinematic space exploration platform powered by NASA open data.",
};

export default async function Page() {
    const assets = await getNasaAssets();

    return <Home assets={assets} />;
}