import type {Metadata} from "next";

import {Home} from "@/src/components/home/Home";

export const metadata: Metadata = {
    title: "Stellaris — Explore the Universe Through NASA Open Data",
    description:
        "Stellaris is a premium cinematic space exploration platform powered by NASA open data. Explore Earth, Mars, asteroids, space weather, missions and cosmic media.",
    openGraph: {
        title: "Stellaris — Explore the Universe Through NASA Open Data",
        description:
            "A cinematic space exploration platform powered by NASA open data.",
        type: "website",
    },
};

export default function Page() {
    return <Home />;
}