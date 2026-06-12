import type {Metadata} from "next";

import {ExoplanetAtmosphereDetailsPage} from "@/src/components/exoplanets/atmospheres/details";
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
        title: `${name} Atmosphere`,
        description:
            `Explore atmospheric data and research context for ${name}, including exoplanet atmosphere characteristics and observation insights.`,
        alternates: {
            canonical: `${BRAND.url}/exoplanets/atmospheres/${encodeURIComponent(planet)}`,
        },
        openGraph: {
            title: `${name} Atmosphere | Stellaris`,
            description:
                `Explore atmosphere details for ${name} through Stellaris exoplanet research.`,
            url: `${BRAND.url}/exoplanets/atmospheres/${encodeURIComponent(planet)}`,
            siteName: BRAND.name,
            type: "website",
        },
    };
};

export default async function Page({params}: Props) {
    const {planet} = await params;

    return <ExoplanetAtmosphereDetailsPage planet={planet} />;
}