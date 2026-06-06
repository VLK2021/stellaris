"use client";

import Link from "next/link";
import {ArrowRight, Orbit, Ruler, Sparkles, Thermometer, Timer} from "lucide-react";

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

const getPlanetGradient = (temperature: number | null) => {
    if (!temperature) return "radial-gradient(circle at 35% 30%, #bfdbfe, #2563eb, #0f172a)";
    if (temperature > 1000) return "radial-gradient(circle at 35% 30%, #fed7aa, #f97316, #7c2d12)";
    if (temperature > 650) return "radial-gradient(circle at 35% 30%, #fde68a, #eab308, #713f12)";
    if (temperature > 350) return "radial-gradient(circle at 35% 30%, #bae6fd, #0ea5e9, #0f172a)";
    return "radial-gradient(circle at 35% 30%, #ddd6fe, #7c3aed, #111827)";
};

export const ExoplanetSystemPlanets = ({data, t}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
            <div className="pointer-events-none absolute inset-0 opacity-25" style={{background: "var(--hero-bg)"}} />
            <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:30px_30px]" />

            <div className="relative z-10">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                            {t.detectedPlanets}
                        </p>

                        <h2 className="mt-2 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase tracking-[-0.05em] text-transparent">
                            {data.system.hostname ?? t.unknown}
                        </h2>
                    </div>

                    <p className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                        {data.planets.length} {t.planets}
                    </p>
                </div>

                {data.planets.length === 0 ? (
                    <p className="mt-6 text-sm text-[var(--color-text-muted)]">
                        {t.noPlanets}
                    </p>
                ) : (
                    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {data.planets.map((planet, index) => {
                            const href = `/exoplanets/catalog/${encodeURIComponent(planet.pl_name ?? "")}`;

                            return (
                                <article
                                    key={`${planet.pl_name}-${index}`}
                                    className="relative overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[rgba(5,12,28,.62)] p-4 transition hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
                                >
                                    <div
                                        className="pointer-events-none absolute right-[-42px] top-[-42px] h-[135px] w-[135px] rounded-full opacity-35"
                                        style={{background: getPlanetGradient(planet.pl_eqt)}}
                                    />

                                    <div className="relative z-10">
                                        <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                                            {planet.discoverymethod ?? t.method}
                                        </p>

                                        <h3 className="mt-3 text-lg font-black uppercase tracking-[-0.045em] text-[var(--color-text)]">
                                            {planet.pl_name ?? t.unknown}
                                        </h3>

                                        <div className="mt-4 grid grid-cols-2 gap-2">
                                            <PlanetMetric icon={Ruler} label={t.radius} value={format(planet.pl_rade, " R⊕")} />
                                            <PlanetMetric icon={Sparkles} label={t.mass} value={format(planet.pl_bmasse, " M⊕")} />
                                            <PlanetMetric icon={Orbit} label={t.orbitPeriod} value={format(planet.pl_orbper, " d")} />
                                            <PlanetMetric icon={Thermometer} label={t.equilibriumTemp} value={format(planet.pl_eqt, " K", 1)} />
                                        </div>

                                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                                            <p className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                                                <Timer className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                                                {t.discoveryYear}: {planet.disc_year ?? "—"}
                                            </p>

                                            <Link
                                                href={href}
                                                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)] px-3 py-2 text-[9px] font-black uppercase tracking-[0.15em] text-[var(--color-accent)] transition hover:bg-[var(--color-accent)] hover:text-black"
                                            >
                                                {t.open}
                                                <ArrowRight className="h-3.5 w-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

const PlanetMetric = ({
                          icon: Icon,
                          label,
                          value,
                      }: {
    icon: typeof Sparkles;
    label: string;
    value: string;
}) => (
    <div className="rounded-[0.9rem] border border-[var(--color-border)] bg-[var(--color-card)]/50 p-3">
        <Icon className="h-3.5 w-3.5 text-[var(--color-accent)]" />

        <p className="mt-2 text-[8px] font-black uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
            {label}
        </p>

        <p className="mt-1 truncate text-[11px] font-black text-[var(--color-text)]">
            {value}
        </p>
    </div>
);