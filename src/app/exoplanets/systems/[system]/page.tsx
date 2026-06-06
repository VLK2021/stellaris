import {ExoplanetSystemDetailsPage} from "@/src/components/exoplanets/systems/details/ExoplanetSystemDetailsPage";

type Props = {
    params: Promise<{
        system: string;
    }>;
};

export default async function Page({params}: Props) {
    const {system} = await params;

    return <ExoplanetSystemDetailsPage system={system} />;
}