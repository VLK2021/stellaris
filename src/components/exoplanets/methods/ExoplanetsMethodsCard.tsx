"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {
    ArrowRight,
    CalendarDays,
    Gauge,
    Orbit,
    Radar,
    Ruler,
    Sparkles,
    Thermometer,
} from "lucide-react";

import {
    formatMethodValue,
    getMethodDescriptionKey,
    getMethodGradient,
} from "@/src/helpers/exoplanets/methods.helpers";
import type {ExoplanetMethodItem} from "@/src/types/exoplanets/methods.types";
import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

type Props = {
    item: ExoplanetMethodItem;
    index: number;
    t: ExoplanetsLocale["methods"];
};

const getMethodDescription = (
    method: string,
    t: ExoplanetsLocale["methods"],
) => {
    const key = getMethodDescriptionKey(method);

    if (key === "transit") return t.transitDescription;
    if (key === "radialVelocity") return t.radialVelocityDescription;
    if (key === "imaging") return t.imagingDescription;
    if (key === "microlensing") return t.microlensingDescription;
    if (key === "timing") return t.timingDescription;
    if (key === "astrometry") return t.astrometryDescription;

    return t.otherDescription;
};

export const ExoplanetsMethodsCard = ({item, index, t}: Props) => {
    const href = `/exoplanets/methods/${encodeURIComponent(item.method)}`;

    return (
        <motion.article
            initial={{opacity: 0, y: 14}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.3, delay: Math.min(index * 0.025, 0.15)}}
            className="group relative overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] transition duration-300 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
        >
            <div className="pointer-events-none absolute inset-0 opacity-50" style={{background: getMethodGradient(item.method)}} />
            <div className="pointer-events-none absolute inset-0 opacity-20" style={{background: "var(--hero-bg)"}} />
            <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:28px_28px]" />

            <div className="relative z-10 grid gap-4 p-5 lg:grid-cols-[minmax(0,1fr)_240px]">
                <div className="flex min-w-0 flex-col">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                        {t.discoveryMethod}
                    </p>

                    <h2 className="mt-3 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase leading-[0.95] tracking-[-0.06em] text-transparent">
                        {item.method}
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)]">
                        {getMethodDescription(item.method, t)}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                        <MethodMini icon={Orbit} label={t.planets} value={item.planets} />
                        <MethodMini icon={Sparkles} label={t.systems} value={item.systems} />
                        <MethodMini icon={CalendarDays} label={t.firstYear} value={item.firstYear ?? "—"} />
                        <MethodMini icon={CalendarDays} label={t.lastYear} value={item.lastYear ?? "—"} />
                    </div>

                    <Link
                        href={href}
                        className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-accent)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--color-accent)] transition hover:bg-[var(--color-accent)] hover:text-black"
                    >
                        {t.details}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <aside className="relative flex min-w-0 flex-col justify-between rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4">
                    <div>
                        <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-accent)]">
                            <Radar className="h-5 w-5" />
                        </div>

                        <p className="mt-4 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                            {t.methodStats}
                        </p>

                        <p className="mt-2 text-4xl font-black tracking-[-0.08em] text-[var(--color-text)]">
                            {item.planets}
                        </p>

                        <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                            {t.confirmedPlanets}
                        </p>
                    </div>

                    <div className="mt-5 grid gap-2">
                        <MethodLine icon={Gauge} label={t.avgDistance} value={formatMethodValue(item.avgDistance, " pc")} />
                        <MethodLine icon={Ruler} label={t.avgRadius} value={formatMethodValue(item.avgRadius, " R⊕")} />
                        <MethodLine icon={Thermometer} label={t.avgTemperature} value={formatMethodValue(item.avgTemperature, " K", 1)} />
                    </div>
                </aside>
            </div>
        </motion.article>
    );
};

const MethodMini = ({
                        icon: Icon,
                        label,
                        value,
                    }: {
    icon: typeof Orbit;
    label: string;
    value: string | number;
}) => (
    <div className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-3">
        <Icon className="h-4 w-4 text-[var(--color-accent)]" />
        <p className="mt-2 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            {label}
        </p>
        <p className="mt-1 truncate text-xs font-black text-[var(--color-text)]">
            {value}
        </p>
    </div>
);

const MethodLine = ({
                        icon: Icon,
                        label,
                        value,
                    }: {
    icon: typeof Gauge;
    label: string;
    value: string;
}) => (
    <div className="flex min-w-0 items-start gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]/50 px-3 py-2">
        <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" />

        <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                {label}
            </p>

            <p className="mt-1 break-words text-xs font-black leading-5 text-[var(--color-text)]">
                {value}
            </p>
        </div>
    </div>
);