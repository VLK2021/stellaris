import type {Metadata} from "next";

import {ExoplanetSystemDetailsPage} from "@/src/components/exoplanets/systems/details/ExoplanetSystemDetailsPage";
import {BRAND} from "@/src/constants/brand";

type Props = {
    params: Promise<{
        system: string;
    }>;
};

const formatSystemName = (value: string) => {
    return decodeURIComponent(value).replaceAll("-", " ");
};

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const {system} = await params;
    const name = formatSystemName(system);

    return {
        title: `${name} Planetary System`,
        description:
            `Explore the ${name} planetary system, including exoplanet structure, host star context and system-level details.`,
        alternates: {
            canonical: `${BRAND.url}/exoplanets/systems/${encodeURIComponent(system)}`,
        },
        openGraph: {
            title: `${name} Planetary System | Stellaris`,
            description:
                `Discover system-level exoplanet data for ${name}.`,
            url: `${BRAND.url}/exoplanets/systems/${encodeURIComponent(system)}`,
            siteName: BRAND.name,
            type: "website",
        },
    };
};

export default async function Page({params}: Props) {
    const {system} = await params;

    return <ExoplanetSystemDetailsPage system={system} />;
}