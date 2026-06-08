"use client";

import {CircleCheck, CircleX} from "lucide-react";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

import {
    getMethodCons,
    getMethodPros,
} from "@/src/helpers/exoplanets/methodDetails.helpers";

type Props = {
    method: string;
    t: ExoplanetsLocale["methods"];
};

export const ExoplanetMethodProsCons = ({method, t}: Props) => {
    const pros = getMethodPros(method, t);
    const cons = getMethodCons(method, t);

    return (
        <section className="grid gap-5 xl:grid-cols-2">
            <Panel title={t.advantages}>
                {pros.map((item) => (
                    <Line key={item} icon={CircleCheck} value={item} />
                ))}
            </Panel>

            <Panel title={t.limitations}>
                {cons.map((item) => (
                    <Line key={item} icon={CircleX} value={item} />
                ))}
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
        <div className="absolute inset-0 opacity-20" style={{background: "var(--hero-bg)"}} />

        <div className="relative z-10">
            <h2 className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase tracking-[-0.05em] text-transparent">
                {title}
            </h2>

            <div className="mt-5 grid gap-3">{children}</div>
        </div>
    </article>
);

const Line = ({
                  icon: Icon,
                  value,
              }: {
    icon: typeof CircleCheck;
    value: string;
}) => (
    <div className="flex gap-3 rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-3">
        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />

        <p className="text-sm font-bold leading-6 text-[var(--color-text)]">
            {value}
        </p>
    </div>
);