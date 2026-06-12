import type {Metadata} from "next";

import {SpaceWeatherEventDetailsPageClient} from "@/src/components/space-weather/details/SpaceWeatherEventDetailsPageClient";
import {BRAND} from "@/src/constants/brand";

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

export const generateMetadata = async ({
                                           params,
                                           searchParams,
                                       }: Props): Promise<Metadata> => {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    const eventId = decodeURIComponent(resolvedParams.id);
    const eventType = resolvedSearchParams.type ?? "Space Weather";

    return {
        title: `${eventType} Event ${eventId}`,
        description:
            "Explore NASA DONKI space weather event details, linked events, source data, timeline and raw event context through Stellaris.",
        alternates: {
            canonical: `${BRAND.url}/space-weather/${encodeURIComponent(eventId)}`,
        },
        openGraph: {
            title: `${eventType} Event ${eventId} | Stellaris`,
            description:
                "Detailed NASA space weather event profile powered by DONKI open data.",
            url: `${BRAND.url}/space-weather/${encodeURIComponent(eventId)}`,
            siteName: BRAND.name,
            type: "website",
        },
    };
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