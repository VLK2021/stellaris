import Link from "next/link";
import {ArrowRight, Orbit} from "lucide-react";

import type {MissionCatalogItem} from "@/src/constants/missions";

type Props = {
    missions: MissionCatalogItem[];
};

export const MissionTimeline = ({missions}: Props) => {
    return (
        <section className="relative rounded-[2.4rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)]">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--color-accent)]">
                Mission timeline
            </p>

            <div className="relative mt-8">
                <div className="absolute left-4 top-0 h-full w-px bg-[var(--color-border)] md:left-1/2" />

                <div className="grid gap-5">
                    {missions.map((mission, index) => (
                        <article
                            key={mission.slug}
                            className={`relative flex ${
                                index % 2 === 0
                                    ? "md:justify-start md:pr-[52%]"
                                    : "md:justify-end md:pl-[52%]"
                            }`}
                        >
                            <span className="absolute left-4 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--color-accent)] shadow-[var(--shadow-glow)] md:left-1/2" />

                            <Link
                                href={`/missions/${mission.slug}`}
                                className="group ml-10 w-full rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)] md:ml-0"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                                            {mission.category} / {mission.target}
                                        </p>

                                        <h3 className="mt-3 text-2xl font-black uppercase tracking-[-0.05em] text-[var(--color-text)]">
                                            {mission.name}
                                        </h3>
                                    </div>

                                    <Orbit className="h-6 w-6 shrink-0 text-[var(--color-accent)]" />
                                </div>

                                <p className="mt-4 text-sm leading-6 text-[var(--color-text-muted)]">
                                    Source mapping: Wikipedia, Wikidata and NASA Media.
                                </p>

                                <p className="mt-5 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-accent)]">
                                    Open mission
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                </p>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};