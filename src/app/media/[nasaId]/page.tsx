import {notFound} from "next/navigation";

import {MediaDetailsPage} from "@/src/components/media/details";
import {getMediaAssets, getMediaByNasaId} from "@/src/services/media";

type Props = {
    params: Promise<{
        nasaId: string;
    }>;
};

export default async function Page({params}: Props) {
    const {nasaId} = await params;

    const item = await getMediaByNasaId(nasaId);

    if (!item) {
        notFound();
    }

    const media = await getMediaAssets(nasaId);

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