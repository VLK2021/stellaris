import {Activity, Archive, Rocket} from "lucide-react";

import type {MarsLocale, MarsRoverSummary} from "@/src/types/mars";

type Props = {
    rovers: MarsRoverSummary[];
    t: MarsLocale;
};

export const MarsRoversHero = ({rovers, t}: Props) => {
    const active = rovers.filter((rover) => rover.status === "active").length;
    const archived = rovers.length - active;

    return (
        <section className="relative overflow-hidden rounded-[2.6rem] border border-[var(--mars-border)] bg-[var(--mars-surface)] p-6 shadow-[var(--mars-glow)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(249,115,22,.18),transparent_32%),radial-gradient(circle_at_12%_0%,rgba(56,189,248,.10),transparent_30%)]" />

            <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_360px]">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--mars-accent)]">
                        {t.roversEyebrow}
                    </p>

                    <h1 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-[var(--mars-text)] md:text-7xl">
                        {t.roversTitle}
                    </h1>

                    <p className="mt-5 max-w-4xl text-sm leading-7 text-[var(--mars-muted)]">
                        {t.roversDescription}
                    </p>
                </div>

                <aside className="grid gap-3">
                    <Stat icon={Rocket} label={t.totalRovers} value={rovers.length} />
                    <Stat icon={Activity} label={t.activeRovers} value={active} />
                    <Stat icon={Archive} label={t.archivedRovers} value={archived} />
                </aside>
            </div>
        </section>
    );
};

const Stat = ({
                  icon: Icon,
                  label,
                  value,
              }: {
    icon: typeof Rocket;
    label: string;
    value: string | number;
}) => (
    <div className="rounded-[1.3rem] border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] p-4">
        <Icon className="h-4 w-4 text-[var(--mars-accent)]" />
        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--mars-muted)]">
            {label}
        </p>
        <p className="mt-1 text-xl font-black text-[var(--mars-text)]">
            {value}
        </p>
    </div>
);