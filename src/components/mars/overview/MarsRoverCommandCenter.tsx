import type {MarsLocale, MarsRoverSummary} from "@/src/types/mars";

import {MarsRoverCard} from "./MarsRoverCard";

type Props = {
    rovers: MarsRoverSummary[];
    t: MarsLocale;
};

export const MarsRoverCommandCenter = ({rovers, t}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[2.4rem] border border-[var(--mars-border)] bg-[var(--mars-surface)] p-6 shadow-[var(--mars-glow)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(249,115,22,.12),transparent_30%)]" />

            <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--mars-accent)]">
                    {t.roverCommandTitle}
                </p>

                <p className="mt-3 text-sm leading-7 text-[var(--mars-muted)]">
                    {t.roverCommandDescription}
                </p>

                <div className="mt-8 grid gap-5 xl:grid-cols-2">
                    {rovers.map((rover) => (
                        <MarsRoverCard
                            key={rover.name}
                            rover={rover}
                            t={t}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};