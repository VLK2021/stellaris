import Link from "next/link";
import {ArrowRight, Sparkles} from "lucide-react";

import type {MissionCatalogItem} from "@/src/constants/missions";

type Props = {
    mission: MissionCatalogItem;
};

export const MissionFeaturedPanel = ({mission}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[2.6rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)] md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(56,189,248,.12),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(236,72,153,.12),transparent_34%)]" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                        <Sparkles className="h-4 w-4" />
                        Featured mission
                    </p>

                    <h2 className="mt-5 text-4xl font-black uppercase tracking-[-0.06em] md:text-6xl">
                        {mission.name}
                    </h2>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)] md:text-base">
                        Live aggregated profile using correct source mapping:
                        Wikipedia title, Wikidata search key and NASA Media query.
                    </p>
                </div>

                <Link
                    href={`/missions/${mission.slug}`}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-[var(--shadow-glow)] transition hover:scale-[1.02]"
                >
                    Explore mission
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </section>
    );
};