import {Rocket} from "lucide-react";

import type {MissionCatalogItem} from "@/src/constants/missions";

type Props = {
    missions: MissionCatalogItem[];
    activeSlug: string;
    onSelect: (slug: string) => void;
};

export const MissionExplorerSidebar = ({
                                           missions,
                                           activeSlug,
                                           onSelect,
                                       }: Props) => {
    return (
        <aside className="border-b border-[var(--color-border)] lg:border-b-0 lg:border-r">
            <div className="sticky top-0 z-10 border-b border-[var(--color-border)] bg-[var(--color-card)]/95 p-4 backdrop-blur-xl">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                    Mission list
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    {missions.length} місій у каталозі
                </p>
            </div>

            <div className="max-h-[calc(100vh-22rem)] overflow-y-auto p-3 lg:max-h-[calc(100vh-20rem)]">
                <div className="grid gap-2">
                    {missions.map((mission) => {
                        const active = mission.slug === activeSlug;

                        return (
                            <button
                                key={mission.slug}
                                type="button"
                                onClick={() => onSelect(mission.slug)}
                                className={`group grid w-full grid-cols-[64px_1fr_36px] items-center gap-3 rounded-[1.2rem] border p-3 text-left transition ${
                                    active
                                        ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 shadow-[var(--shadow-glow)]"
                                        : "border-[var(--color-border)] bg-[var(--color-glass)] hover:border-[var(--color-accent)]"
                                }`}
                            >
                                <div className="text-xl font-black text-[var(--color-accent)]">
                                    {mission.slug.includes("apollo")
                                        ? "1969"
                                        : mission.slug.includes("voyager")
                                            ? "1977"
                                            : mission.slug.includes("hubble")
                                                ? "1990"
                                                : mission.slug.includes("curiosity")
                                                    ? "2012"
                                                    : mission.slug.includes("perseverance")
                                                        ? "2021"
                                                        : "NASA"}
                                </div>

                                <div className="min-w-0">
                                    <h3 className="truncate text-base font-black uppercase tracking-[-0.03em]">
                                        {mission.name}
                                    </h3>

                                    <p className="mt-1 truncate text-xs text-[var(--color-text-muted)]">
                                        {mission.category} / {mission.target}
                                    </p>
                                </div>

                                <div className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-card)]">
                                    <Rocket className="h-4 w-4 text-[var(--color-accent)]" />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};