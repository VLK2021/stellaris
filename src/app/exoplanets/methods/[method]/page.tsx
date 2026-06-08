import {ExoplanetMethodDetailsPage} from "@/src/components/exoplanets/methods/details/ExoplanetMethodDetailsPage";

type Props = {
    params: Promise<{
        method: string;
    }>;
};

export default async function Page({params}: Props) {
    const {method} = await params;

    return (
        <ExoplanetMethodDetailsPage
            method={method}
        />
    );
}