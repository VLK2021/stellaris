import type {Metadata} from "next";

import {EarthEventDetailsPage} from "@/src/components/earth/details/EarthEventDetailsPage";
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
        title: `Earth Event ${decodedId}`,
        description:
            "Explore a detailed Earth observation event through Stellaris, including event data, location context and NASA-powered Earth monitoring information.",
        alternates: {
            canonical: `${BRAND.url}/earth/${encodeURIComponent(decodedId)}`,
        },
        openGraph: {
            title: `Earth Event ${decodedId} | Stellaris`,
            description:
                "Detailed Earth observation event powered by NASA open data.",
            url: `${BRAND.url}/earth/${encodeURIComponent(decodedId)}`,
            siteName: BRAND.name,
            type: "website",
        },
    };
};

const EarthSingleEventPage = async ({params}: Props) => {
    const {id} = await params;

    return <EarthEventDetailsPage eventId={decodeURIComponent(id)} />;
};

export default EarthSingleEventPage;