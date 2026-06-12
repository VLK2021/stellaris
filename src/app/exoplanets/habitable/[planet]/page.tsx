import type {Metadata} from "next";

import {ExoplanetHabitableDetailsPage} from "@/src/components/exoplanets/habitable/details/ExoplanetHabitableDetailsPage";
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
        title: `${name} Habitability Profile`,
        description:
            `Explore the habitability profile of ${name}, including planetary conditions and potential Earth-like characteristics.`,
        alternates: {
            canonical: `${BRAND.url}/exoplanets/habitable/${encodeURIComponent(planet)}`,
        },
        openGraph: {
            title: `${name} Habitability Profile | Stellaris`,
            description:
                `Explore potential habitability details for ${name}.`,
            url: `${BRAND.url}/exoplanets/habitable/${encodeURIComponent(planet)}`,
            siteName: BRAND.name,
            type: "website",
        },
    };
};

export default async function Page({params}: Props) {
    const {planet} = await params;

    return <ExoplanetHabitableDetailsPage planet={planet} />;
}