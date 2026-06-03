import {ExoplanetDetailsPage} from "@/src/components/exoplanets/catalog/details/ExoplanetDetailsPage";

type Props = {
    params: Promise<{
        planet: string;
    }>;
};

export default async function Page({params}: Props) {
    const {planet} = await params;

    return <ExoplanetDetailsPage planet={planet} />;
}