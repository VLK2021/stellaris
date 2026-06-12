import type {Metadata} from "next";

import {ApodPageClient} from "@/src/components/apod/ApodPageClient";
import {BRAND} from "@/src/constants/brand";

export const metadata: Metadata = {
    title: "NASA Astronomy Picture of the Day",
    description:
        "Explore NASA Astronomy Picture of the Day through Stellaris: daily space images, cosmic discoveries, explanations and visual astronomy.",
    alternates: {
        canonical: `${BRAND.url}/apod`,
    },
    openGraph: {
        title: "NASA Astronomy Picture of the Day | Stellaris",
        description:
            "Discover NASA APOD images and astronomy explanations in a cinematic interface.",
        url: `${BRAND.url}/apod`,
        siteName: BRAND.name,
        type: "website",
    },
};

const ApodPage = () => {
    return <ApodPageClient />;
};

export default ApodPage;