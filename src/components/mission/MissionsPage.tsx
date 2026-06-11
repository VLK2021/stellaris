"use client";

import {useMemo, useState} from "react";
import {motion} from "framer-motion";

import type {MissionCatalogItem} from "@/src/constants/missions";

import {MissionControlHero} from "./MissionControlHero";
import {MissionFeaturedPanel} from "./MissionFeaturedPanel";
import {MissionTargetExplorer} from "./MissionTargetExplorer";
import {MissionTimeline} from "./MissionTimeline";

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

export const MissionsPage = ({
                                 missions,
                                 stats,
                             }: Props) => {
    const [target, setTarget] = useState<MissionCatalogItem["target"] | "all">("all");

    const filteredMissions = useMemo(() => {
        if (target === "all") {
            return missions;
        }

        return missions.filter((mission) => mission.target === target);
    }, [missions, target]);

    const featuredMission =
        missions.find((mission) => mission.slug === "apollo-11") ??
        missions[0];

    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--body-bg)] text-[var(--color-text)]">
            <div className="pointer-events-none fixed inset-0 opacity-80">
                <div
                    className="absolute inset-0"
                    style={{background: "var(--hero-bg)"}}
                />

                <div className="absolute left-[-14rem] top-[12rem] h-[36rem] w-[36rem] rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
                <div className="absolute right-[-16rem] top-[8rem] h-[42rem] w-[42rem] rounded-full bg-[var(--color-brand-secondary)]/10 blur-3xl" />
            </div>

            <motion.div
                initial={{opacity: 0, y: 24}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                className="relative z-10 mx-auto grid max-w-[1580px] gap-6 px-4 py-8 sm:px-6 lg:px-8"
            >
                <MissionControlHero stats={stats} />

                {featuredMission && (
                    <MissionFeaturedPanel mission={featuredMission} />
                )}

                <MissionTargetExplorer
                    missions={missions}
                    activeTarget={target}
                    onTargetChange={setTarget}
                />

                <MissionTimeline missions={filteredMissions} />
            </motion.div>
        </main>
    );
};