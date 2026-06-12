"use client";

import {useEffect, useMemo, useState} from "react";
import {motion} from "framer-motion";
import {Archive, Filter, Layers3, SearchX} from "lucide-react";

import {useLanguage} from "@/src/context";
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
    const {locale} = useLanguage();
    const t = locale.missions;

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
                mission.wikipediaTitle.toLowerCase().includes(value) ||
                mission.wikidataSearch.toLowerCase().includes(value) ||
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

    useEffect(() => {
        if (!activeMission) return;

        if (activeMission.slug !== activeSlug) {
            setActiveSlug(activeMission.slug);
        }
    }, [activeMission, activeSlug]);

    const hasFilters =
        search.trim().length > 0 ||
        target !== "all" ||
        category !== "all";

    return (
        <section className="relative overflow-hidden rounded-[2.6rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    animate={{opacity: [0.55, 0.85, 0.55]}}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(56,189,248,.14),transparent_26%),radial-gradient(circle_at_88%_20%,rgba(139,92,246,.13),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(236,72,153,.08),transparent_34%)]"
                />

                <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.055)_1px,transparent_1px)] bg-[size:46px_46px] opacity-60" />
            </div>

            <div className="relative z-10 border-b border-[var(--color-border)] px-5 py-5 md:px-6">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                    <div>
                        <motion.p
                            initial={{opacity: 0, y: 12}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]"
                        >
                            <Archive className="h-4 w-4" />
                            {t.archiveBadge}
                        </motion.p>

                        <motion.h2
                            initial={{opacity: 0, y: 14}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: 0.05}}
                            className="mt-4 text-3xl font-black uppercase leading-none tracking-[-0.07em] md:text-5xl"
                        >
                            {t.archiveTitle}
                        </motion.h2>

                        <motion.p
                            initial={{opacity: 0, y: 14}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: 0.1}}
                            className="mt-3 max-w-3xl text-sm leading-6 text-[var(--color-text-muted)]"
                        >
                            {t.archiveText}
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        <MiniStat label={t.visible} value={filteredMissions.length} />
                        <MiniStat label={t.total} value={missions.length} />
                        <MiniStat label={t.crewed} value={stats.crewed} />
                        <MiniStat label={t.robotic} value={stats.robotic} />
                    </div>
                </div>
            </div>

            <div className="relative z-10 grid min-h-[760px] xl:grid-cols-[440px_1fr]">
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
                    <motion.div
                        initial={{opacity: 0, y: 14}}
                        animate={{opacity: 1, y: 0}}
                        className="grid place-items-center p-8 text-center"
                    >
                        <div className="max-w-md rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-8 backdrop-blur-xl">
                            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-accent-soft)]">
                                <SearchX className="h-7 w-7 text-[var(--color-accent)]" />
                            </div>

                            <h3 className="mt-5 text-2xl font-black uppercase tracking-[-0.05em]">
                                {t.noResults}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                                {t.noResultsText}
                            </p>

                            {hasFilters && (
                                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass-strong)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-accent)]">
                                    <Filter className="h-4 w-4" />
                                    {t.filtersActive}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

const MiniStat = ({
                      label,
                      value,
                  }: {
    label: string;
    value: number;
}) => {
    return (
        <motion.div
            whileHover={{y: -4}}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-3 backdrop-blur-xl transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]"
        >
            <div className="flex items-center gap-2">
                <Layers3 className="h-4 w-4 text-[var(--color-accent)]" />

                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                    {label}
                </p>
            </div>

            <p className="mt-1 text-2xl font-black tracking-[-0.06em] text-[var(--color-text)]">
                {value}
            </p>
        </motion.div>
    );
};