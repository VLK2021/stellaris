"use client";

import {CalendarDays, Gauge, Orbit, Ruler, Sparkles, Thermometer, Weight} from "lucide-react";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";
import type {MethodDetailsData} from "@/src/types/exoplanets/methodDetails.types";

import {formatMethodDetailsValue} from "@/src/helpers/exoplanets/methodDetails.helpers";

type Props = {
    data: MethodDetailsData;
    t: ExoplanetsLocale["methods"];
};

export const ExoplanetMethodStats = ({data, t}: Props) => {
    return (
        <section className="grid gap-4 xl:grid-cols-4">
            <Stat icon={Orbit} label={t.planets} value={data.planets} />
            <Stat icon={Sparkles} label={t.systems} value={data.systems} />
            <Stat icon={CalendarDays} label={t.firstYear} value={data.firstYear ?? "—"} />
            <Stat icon={CalendarDays} label={t.lastYear} value={data.lastYear ?? "—"} />
            <Stat icon={Gauge} label={t.avgDistance} value={formatMethodDetailsValue(data.avgDistance, " pc")} />
            <Stat icon={Ruler} label={t.avgRadius} value={formatMethodDetailsValue(data.avgRadius, " R⊕")} />
            <Stat icon={Weight} label={t.avgMass} value={formatMethodDetailsValue(data.avgMass, " M⊕")} />
            <Stat icon={Thermometer} label={t.avgTemperature} value={formatMethodDetailsValue(data.avgTemperature, " K", 1)} />
        </section>
    );
};

const Stat = ({
                  icon: Icon,
                  label,
                  value,
              }: {
    icon: typeof Orbit;
    label: string;
    value: string | number;
}) => (
    <article className="relative overflow-hidden rounded-[1.4rem] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] transition hover:border-[var(--color-accent)]">
        <div className="absolute inset-0 opacity-20" style={{background: "var(--hero-bg)"}} />

        <div className="relative z-10">
            <Icon className="h-4 w-4 text-[var(--color-accent)]" />

            <p className="mt-3 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                {label}
            </p>

            <p className="mt-1 truncate text-lg font-black text-[var(--color-text)]">
                {value}
            </p>
        </div>
    </article>
);