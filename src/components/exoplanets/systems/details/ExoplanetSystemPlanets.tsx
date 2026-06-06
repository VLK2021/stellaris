"use client";

import Link from "next/link";

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

export const ExoplanetSystemPlanets = ({data, t}: Props) => {
    return (
        <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                        {t.detectedPlanets}
                    </p>

                    <h2 className="mt-2 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase tracking-[-0.05em] text-transparent">
                        {data.system.hostname ?? t.unknown}
                    </h2>
                </div>

                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                    {data.planets.length} {t.planets}
                </p>
            </div>

            {data.planets.length === 0 ? (
                <p className="mt-5 text-sm text-[var(--color-text-muted)]">
                    {t.noPlanets}
                </p>
            ) : (
                <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {data.planets.map((planet, index) => (
                        <Link
                            key={`${planet.pl_name}-${index}`}
                            href={`/exoplanets/catalog/${encodeURIComponent(planet.pl_name ?? "")}`}
                            className="group rounded-[1.3rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 transition hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
                        >
                            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                                {planet.discoverymethod ?? t.method}
                            </p>

                            <h3 className="mt-2 truncate text-lg font-black uppercase tracking-[-0.04em] text-[var(--color-text)]">
                                {planet.pl_name ?? t.unknown}
                            </h3>

                            <div className="mt-4 grid grid-cols-2 gap-2">
                                <PlanetMetric label={t.radius} value={format(planet.pl_rade, " R⊕")} />
                                <PlanetMetric label={t.mass} value={format(planet.pl_bmasse, " M⊕")} />
                                <PlanetMetric label={t.orbitPeriod} value={format(planet.pl_orbper, " d")} />
                                <PlanetMetric label={t.equilibriumTemp} value={format(planet.pl_eqt, " K", 1)} />
                            </div>

                            <p className="mt-4 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                                {t.discoveryYear}: {planet.disc_year ?? "—"}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
};

const PlanetMetric = ({label, value}: {label: string; value: string}) => (
    <div className="rounded-[0.9rem] border border-[var(--color-border)] bg-[var(--color-card)]/50 p-3">
        <p className="text-[8px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            {label}
        </p>
        <p className="mt-1 truncate text-xs font-black text-[var(--color-text)]">
            {value}
        </p>
    </div>
);