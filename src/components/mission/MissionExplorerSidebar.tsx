"use client";

import {motion} from "framer-motion";
import {
    Bot,
    CircleDot,
    Crosshair,
    Moon,
    Orbit,
    Rocket,
    Search,
    Telescope,
    Users,
} from "lucide-react";

import {useLanguage} from "@/src/context";
import type {MissionCatalogItem} from "@/src/constants/missions";

type Props = {
    missions: MissionCatalogItem[];
    allMissionsCount: number;
    activeSlug: string;
    search: string;
    target: string;
    category: string;
    onSearch: (value: string) => void;
    onTarget: (value: string) => void;
    onCategory: (value: string) => void;
    onSelect: (slug: string) => void;
};

const TARGETS = [
    "all",
    "moon",
    "mars",
    "venus",
    "jupiter",
    "saturn",
    "asteroid",
    "deep-space",
    "earth-orbit",
];

const CATEGORIES = [
    "all",
    "crewed",
    "robotic",
    "telescope",
    "station",
];

const CATEGORY_ICONS: Record<string, typeof Rocket> = {
    all: CircleDot,
    crewed: Users,
    robotic: Bot,
    telescope: Telescope,
    station: Orbit,
};

const TARGET_SHORT: Record<string, string> = {
    all: "ALL",
    moon: "LUN",
    mars: "MRS",
    venus: "VNS",
    jupiter: "JUP",
    saturn: "SAT",
    asteroid: "AST",
    "deep-space": "DSP",
    "earth-orbit": "ORB",
};

const getTargetLocaleKey = (target: string) => {
    if (target === "deep-space") return "deepSpace";
    if (target === "earth-orbit") return "earthOrbit";

    return target;
};

export const MissionExplorerSidebar = ({
                                           missions,
                                           allMissionsCount,
                                           activeSlug,
                                           search,
                                           target,
                                           category,
                                           onSearch,
                                           onTarget,
                                           onCategory,
                                           onSelect,
                                       }: Props) => {
    const {locale} = useLanguage();
    const t = locale.missions;

    return (
        <aside className="border-b border-[var(--color-border)] bg-[var(--color-glass)] backdrop-blur-xl xl:border-b-0 xl:border-r">
            <div className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[var(--color-glass-strong)] p-4 backdrop-blur-2xl">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                            {t.missionList}
                        </p>

                        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                            {missions.length} / {allMissionsCount} {t.missionsVisible}
                        </p>
                    </div>

                    <motion.div
                        animate={{rotate: [0, 8, -8, 0]}}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-accent-soft)]"
                    >
                        <Rocket className="h-5 w-5 text-[var(--color-accent)]" />
                    </motion.div>
                </div>

                <div className="relative mt-4">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />

                    <input
                        value={search}
                        onChange={(event) => onSearch(event.target.value)}
                        placeholder={t.searchPlaceholder}
                        className="input pl-11"
                    />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                    <select
                        value={category}
                        onChange={(event) => onCategory(event.target.value)}
                        className="input cursor-pointer text-xs font-black uppercase tracking-[0.12em]"
                    >
                        {CATEGORIES.map((item) => (
                            <option
                                key={item}
                                value={item}
                            >
                                {t.categories[item as keyof typeof t.categories] ?? item}
                            </option>
                        ))}
                    </select>

                    <select
                        value={target}
                        onChange={(event) => onTarget(event.target.value)}
                        className="input cursor-pointer text-xs font-black uppercase tracking-[0.12em]"
                    >
                        {TARGETS.map((item) => {
                            const key = getTargetLocaleKey(item);

                            return (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {t.targets[key as keyof typeof t.targets] ?? item}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>

            <div className="max-h-[460px] overflow-y-auto p-3 xl:max-h-[calc(100vh-24rem)]">
                <div className="grid gap-2">
                    {missions.map((mission, index) => {
                        const active = mission.slug === activeSlug;
                        const Icon =
                            CATEGORY_ICONS[mission.category] ?? Rocket;

                        const targetKey = getTargetLocaleKey(mission.target);
                        const categoryLabel =
                            t.categories[mission.category as keyof typeof t.categories] ??
                            mission.category;
                        const targetLabel =
                            t.targets[targetKey as keyof typeof t.targets] ??
                            mission.target;

                        return (
                            <motion.button
                                key={mission.slug}
                                type="button"
                                initial={{opacity: 0, x: -10}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.25, delay: Math.min(index * 0.015, 0.25)}}
                                onClick={() => onSelect(mission.slug)}
                                className={`group grid w-full grid-cols-[56px_1fr] items-center gap-3 rounded-[1.25rem] border p-3 text-left transition duration-200 ${
                                    active
                                        ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] shadow-[var(--shadow-glow)]"
                                        : "border-[var(--color-border)] bg-[var(--color-glass)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]"
                                }`}
                            >
                                <div className={`grid h-12 w-12 place-items-center rounded-2xl border transition ${
                                    active
                                        ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                                        : "border-[var(--color-border)] bg-[var(--color-glass-strong)] text-[var(--color-accent)] group-hover:border-[var(--color-accent)]"
                                }`}>
                                    <Icon className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">
                                    <div className="flex items-center justify-between gap-3">
                                        <h3 className="truncate text-sm font-black uppercase tracking-[-0.03em] text-[var(--color-text)]">
                                            {mission.name}
                                        </h3>

                                        <span className="shrink-0 rounded-full border border-[var(--color-border)] bg-[var(--color-glass-strong)] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[var(--color-accent)]">
                                            {TARGET_SHORT[mission.target] ?? "NASA"}
                                        </span>
                                    </div>

                                    <p className="mt-1 truncate text-[11px] text-[var(--color-text-muted)]">
                                        {categoryLabel} / {targetLabel}
                                    </p>

                                    <p className="mt-1 truncate text-[10px] text-[var(--color-text-soft)]">
                                        {mission.nasaMediaQuery}
                                    </p>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};