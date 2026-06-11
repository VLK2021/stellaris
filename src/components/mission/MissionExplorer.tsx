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

    const [search, setSearch] = useState("");
    const [target, setTarget] = useState("all");
    const [category, setCategory] = useState("all");

    const filteredMissions = useMemo(() => {
        const value = search.trim().toLowerCase();

        return missions.filter((mission) => {
            const matchSearch =
                !value ||
                mission.name.toLowerCase().includes(value) ||
                mission.slug.toLowerCase().includes(value) ||
                mission.target.toLowerCase().includes(value) ||
                mission.category.toLowerCase().includes(value) ||
                mission.nasaMediaQuery.toLowerCase().includes(value);

            const matchTarget =
                target === "all" || mission.target === target;

            const matchCategory =
                category === "all" || mission.category === category;

            return matchSearch && matchTarget && matchCategory;
        });
    }, [missions, search, target, category]);

    const activeMission = useMemo(() => {
        return (
            filteredMissions.find((mission) => mission.slug === activeSlug) ??
            filteredMissions[0] ??
            null
        );
    }, [activeSlug, filteredMissions]);

    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(135deg,rgba(5,12,28,.94),rgba(10,17,40,.9),rgba(18,13,43,.88))] shadow-[var(--shadow-card)]">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(56,189,248,.18),transparent_26%),radial-gradient(circle_at_85%_20%,rgba(139,92,246,.16),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(14,165,233,.10),transparent_34%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
            </div>

            <div className="relative z-10 border-b border-[var(--color-border)] px-5 py-5">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--color-accent)]">
                    Mission Control Archive
                </p>

                <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black uppercase leading-none tracking-[-0.07em] md:text-6xl">
                            NASA Missions
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)]">
                            Живий каталог місій: Wikipedia, Wikidata та NASA Media Archive.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Stat label="Total" value={stats.total} />
                        <Stat label="Crewed" value={stats.crewed} />
                        <Stat label="Robotic" value={stats.robotic} />
                    </div>
                </div>
            </div>

            <div className="relative z-10 grid min-h-[calc(100vh-15rem)] lg:grid-cols-[430px_1fr]">
                <MissionExplorerSidebar
                    missions={filteredMissions}
                    allMissionsCount={missions.length}
                    activeSlug={activeMission?.slug ?? activeSlug}
                    search={search}
                    target={target}
                    category={category}
                    onSearch={setSearch}
                    onTarget={setTarget}
                    onCategory={setCategory}
                    onSelect={setActiveSlug}
                />

                {activeMission ? (
                    <MissionExplorerPreview mission={activeMission} />
                ) : (
                    <div className="grid place-items-center p-10 text-center text-[var(--color-text-muted)]">
                        Нічого не знайдено.
                    </div>
                )}
            </div>
        </section>
    );
};

const Stat = ({label, value}: {label: string; value: number}) => (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-3 backdrop-blur-xl">
        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            {label}
        </p>
        <p className="mt-1 text-2xl font-black text-[var(--color-accent)]">
            {value}
        </p>
    </div>
);