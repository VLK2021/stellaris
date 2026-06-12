import type {Metadata} from "next";
import {notFound} from "next/navigation";

import {MediaDetailsPage} from "@/src/components/media/details";
import {getMediaAssets, getMediaByNasaId} from "@/src/services/media";
import {BRAND} from "@/src/constants/brand";

type Props = {
    params: Promise<{
        nasaId: string;
    }>;
};

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const {nasaId} = await params;
    const decodedId = decodeURIComponent(nasaId);

    const item = await getMediaByNasaId(decodedId);
    const data = item?.data[0];

    if (!item || !data) {
        return {
            title: "NASA Media Not Found",
        };
    }

    const description =
        data.description?.slice(0, 155) ||
        "Explore NASA media details, imagery, video, audio and official archive metadata through Stellaris.";

    return {
        title: data.title,
        description,
        alternates: {
            canonical: `${BRAND.url}/media/${encodeURIComponent(decodedId)}`,
        },
        openGraph: {
            title: `${data.title} | Stellaris`,
            description,
            url: `${BRAND.url}/media/${encodeURIComponent(decodedId)}`,
            siteName: BRAND.name,
            type: "website",
            images: item.links?.[0]?.href
                ? [
                    {
                        url: item.links[0].href,
                        alt: data.title,
                    },
                ]
                : undefined,
        },
    };
};

export default async function Page({params}: Props) {
    const {nasaId} = await params;

    const item = await getMediaByNasaId(nasaId);

    if (!item) {
        notFound();
    }

    const data = item.data[0];

    if (!data) {
        notFound();
    }

    const media = await getMediaAssets(data.nasa_id);
    const itemPreview = item.links?.[0]?.href ?? null;

    return (
        <MediaDetailsPage
            item={item}
            assets={media.assets}
            preview={media.preview ?? itemPreview}
            video={media.video}
            audio={media.audio}
        />
    );
}