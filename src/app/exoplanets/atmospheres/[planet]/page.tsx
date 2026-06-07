import {ExoplanetAtmosphereDetailsPage} from "@/src/components/exoplanets/atmospheres/details";

type Props = {
    params: Promise<{
        planet: string;
    }>;
};

export default async function Page({params}: Props) {
    const {planet} = await params;

    return <ExoplanetAtmosphereDetailsPage planet={planet} />;
}