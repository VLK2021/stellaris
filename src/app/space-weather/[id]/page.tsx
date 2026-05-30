import {SpaceWeatherEventDetailsPageClient} from "@/src/components/space-weather/details/SpaceWeatherEventDetailsPageClient";
import type {SpaceWeatherEvent} from "@/src/types/space-weather/spaceWeather.types";

type Props = {
    params: Promise<{
        id: string;
    }>;
    searchParams: Promise<{
        type?: SpaceWeatherEvent["type"];
        startDate?: string;
        endDate?: string;
    }>;
};

const SpaceWeatherEventDetailsPage = async ({params, searchParams}: Props) => {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    return (
        <SpaceWeatherEventDetailsPageClient
            eventId={decodeURIComponent(resolvedParams.id)}
            type={resolvedSearchParams.type}
            startDate={resolvedSearchParams.startDate}
            endDate={resolvedSearchParams.endDate}
        />
    );
};

export default SpaceWeatherEventDetailsPage;