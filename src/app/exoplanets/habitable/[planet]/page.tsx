import {ExoplanetHabitableDetailsPage} from "@/src/components/exoplanets/habitable/details/ExoplanetHabitableDetailsPage";

type Props = {
    params: Promise<{
        planet: string;
    }>;
};

export default async function Page({params}: Props) {
    const {planet} = await params;

    return <ExoplanetHabitableDetailsPage planet={planet} />;
}