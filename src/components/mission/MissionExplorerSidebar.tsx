"use client";

import {motion} from "framer-motion";
import {
    Bot,
    CircleDot,
    Orbit,
    Rocket,
    Search,
    Telescope,
    Users,
} from "lucide-react";

import {useLanguage} from "@/src/context";
import type {MissionCatalogItem} from "@/src/constants/missions";

import {MissionListItem} from "./MissionListItem";

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

const CATEGORY_ICONS = {
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

const getTargetLocaleKey = (value: string) => {
    if (value === "deep-space") return "deepSpace";
    if (value === "earth-orbit") return "earthOrbit";

    return value;
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
        <aside className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-glass)] backdrop-blur-xl xl:border-b-0 xl:border-r">
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    animate={{
                        opacity: [0.4, 0.75, 0.4],
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,var(--color-accent-soft),transparent_28%),radial-gradient(circle_at_90%_70%,var(--color-glass-strong),transparent_34%)] bg-[length:140%_140%]"
                />
            </div>

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
                        animate={{
                            rotate: [0, 8, -8, 0],
                            scale: [1, 1.06, 1],
                        }}
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
                            <option key={item} value={item}>
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
                                <option key={item} value={item}>
                                    {t.targets[key as keyof typeof t.targets] ?? item}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>

            <div className="relative z-10 max-h-[460px] overflow-y-auto p-3 xl:max-h-[calc(100vh-24rem)]">
                <div className="grid gap-2">
                    {missions.map((mission, index) => {
                        const active = mission.slug === activeSlug;
                        const targetKey = getTargetLocaleKey(mission.target);

                        const categoryLabel =
                            t.categories[mission.category as keyof typeof t.categories] ??
                            mission.category;

                        const targetLabel =
                            t.targets[targetKey as keyof typeof t.targets] ??
                            mission.target;

                        const Icon =
                            CATEGORY_ICONS[
                                mission.category as keyof typeof CATEGORY_ICONS
                                ] ?? Rocket;

                        return (
                            <MissionListItem
                                key={mission.slug}
                                mission={mission}
                                active={active}
                                icon={Icon}
                                categoryLabel={categoryLabel}
                                targetLabel={targetLabel}
                                targetShort={TARGET_SHORT[mission.target] ?? "NASA"}
                                index={index}
                                onSelect={onSelect}
                            />
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};