import type {Metadata} from "next";

import {MediaPage} from "@/src/components/media";
import {BRAND} from "@/src/constants/brand";

export const metadata: Metadata = {
    title: "NASA Image and Video Library",
    description:
        "Search and explore NASA media: images, videos, audio, mission archives, space photography and official NASA visual content.",
    alternates: {
        canonical: `${BRAND.url}/media`,
    },
    openGraph: {
        title: "NASA Image and Video Library | Stellaris",
        description:
            "Explore NASA images, videos and cosmic media through Stellaris.",
        url: `${BRAND.url}/media`,
        siteName: BRAND.name,
        type: "website",
    },
};

export default function Page() {
    return <MediaPage />;
}