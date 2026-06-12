import type {Metadata} from "next";

import {AsteroidDetailsPageClient} from "@/src/components/asteroids/details/AsteroidDetailsPageClient";
import {BRAND} from "@/src/constants/brand";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const {id} = await params;
    const decodedId = decodeURIComponent(id);

    return {
        title: `Asteroid ${decodedId}`,
        description:
            "Explore detailed near-Earth asteroid data powered by NASA NeoWs, including orbital information, close approaches, size estimates and hazard status.",
        alternates: {
            canonical: `${BRAND.url}/asteroids/${encodeURIComponent(decodedId)}`,
        },
        openGraph: {
            title: `Asteroid ${decodedId} | Stellaris`,
            description:
                "Detailed NASA near-Earth asteroid profile with close approach and orbital data.",
            url: `${BRAND.url}/asteroids/${encodeURIComponent(decodedId)}`,
            siteName: BRAND.name,
            type: "website",
        },
    };
};

const AsteroidDetailsPage = async ({params}: Props) => {
    const {id} = await params;

    return <AsteroidDetailsPageClient id={id} />;
};

export default AsteroidDetailsPage;