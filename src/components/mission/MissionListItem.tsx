import type {LucideIcon} from "lucide-react";

import type {MissionCatalogItem} from "@/src/constants/missions";

type Props = {
    mission: MissionCatalogItem;
    active: boolean;
    icon: LucideIcon;
    categoryLabel: string;
    targetLabel: string;
    targetShort: string;
    index: number;
    onSelect: (slug: string) => void;
};

export const MissionListItem = ({
                                    mission,
                                    active,
                                    icon: Icon,
                                    categoryLabel,
                                    targetLabel,
                                    targetShort,
                                    onSelect,
                                }: Props) => {
    return (
        <button
            type="button"
            onClick={() => onSelect(mission.slug)}
            className={`group grid w-full grid-cols-[56px_1fr] items-center gap-3 rounded-[1.25rem] border p-3 text-left transition ${
                active
                    ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] shadow-[var(--shadow-glow)]"
                    : "border-[var(--color-border)] bg-[var(--color-glass)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]"
            }`}
        >
            <div
                className={`grid h-12 w-12 place-items-center rounded-2xl border transition ${
                    active
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-card-solid)]"
                        : "border-[var(--color-border)] bg-[var(--color-glass-strong)] text-[var(--color-accent)] group-hover:border-[var(--color-accent)]"
                }`}
            >
                <Icon className="h-5 w-5" />
            </div>

            <div className="min-w-0">
                <div className="flex items-center justify-between gap-3">
                    <h3
                        className={`truncate text-sm font-black uppercase tracking-[-0.03em] ${
                            active
                                ? "bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-transparent"
                                : "text-[var(--color-text)]"
                        }`}
                    >
                        {mission.name}
                    </h3>

                    <span className="shrink-0 rounded-full border border-[var(--color-border)] bg-[var(--color-glass-strong)] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[var(--color-accent)]">
                        {targetShort}
                    </span>
                </div>

                <p className="mt-1 truncate text-[11px] text-[var(--color-text-muted)]">
                    {categoryLabel} / {targetLabel}
                </p>

                <p className="mt-1 truncate text-[10px] text-[var(--color-text-soft)]">
                    {mission.nasaMediaQuery}
                </p>
            </div>
        </button>
    );
};