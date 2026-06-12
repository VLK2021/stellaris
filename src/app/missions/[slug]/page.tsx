import type {Metadata} from "next";
import {notFound} from "next/navigation";

import {MissionDetailsPage} from "@/src/components/mission/details";
import {getAggregatedMissionBySlug} from "@/src/services/missions/missionsAggregator.service";
import {BRAND} from "@/src/constants/brand";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const {slug} = await params;
    const mission = await getAggregatedMissionBySlug(slug);

    if (!mission) {
        return {
            title: "Mission Not Found",
        };
    }

    const description =
        mission.extract?.slice(0, 155) ||
        mission.description ||
        "Explore NASA mission details, timeline, crew, spacecraft, media and source data through Stellaris.";

    return {
        title: mission.title,
        description,
        alternates: {
            canonical: `${BRAND.url}/missions/${encodeURIComponent(slug)}`,
        },
        openGraph: {
            title: `${mission.title} | Stellaris`,
            description,
            url: `${BRAND.url}/missions/${encodeURIComponent(slug)}`,
            siteName: BRAND.name,
            type: "website",
            images: mission.thumbnail
                ? [
                    {
                        url: mission.thumbnail,
                        alt: mission.title,
                    },
                ]
                : undefined,
        },
    };
};

export default async function Page({params}: Props) {
    const {slug} = await params;

    const mission = await getAggregatedMissionBySlug(slug);

    if (!mission) {
        notFound();
    }

    return <MissionDetailsPage mission={mission} />;
}