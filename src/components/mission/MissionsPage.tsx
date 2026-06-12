"use client";

import type {MissionCatalogItem} from "@/src/constants/missions";

import {MissionControlHero} from "./MissionControlHero";
import {MissionExplorer} from "./MissionExplorer";
import {MissionSpaceBackground} from "./MissionSpaceBackground";

type Props = {
    missions: MissionCatalogItem[];
    stats: {
        total: number;
        crewed: number;
        robotic: number;
        telescope: number;
        station: number;
    };
};

export const MissionsPage = ({missions, stats}: Props) => {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--body-bg)] text-[var(--color-text)]">
            <MissionSpaceBackground />

            <div className="relative z-10 mx-auto flex max-w-[1540px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                <MissionControlHero stats={stats} />

                <MissionExplorer
                    missions={missions}
                    stats={stats}
                />
            </div>
        </main>
    );
};