import type {Metadata} from "next";

import {MarsPhotosPage} from "@/src/components/mars/photos";
import {BRAND} from "@/src/constants/brand";

export const metadata: Metadata = {
    title: "Mars Rover Photos",
    description:
        "Browse NASA Mars rover photos by rover, camera, sol and Earth date through the Stellaris Mars photo archive.",
    alternates: {
        canonical: `${BRAND.url}/mars/photos`,
    },
    openGraph: {
        title: "Mars Rover Photos | Stellaris",
        description:
            "Explore NASA Mars rover photography from Curiosity, Opportunity and Spirit.",
        url: `${BRAND.url}/mars/photos`,
        siteName: BRAND.name,
        type: "website",
    },
};

export default function Page() {
    return <MarsPhotosPage />;
}