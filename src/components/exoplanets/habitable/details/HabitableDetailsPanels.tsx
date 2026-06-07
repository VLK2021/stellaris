"use client";

import {Earth, Orbit, Ruler, Sparkles, Thermometer, Timer, Weight} from "lucide-react";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";
import type {HabitableWorldDetails} from "@/src/types/exoplanets/habitable.types";

import {formatHabitableValue} from "@/src/helpers/exoplanets/habitable.helpers";

import {HabitableMetricCard} from "./HabitableMetricCard";

type Props = {
    data: HabitableWorldDetails;
    t: ExoplanetsLocale["habitable"];
};

export const HabitableDetailsPanels = ({data, t}: Props) => {
    return (
        <section className="grid gap-5 xl:grid-cols-3">
            <Panel title={t.planetaryParameters}>
                <HabitableMetricCard icon={Ruler} label={t.radius} value={formatHabitableValue(data.pl_rade, " R⊕")} />
                <HabitableMetricCard icon={Weight} label={t.mass} value={formatHabitableValue(data.pl_bmasse, " M⊕")} />
                <HabitableMetricCard icon={Thermometer} label={t.equilibriumTemp} value={formatHabitableValue(data.pl_eqt, " K", 1)} />
                <HabitableMetricCard icon={Orbit} label={t.orbitalPeriod} value={formatHabitableValue(data.pl_orbper, " d")} />
            </Panel>

            <Panel title={t.stellarContext}>
                <HabitableMetricCard icon={Sparkles} label={t.hostStar} value={data.hostname ?? "—"} />
                <HabitableMetricCard icon={Thermometer} label={t.stellarTemperature} value={formatHabitableValue(data.st_teff, " K")} />
                <HabitableMetricCard icon={Ruler} label={t.stellarRadius} value={formatHabitableValue(data.st_rad, " R☉")} />
                <HabitableMetricCard icon={Weight} label={t.stellarMass} value={formatHabitableValue(data.st_mass, " M☉")} />
            </Panel>

            <Panel title={t.discoveryContext}>
                <HabitableMetricCard icon={Timer} label={t.discoveryYear} value={data.disc_year ?? "—"} />
                <HabitableMetricCard icon={Earth} label={t.discoveryMethod} value={data.discoverymethod ?? "—"} />
                <HabitableMetricCard icon={Ruler} label={t.distance} value={formatHabitableValue(data.sy_dist, " pc")} />
                <HabitableMetricCard icon={Sparkles} label={t.hostStar} value={data.hostname ?? "—"} />
            </Panel>
        </section>
    );
};

const Panel = ({
                   title,
                   children,
               }: {
    title: string;
    children: React.ReactNode;
}) => (
    <article className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
        <div className="pointer-events-none absolute inset-0 opacity-25" style={{background: "var(--hero-bg)"}} />

        <div className="relative z-10">
            <h2 className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase tracking-[-0.05em] text-transparent">
                {title}
            </h2>

            <div className="mt-5 grid gap-3">
                {children}
            </div>
        </div>
    </article>
);