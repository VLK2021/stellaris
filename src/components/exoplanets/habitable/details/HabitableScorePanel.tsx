"use client";

import {Activity, Earth, Thermometer} from "lucide-react";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";
import type {HabitableWorldDetails} from "@/src/types/exoplanets/habitable.types";

import {
    getHabitableCandidateLabel,
    getHabitableScore,
    getHabitableScoreColor,
    getHabitableZoneLabel,
} from "@/src/helpers/exoplanets/habitable.helpers";

type Props = {
    data: HabitableWorldDetails;
    t: ExoplanetsLocale["habitable"];
};

export const HabitableScorePanel = ({data, t}: Props) => {
    const score = getHabitableScore(data.habitabilityScore);

    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
            <div className="pointer-events-none absolute inset-0 opacity-25" style={{background: "var(--hero-bg)"}} />

            <div className="relative z-10 grid gap-4 lg:grid-cols-[280px_1fr]">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                        {t.habitabilityProfile}
                    </p>

                    <h2 className="mt-2 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase tracking-[-0.05em] text-transparent">
                        {getHabitableCandidateLabel(score, t)}
                    </h2>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                    <ScoreItem icon={Earth} label={t.habitabilityScore} value={`${score}/100`} />
                    <ScoreItem icon={Thermometer} label={t.habitabilityZone} value={getHabitableZoneLabel(data.habitabilityZone, t)} />
                    <ScoreItem icon={Activity} label={t.equilibriumTemp} value={data.pl_eqt ? `${data.pl_eqt} K` : "—"} />
                </div>

                <div className="lg:col-span-2">
                    <div className="h-2.5 overflow-hidden rounded-full bg-[var(--color-glass)]">
                        <div
                            className={`h-full rounded-full ${getHabitableScoreColor(score)}`}
                            style={{width: `${score}%`}}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const ScoreItem = ({
                       icon: Icon,
                       label,
                       value,
                   }: {
    icon: typeof Earth;
    label: string;
    value: string | number;
}) => (
    <div className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-3">
        <Icon className="h-4 w-4 text-[var(--color-accent)]" />

        <p className="mt-2 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            {label}
        </p>

        <p className="mt-1 truncate text-sm font-black text-[var(--color-text)]">
            {value}
        </p>
    </div>
);