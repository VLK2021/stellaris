"use client";

import {Orbit, Sparkles} from "lucide-react";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";
import type {ExoplanetSystemDetails} from "./ExoplanetSystemDetailsPage";

type Props = {
    data: ExoplanetSystemDetails;
    t: ExoplanetsLocale["systems"];
};

const format = (value: number | null, suffix = "", digits = 2) => {
    if (value === null || !Number.isFinite(value)) return "—";
    return `${Number(value.toFixed(digits))}${suffix}`;
};

const getStarGradient = (temperature: number | null) => {
    if (!temperature) return "radial-gradient(circle at 35% 30%, #e0f2fe, #38bdf8, #0f172a)";
    if (temperature < 3700) return "radial-gradient(circle at 35% 30%, #fecaca, #ef4444, #450a0a)";
    if (temperature < 5200) return "radial-gradient(circle at 35% 30%, #fed7aa, #f97316, #7c2d12)";
    if (temperature < 6500) return "radial-gradient(circle at 35% 30%, #fef9c3, #facc15, #713f12)";
    return "radial-gradient(circle at 35% 30%, #e0f2fe, #38bdf8, #1e3a8a)";
};

export const ExoplanetSystemHero = ({data, t}: Props) => {
    const system = data.system;
    const starGradient = getStarGradient(system.st_teff);
    const planetCount = data.planets.length;

    return (
        <section className="relative overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)] lg:p-8">
            <div className="absolute inset-0 opacity-35" style={{background: "var(--hero-bg)"}} />

            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_420px]">
                <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                        {t.overview}
                    </p>

                    <h1 className="mt-4 max-w-4xl bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-4xl font-black uppercase leading-[0.95] tracking-[-0.06em] text-transparent sm:text-5xl">
                        {system.hostname ?? t.unknown}
                    </h1>

                    <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--color-text-muted)]">
                        {t.source}
                    </p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                        <HeroMetric label={t.detectedPlanets} value={planetCount} />
                        <HeroMetric label={t.detectedStars} value={system.sy_snum ?? "—"} />
                        <HeroMetric label={t.distance} value={format(system.sy_dist, " pc")} />
                    </div>
                </div>

                <div className="relative grid min-h-[320px] place-items-center overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-glass)]">
                    <div className="absolute h-[260px] w-[260px] rounded-full border border-[var(--color-accent)]/25" />
                    <div className="absolute h-[190px] w-[190px] rounded-full border border-[var(--color-brand-secondary)]/25" />

                    <div
                        className="relative z-10 h-[110px] w-[110px] rounded-full shadow-[var(--shadow-glow)]"
                        style={{background: starGradient}}
                    />

                    {data.planets.slice(0, 7).map((planet, index) => {
                        const orbitSize = 140 + index * 28;

                        return (
                            <div
                                key={`${planet.pl_name}-${index}`}
                                className="absolute rounded-full border border-[var(--color-border)]/55"
                                style={{
                                    width: orbitSize,
                                    height: orbitSize,
                                }}
                            >
                                <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--color-accent)] shadow-[var(--shadow-glow)]" />
                            </div>
                        );
                    })}

                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                        <Orbit className="h-4 w-4" />
                        {t.systemArchitecture}
                    </div>
                </div>
            </div>
        </section>
    );
};

const HeroMetric = ({label, value}: {label: string; value: string | number}) => (
    <div className="rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4">
        <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {label}
        </p>
        <p className="mt-1 text-lg font-black text-[var(--color-text)]">
            {value}
        </p>
    </div>
);