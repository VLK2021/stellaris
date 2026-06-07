"use client";

import {Earth, Sparkles, Thermometer} from "lucide-react";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";
import type {HabitableWorldDetails} from "@/src/types/exoplanets/habitable.types";

import {
    getHabitableBackground,
    getHabitableCandidateLabel,
    getHabitableScore,
    getHabitableZoneGradient,
    getHabitableZoneLabel,
} from "@/src/helpers/exoplanets/habitable.helpers";

type Props = {
    data: HabitableWorldDetails;
    t: ExoplanetsLocale["habitable"];
};

export const HabitableDetailsHero = ({data, t}: Props) => {
    const planetName = data.pl_name ?? t.unknownWorld;
    const score = getHabitableScore(data.habitabilityScore);

    return (
        <section className="relative min-h-[430px] overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
            <div
                className="absolute inset-0 scale-105 bg-cover bg-center opacity-35"
                style={{backgroundImage: `url(${getHabitableBackground(planetName)})`}}
            />

            <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-background)_0%,rgba(3,7,18,.9)_48%,rgba(3,7,18,.62)_100%)]" />

            <div
                className="absolute inset-0 opacity-70"
                style={{background: getHabitableZoneGradient(data.habitabilityZone)}}
            />

            <div className="relative z-10 grid min-h-[430px] gap-6 p-5 lg:grid-cols-[1fr_340px] lg:p-8">
                <div className="flex flex-col justify-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                        {t.habitabilityProfile}
                    </p>

                    <h1 className="mt-4 max-w-4xl bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-transparent sm:text-5xl lg:text-6xl">
                        {planetName}
                    </h1>

                    <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">
                        {t.dataSource}
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <HeroStat icon={Earth} label={t.habitabilityScore} value={`${score}/100`} />
                        <HeroStat icon={Thermometer} label={t.habitabilityZone} value={getHabitableZoneLabel(data.habitabilityZone, t)} />
                        <HeroStat icon={Sparkles} label={t.hostStar} value={data.hostname ?? "—"} />
                    </div>
                </div>

                <div className="relative flex flex-col justify-center rounded-[1.7rem] border border-[var(--color-border)] bg-[rgba(5,12,28,.72)] p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                        {getHabitableCandidateLabel(score, t)}
                    </p>

                    <div className="mt-5 flex items-end justify-between">
                        <span className="text-6xl font-black tracking-[-0.08em] text-[var(--color-text)]">
                            {score}
                        </span>

                        <span className="pb-2 text-sm font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                            / 100
                        </span>
                    </div>

                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-[var(--color-glass)]">
                        <div
                            className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-500"
                            style={{width: `${score}%`}}
                        />
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-2 text-center text-[9px] font-black uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                        <span>{t.coldZone}</span>
                        <span className="text-[var(--color-accent)]">{t.temperateZone}</span>
                        <span>{t.hotZone}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

const HeroStat = ({
                      icon: Icon,
                      label,
                      value,
                  }: {
    icon: typeof Earth;
    label: string;
    value: string | number;
}) => (
    <div className="rounded-[1rem] border border-[var(--color-border)] bg-[rgba(5,12,28,.72)] p-3">
        <Icon className="h-4 w-4 text-[var(--color-accent)]" />

        <p className="mt-2 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            {label}
        </p>

        <p className="mt-1 truncate text-sm font-black text-[var(--color-text)]">
            {value}
        </p>
    </div>
);