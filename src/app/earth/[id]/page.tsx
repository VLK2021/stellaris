import {EarthEventDetailsPage} from "@/src/components/earth/details/EarthEventDetailsPage";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

const EarthSingleEventPage = async ({params}: Props) => {
    const {id} = await params;

    return <EarthEventDetailsPage eventId={decodeURIComponent(id)} />;
};

export default EarthSingleEventPage;