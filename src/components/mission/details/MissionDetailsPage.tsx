"use client";

import {BackButton} from "@/src/common/BackButton";
import type {MissionAggregated} from "@/src/types/missions";

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
    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--body-bg)] text-[var(--color-text)]">
            <div className="pointer-events-none fixed inset-0 opacity-80">
                <div className="absolute inset-0" style={{background: "var(--hero-bg)"}} />
                <div className="absolute left-[-14rem] top-[12rem] h-[34rem] w-[34rem] rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
                <div className="absolute right-[-16rem] top-[6rem] h-[38rem] w-[38rem] rounded-full bg-[var(--color-brand-secondary)]/10 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto grid max-w-[1500px] gap-5 px-4 py-6 sm:px-6 lg:px-8">
                <BackButton label="Назад" />

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
                    title="Фото місії"
                    type="image"
                    items={mission.media.images}
                />

                <MissionMediaSection
                    title="Відео місії"
                    type="video"
                    items={mission.media.videos}
                />

                <MissionMediaSection
                    title="Аудіо місії"
                    type="audio"
                    items={mission.media.audio}
                />

                <MissionSourcePanel mission={mission} />
            </div>
        </main>
    );
};