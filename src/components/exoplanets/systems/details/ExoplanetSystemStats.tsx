"use client";

import {Activity, Atom, Gauge, Orbit, Ruler, Sparkles, Thermometer, Timer} from "lucide-react";

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
        <section className="grid gap-5 xl:grid-cols-2">
            <Panel title={t.stellarPhysics} eyebrow={t.hostStar} description={system.hostname ?? t.unknown}>
                <Metric icon={Sparkles} label={t.spectralType} value={system.st_spectype ?? "—"} />
                <Metric icon={Thermometer} label={t.temperature} value={format(system.st_teff, " K")} />
                <Metric icon={Ruler} label={t.radius} value={format(system.st_rad, " R☉")} />
                <Metric icon={Atom} label={t.mass} value={format(system.st_mass, " M☉")} />
                <Metric icon={Timer} label={t.age} value={format(system.st_age, " Gyr")} />
                <Metric icon={Activity} label={t.metallicity} value={format(system.st_met)} />
            </Panel>

            <Panel title={t.systemArchitecture} eyebrow={t.overview} description={t.source}>
                <Metric icon={Orbit} label={t.hostStar} value={system.hostname ?? "—"} />
                <Metric icon={Sparkles} label={t.detectedPlanets} value={data.planets.length} />
                <Metric icon={Sparkles} label={t.detectedStars} value={system.sy_snum ?? "—"} />
                <Metric icon={Orbit} label={t.detectedMoons} value={system.sy_mnum ?? "—"} />
                <Metric icon={Gauge} label={t.gravity} value={format(system.st_logg)} />
                <Metric icon={Ruler} label={t.distance} value={format(system.sy_dist, " pc")} />
            </Panel>
        </section>
    );
};

const Panel = ({
                   title,
                   eyebrow,
                   description,
                   children,
               }: {
    title: string;
    eyebrow: string;
    description: string;
    children: React.ReactNode;
}) => (
    <article className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
        <div className="pointer-events-none absolute inset-0 opacity-25" style={{background: "var(--hero-bg)"}} />
        <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:30px_30px]" />

        <div className="relative z-10">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                {eyebrow}
            </p>

            <h2 className="mt-2 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase tracking-[-0.05em] text-transparent">
                {title}
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)]">
                {description}
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {children}
            </div>
        </div>
    </article>
);

const Metric = ({
                    icon: Icon,
                    label,
                    value,
                }: {
    icon: typeof Sparkles;
    label: string;
    value: string | number;
}) => (
    <div className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-3 transition hover:border-[var(--color-accent)]">
        <Icon className="h-4 w-4 text-[var(--color-accent)]" />

        <p className="mt-2 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            {label}
        </p>

        <p className="mt-1 truncate text-base font-black text-[var(--color-text)]">
            {value}
        </p>
    </div>
);