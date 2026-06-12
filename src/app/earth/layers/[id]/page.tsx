import type {Metadata} from "next";

import {EarthLayerDetailsPage} from "@/src/components/earth/layers/EarthLayerDetailsPage";
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
        title: `Earth Layer ${decodedId}`,
        description:
            "Explore a NASA Earth observation layer through Stellaris, including visual Earth data, layer information and satellite-based context.",
        alternates: {
            canonical: `${BRAND.url}/earth/layers/${encodeURIComponent(decodedId)}`,
        },
        openGraph: {
            title: `Earth Layer ${decodedId} | Stellaris`,
            description:
                "NASA-powered Earth observation layer details in Stellaris.",
            url: `${BRAND.url}/earth/layers/${encodeURIComponent(decodedId)}`,
            siteName: BRAND.name,
            type: "website",
        },
    };
};

export default async function Page({params}: Props) {
    const {id} = await params;

    return <EarthLayerDetailsPage layerId={decodeURIComponent(id)} />;
}