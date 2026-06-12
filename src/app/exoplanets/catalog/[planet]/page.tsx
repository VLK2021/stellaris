import type {Metadata} from "next";

import {ExoplanetDetailsPage} from "@/src/components/exoplanets/catalog/details/ExoplanetDetailsPage";
import {BRAND} from "@/src/constants/brand";

type Props = {
    params: Promise<{
        planet: string;
    }>;
};

const formatPlanetName = (value: string) => {
    return decodeURIComponent(value).replaceAll("-", " ");
};

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const {planet} = await params;
    const name = formatPlanetName(planet);

    return {
        title: `${name} Exoplanet Profile`,
        description:
            `Explore ${name}, its planetary characteristics, discovery context and exoplanet research data through Stellaris.`,
        alternates: {
            canonical: `${BRAND.url}/exoplanets/catalog/${encodeURIComponent(planet)}`,
        },
        openGraph: {
            title: `${name} Exoplanet Profile | Stellaris`,
            description:
                `Discover detailed exoplanet information for ${name}.`,
            url: `${BRAND.url}/exoplanets/catalog/${encodeURIComponent(planet)}`,
            siteName: BRAND.name,
            type: "website",
        },
    };
};

export default async function Page({params}: Props) {
    const {planet} = await params;

    return <ExoplanetDetailsPage planet={planet} />;
}