import {notFound} from "next/navigation";

import {MissionDetailsPage} from "@/src/components/mission/details";
import {getAggregatedMissionBySlug} from "@/src/services/missions/missionsAggregator.service";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function Page({params}: Props) {
    const {slug} = await params;

    const mission = await getAggregatedMissionBySlug(slug);

    if (!mission) {
        notFound();
    }

    return <MissionDetailsPage mission={mission} />;
}