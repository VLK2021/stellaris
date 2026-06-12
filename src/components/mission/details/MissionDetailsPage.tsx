"use client";

import {BackButton} from "@/src/common/BackButton";
import {useLanguage} from "@/src/context";
import type {MissionAggregated} from "@/src/types/missions";

import {MissionSpaceBackground} from "../MissionSpaceBackground";
import {MissionCrewPanel} from "./MissionCrewPanel";
import {MissionDetailsHero} from "./MissionDetailsHero";
import {MissionFactsPanel} from "./MissionFactsPanel";
import {MissionMediaSection} from "./MissionMediaSection";
import {MissionSourcePanel} from "./MissionSourcePanel";
import {MissionTimelinePanel} from "./MissionTimelinePanel";
import {MissionVehiclesPanel} from "./MissionVehiclesPanel";

type Props = {
    mission: MissionAggregated;
};

export const MissionDetailsPage = ({mission}: Props) => {
    const {locale} = useLanguage();
    const t = locale.missions.missionDetails;

    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--body-bg)] text-[var(--color-text)]">
            <MissionSpaceBackground />

            <div className="relative z-10 mx-auto grid max-w-[1500px] gap-5 px-4 py-6 sm:px-6 lg:px-8">
                <BackButton label={t.back} />

                <MissionDetailsHero mission={mission} />

                <MissionFactsPanel mission={mission} />

                <div className="grid gap-5 xl:grid-cols-2">
                    <MissionCrewPanel crew={mission.crew} />

                    <MissionVehiclesPanel
                        spacecraft={mission.spacecraft}
                        launchVehicles={mission.launchVehicles}
                        operators={mission.operators}
                    />
                </div>

                <MissionTimelinePanel timeline={mission.timeline} />

                <MissionMediaSection
                    title={t.images}
                    type="image"
                    items={mission.media.images}
                />

                <MissionMediaSection
                    title={t.videos}
                    type="video"
                    items={mission.media.videos}
                />

                <MissionMediaSection
                    title={t.audio}
                    type="audio"
                    items={mission.media.audio}
                />

                <MissionSourcePanel mission={mission} />
            </div>
        </main>
    );
};