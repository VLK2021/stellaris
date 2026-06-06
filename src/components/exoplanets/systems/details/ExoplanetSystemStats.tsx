"use client";

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

export const ExoplanetSystemStats = ({data, t}: Props) => {
    const system = data.system;

    return (
        <section className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
                <h2 className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase tracking-[-0.05em] text-transparent">
                    {t.stellarPhysics}
                </h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <Metric label={t.spectralType} value={system.st_spectype ?? "—"} />
                    <Metric label={t.temperature} value={format(system.st_teff, " K")} />
                    <Metric label={t.radius} value={format(system.st_rad, " R☉")} />
                    <Metric label={t.mass} value={format(system.st_mass, " M☉")} />
                    <Metric label={t.age} value={format(system.st_age, " Gyr")} />
                    <Metric label={t.metallicity} value={format(system.st_met)} />
                </div>
            </article>

            <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
                <h2 className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase tracking-[-0.05em] text-transparent">
                    {t.systemArchitecture}
                </h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <Metric label={t.hostStar} value={system.hostname ?? "—"} />
                    <Metric label={t.detectedPlanets} value={data.planets.length} />
                    <Metric label={t.detectedStars} value={system.sy_snum ?? "—"} />
                    <Metric label={t.detectedMoons} value={system.sy_mnum ?? "—"} />
                    <Metric label={t.gravity} value={format(system.st_logg)} />
                    <Metric label={t.distance} value={format(system.sy_dist, " pc")} />
                </div>
            </article>
        </section>
    );
};

const Metric = ({label, value}: {label: string; value: string | number}) => (
    <div className="rounded-[1.1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4">
        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {label}
        </p>
        <p className="mt-2 truncate text-sm font-black text-[var(--color-text)]">
            {value}
        </p>
    </div>
);