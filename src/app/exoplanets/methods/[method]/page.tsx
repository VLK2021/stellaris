import type {Metadata} from "next";

import {ExoplanetMethodDetailsPage} from "@/src/components/exoplanets/methods/details/ExoplanetMethodDetailsPage";
import {BRAND} from "@/src/constants/brand";

type Props = {
    params: Promise<{
        method: string;
    }>;
};

const formatMethodName = (value: string) => {
    return decodeURIComponent(value).replaceAll("-", " ");
};

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const {method} = await params;
    const name = formatMethodName(method);

    return {
        title: `${name} Detection Method`,
        description:
            `Explore the ${name} exoplanet detection method, how it works and why it matters in planetary discovery.`,
        alternates: {
            canonical: `${BRAND.url}/exoplanets/methods/${encodeURIComponent(method)}`,
        },
        openGraph: {
            title: `${name} Detection Method | Stellaris`,
            description:
                `Learn how the ${name} method helps discover exoplanets.`,
            url: `${BRAND.url}/exoplanets/methods/${encodeURIComponent(method)}`,
            siteName: BRAND.name,
            type: "website",
        },
    };
};

export default async function Page({params}: Props) {
    const {method} = await params;

    return (
        <ExoplanetMethodDetailsPage
            method={method}
        />
    );
}