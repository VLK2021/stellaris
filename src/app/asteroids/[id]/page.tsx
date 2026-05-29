import {AsteroidDetailsPageClient} from "@/src/components/asteroids/details/AsteroidDetailsPageClient";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

const AsteroidDetailsPage = async ({params}: Props) => {
    const {id} = await params;

    return <AsteroidDetailsPageClient id={id} />;
};

export default AsteroidDetailsPage;