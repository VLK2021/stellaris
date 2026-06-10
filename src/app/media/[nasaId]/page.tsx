import {notFound} from "next/navigation";

import {
    getMediaAssets,
    searchMedia,
} from "@/src/services/media";

import {MediaDetailsPage} from "@/src/components/media/details";

type Props = {
    params: Promise<{
        nasaId: string;
    }>;
};

export default async function Page({
                                       params,
                                   }: Props) {
    const {nasaId} = await params;

    const response = await searchMedia({
        query: nasaId,
        page: 1,
    });

    const item =
        response.collection.items.find(
            (media) =>
                media.data?.[0]?.nasa_id === nasaId,
        );

    if (!item) {
        notFound();
    }

    const media =
        await getMediaAssets(nasaId);

    return (
        <MediaDetailsPage
            item={item}
            assets={media.assets}
            preview={media.preview}
            video={media.video}
            audio={media.audio}
        />
    );
}