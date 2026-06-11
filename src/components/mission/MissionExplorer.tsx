"use client";

import {useMemo, useState} from "react";

import type {MissionCatalogItem} from "@/src/constants/missions";

import {MissionExplorerPreview} from "./MissionExplorerPreview";
import {MissionExplorerSidebar} from "./MissionExplorerSidebar";

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

export const MissionExplorer = ({missions, stats}: Props) => {
    const [activeSlug, setActiveSlug] = useState(
        missions.find((mission) => mission.slug === "apollo-11")?.slug ??
        missions[0]?.slug ??
        "",
    );

    const activeMission = useMemo(() => {
        return (
            missions.find((mission) => mission.slug === activeSlug) ??
            missions[0] ??
            null
        );
    }, [activeSlug, missions]);

    return (
        <section className="overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
            <div className="border-b border-[var(--color-border)] px-5 py-4">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--color-accent)]">
                    Mission Control Archive
                </p>

                <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black uppercase leading-none tracking-[-0.07em] md:text-6xl">
                            NASA Missions
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)]">
                            Каталог місій з переходом у детальний агрегований профіль.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Stat label="Total" value={stats.total} />
                        <Stat label="Crewed" value={stats.crewed} />
                        <Stat label="Robotic" value={stats.robotic} />
                    </div>
                </div>
            </div>

            <div className="grid min-h-[calc(100vh-15rem)] lg:grid-cols-[430px_1fr]">
                <MissionExplorerSidebar
                    missions={missions}
                    activeSlug={activeSlug}
                    onSelect={setActiveSlug}
                />

                {activeMission && (
                    <MissionExplorerPreview mission={activeMission} />
                )}
            </div>
        </section>
    );
};

const Stat = ({label, value}: {label: string; value: number}) => (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-3">
        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            {label}
        </p>
        <p className="mt-1 text-2xl font-black text-[var(--color-accent)]">
            {value}
        </p>
    </div>
);