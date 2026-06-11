import Link from "next/link";
import {ArrowRight, Database, Globe2, Rocket} from "lucide-react";

import type {MissionCatalogItem} from "@/src/constants/missions";

type Props = {
    mission: MissionCatalogItem;
};

export const MissionExplorerPreview = ({mission}: Props) => {
    return (
        <section className="relative overflow-hidden p-5 md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(56,189,248,.14),transparent_28%),radial-gradient(circle_at_15%_90%,rgba(139,92,246,.12),transparent_34%)]" />

            <div className="relative z-10 grid h-full content-between gap-8">
                <div>
                    <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                        <Rocket className="h-4 w-4" />
                        Selected mission
                    </p>

                    <h2 className="mt-6 max-w-3xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.08em] md:text-7xl">
                        {mission.name}
                    </h2>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-text-muted)]">
                        Ця місія відкривається через агрегатор: Wikipedia summary,
                        Wikidata entities та NASA Media Archive. На детальній сторінці
                        показуються фото, відео, аудіо, екіпаж, техніка, оператори і джерела.
                    </p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                        <Info icon={Database} label="Category" value={mission.category} />
                        <Info icon={Globe2} label="Target" value={mission.target} />
                        <Info icon={Rocket} label="NASA query" value={mission.nasaMediaQuery} />
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Link
                        href={`/missions/${mission.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-[var(--shadow-glow)] transition hover:scale-[1.02]"
                    >
                        Детальніше
                        <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                        href={`/api/missions/debug?slug=${mission.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-accent)] transition hover:border-[var(--color-accent)]"
                    >
                        Debug data
                    </Link>
                </div>
            </div>
        </section>
    );
};

const Info = ({
                  icon: Icon,
                  label,
                  value,
              }: {
    icon: typeof Rocket;
    label: string;
    value: string;
}) => (
    <div className="rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4">
        <Icon className="h-5 w-5 text-[var(--color-accent)]" />

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            {label}
        </p>

        <p className="mt-1 line-clamp-2 text-sm font-black">
            {value}
        </p>
    </div>
);