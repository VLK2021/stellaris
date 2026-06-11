import {Rocket, Search} from "lucide-react";

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
    "jupiter",
    "saturn",
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
    return (
        <aside className="border-b border-[var(--color-border)] bg-black/10 lg:border-b-0 lg:border-r">
            <div className="sticky top-0 z-10 border-b border-[var(--color-border)] bg-[rgba(5,12,28,.88)] p-4 backdrop-blur-xl">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                    Mission list
                </p>

                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    {missions.length} / {allMissionsCount} місій
                </p>

                <div className="relative mt-4">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
                    <input
                        value={search}
                        onChange={(event) => onSearch(event.target.value)}
                        placeholder="Пошук: Apollo, Mars, 1977..."
                        className="h-11 w-full rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] pl-11 pr-4 text-sm outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)]"
                    />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                    <select
                        value={category}
                        onChange={(event) => onCategory(event.target.value)}
                        className="h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-3 text-xs font-bold uppercase outline-none focus:border-[var(--color-accent)]"
                    >
                        {CATEGORIES.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <select
                        value={target}
                        onChange={(event) => onTarget(event.target.value)}
                        className="h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-3 text-xs font-bold uppercase outline-none focus:border-[var(--color-accent)]"
                    >
                        {TARGETS.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="max-h-[calc(100vh-25rem)] overflow-y-auto p-3 lg:max-h-[calc(100vh-22rem)]">
                <div className="grid gap-2">
                    {missions.map((mission) => {
                        const active = mission.slug === activeSlug;

                        return (
                            <button
                                key={mission.slug}
                                type="button"
                                onClick={() => onSelect(mission.slug)}
                                className={`group grid w-full grid-cols-[58px_1fr_34px] items-center gap-3 rounded-[1.1rem] border p-3 text-left transition ${
                                    active
                                        ? "border-[var(--color-accent)] bg-[var(--color-accent)]/12 shadow-[var(--shadow-glow)]"
                                        : "border-[var(--color-border)] bg-[var(--color-glass)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/8"
                                }`}
                            >
                                <div className="text-lg font-black text-[var(--color-accent)]">
                                    {getMissionYear(mission)}
                                </div>

                                <div className="min-w-0">
                                    <h3 className="truncate text-sm font-black uppercase tracking-[-0.03em]">
                                        {mission.name}
                                    </h3>

                                    <p className="mt-1 truncate text-[11px] text-[var(--color-text-muted)]">
                                        {mission.category} / {mission.target}
                                    </p>
                                </div>

                                <div className="grid h-8 w-8 place-items-center rounded-full border border-[var(--color-border)] bg-black/20">
                                    <Rocket className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};

const getMissionYear = (mission: MissionCatalogItem) => {
    const value =
        mission.slug.includes("apollo-11") ? "1969" :
            mission.slug.includes("apollo-13") ? "1970" :
                mission.slug.includes("voyager") ? "1977" :
                    mission.slug.includes("hubble") ? "1990" :
                        mission.slug.includes("curiosity") ? "2012" :
                            mission.slug.includes("perseverance") ? "2021" :
                                mission.slug.includes("artemis") ? "2024+" :
                                    "NASA";

    return value;
};