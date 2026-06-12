import type {Metadata} from "next";

import {EarthPageClient} from "@/src/components/earth/EarthPageClient";
import {BRAND} from "@/src/constants/brand";

export const metadata: Metadata = {
    title: "Earth Observation",
    description:
        "Explore Earth from space with NASA open data: EPIC imagery, planetary views, Earth observation layers and visual satellite data.",
    alternates: {
        canonical: `${BRAND.url}/earth`,
    },
    openGraph: {
        title: "Earth Observation | Stellaris",
        description:
            "View Earth through NASA imagery and open planetary observation data.",
        url: `${BRAND.url}/earth`,
        siteName: BRAND.name,
        type: "website",
    },
};

const EarthPage = () => {
    return <EarthPageClient />;
};

export default EarthPage;