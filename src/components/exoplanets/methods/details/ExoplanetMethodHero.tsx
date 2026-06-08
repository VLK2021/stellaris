"use client";

import {Radar, Sparkles, Telescope} from "lucide-react";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";
import type {MethodDetailsData} from "@/src/types/exoplanets/methodDetails.types";

import {
    getMethodDetailsDescription,
    getMethodGradient,
} from "@/src/helpers/exoplanets/methodDetails.helpers";

type Props = {
    data: MethodDetailsData;
    t: ExoplanetsLocale["methods"];
};

export const ExoplanetMethodHero = ({data, t}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)]">
            <div
                className="absolute inset-0 opacity-65"
                style={{background: getMethodGradient(data.method)}}
            />
            <div className="absolute inset-0 opacity-20" style={{background: "var(--hero-bg)"}} />
            <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:30px_30px]" />

            <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_320px]">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                        {t.discoveryMethod}
                    </p>

                    <h1 className="mt-4 max-w-4xl bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-transparent sm:text-5xl">
                        {data.method}
                    </h1>

                    <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--color-text-muted)]">
                        {getMethodDetailsDescription(data.method, t)}
                    </p>
                </div>

                <aside className="rounded-[1.6rem] border border-[var(--color-border)] bg-[rgba(5,12,28,.68)] p-5">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-accent)]">
                        <Radar className="h-6 w-6" />
                    </div>

                    <p className="mt-5 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                        {t.confirmedPlanets}
                    </p>

                    <p className="mt-2 text-6xl font-black tracking-[-0.08em] text-[var(--color-text)]">
                        {data.planets}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                        <HeroMini icon={Sparkles} label={t.systems} value={data.systems} />
                        <HeroMini icon={Telescope} label={t.lastYear} value={data.lastYear ?? "—"} />
                    </div>
                </aside>
            </div>
        </section>
    );
};

const HeroMini = ({
                      icon: Icon,
                      label,
                      value,
                  }: {
    icon: typeof Sparkles;
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