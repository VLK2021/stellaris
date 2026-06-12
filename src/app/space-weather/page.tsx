import type {Metadata} from "next";

import {SpaceWeatherPageClient} from "@/src/components/space-weather/SpaceWeatherPageClient";
import {BRAND} from "@/src/constants/brand";

export const metadata: Metadata = {
    title: "NASA Space Weather Monitor",
    description:
        "Monitor space weather through NASA DONKI data: solar flares, coronal mass ejections, geomagnetic storms, notifications and event details.",
    alternates: {
        canonical: `${BRAND.url}/space-weather`,
    },
    openGraph: {
        title: "NASA Space Weather Monitor | Stellaris",
        description:
            "Track solar activity, CME events, geomagnetic storms and NASA DONKI space weather data.",
        url: `${BRAND.url}/space-weather`,
        siteName: BRAND.name,
        type: "website",
    },
};

const SpaceWeatherPage = () => {
    return <SpaceWeatherPageClient />;
};

export default SpaceWeatherPage;