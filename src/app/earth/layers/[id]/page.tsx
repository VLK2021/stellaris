import {EarthLayerDetailsPage} from "@/src/components/earth/layers/EarthLayerDetailsPage";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function Page({params}: Props) {
    const {id} = await params;

    return <EarthLayerDetailsPage layerId={decodeURIComponent(id)} />;
}