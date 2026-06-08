import type {MarsOverview} from "@/src/types/mars";

import {MarsBackground} from "./MarsBackground";
import {MarsHero} from "./MarsHero";
import {MarsLatestPhotos} from "./MarsLatestPhotos";
import {MarsMissionTimeline} from "./MarsMissionTimeline";
import {MarsRoversSection} from "./MarsRoversSection";
import {MarsStatsPanel} from "./MarsStatsPanel";

type Props = {
    data: MarsOverview;
};

export const MarsOverviewPage = ({data}: Props) => {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#05030a] text-white">
            <MarsBackground />

            <div className="relative z-10 mx-auto grid max-w-[1580px] gap-8 px-4 py-8 sm:px-6 lg:px-8">
                <MarsHero data={data} />
                <MarsStatsPanel data={data} />
                <MarsRoversSection rovers={data.rovers} />
                <MarsMissionTimeline rovers={data.rovers} />
                <MarsLatestPhotos photos={data.latestPhotos} />
            </div>
        </main>
    );
};