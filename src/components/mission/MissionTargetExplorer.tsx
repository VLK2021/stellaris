import {CircleDot} from "lucide-react";

import type {MissionCatalogItem} from "@/src/constants/missions";

type Props = {
    missions: MissionCatalogItem[];
    activeTarget: MissionCatalogItem["target"] | "all";
    onTargetChange: (target: MissionCatalogItem["target"] | "all") => void;
};

const TARGETS: (MissionCatalogItem["target"] | "all")[] = [
    "all",
    "moon",
    "mars",
    "saturn",
    "deep-space",
];

export const MissionTargetExplorer = ({
                                          missions,
                                          activeTarget,
                                          onTargetChange,
                                      }: Props) => {
    return (
        <section className="rounded-[2.4rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)]">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--color-accent)]">
                Target explorer
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
                {TARGETS.map((target) => {
                    const count =
                        target === "all"
                            ? missions.length
                            : missions.filter((mission) => mission.target === target).length;

                    return (
                        <button
                            key={target}
                            type="button"
                            onClick={() => onTargetChange(target)}
                            className={`inline-flex items-center gap-3 rounded-full border px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] transition ${
                                activeTarget === target
                                    ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white shadow-[var(--shadow-glow)]"
                                    : "border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-accent)] hover:border-[var(--color-accent)]"
                            }`}
                        >
                            <CircleDot className="h-4 w-4" />
                            {target}
                            <span className="opacity-70">{count}</span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
};