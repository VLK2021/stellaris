import type {Metadata} from "next";

import {BRAND} from "@/src/constants/brand";
import {ManifestPage} from "@/src/components/manifest";

export const metadata: Metadata = {
    title: "Stellaris Manifest — About the Project",
    description:
        "Stellaris is an independent educational web project powered by NASA open data.",
    openGraph: {
        title: "Stellaris Manifest — About the Project",
        description:
            "An independent space exploration platform built on NASA open data.",
        url: `${BRAND.url}/manifest`,
        siteName: BRAND.name,
        type: "website",
    },
};

export default function Page() {
    return <ManifestPage />;
}