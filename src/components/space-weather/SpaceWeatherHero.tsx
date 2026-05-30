"use client";

import {motion} from "framer-motion";
import {Activity, RadioTower, Sun} from "lucide-react";

import type {SpaceWeatherLocale} from "@/src/types/space-weather/spaceWeatherUi.types";

type Props = {
    locale: SpaceWeatherLocale;
};

export const SpaceWeatherHero = ({locale}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-7 lg:p-9">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_42%,rgba(234,88,12,0.18),transparent_34%),radial-gradient(circle_at_20%_80%,var(--color-accent-soft),transparent_38%)]" />

            <motion.div
                className="absolute right-[-80px] top-[-90px] hidden h-[340px] w-[340px] rounded-full border border-[var(--color-warning)]/25 lg:block"
                animate={{rotate: 360}}
                transition={{duration: 35, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute right-[84px] top-[78px] hidden h-20 w-20 rounded-full bg-[var(--color-warning)]/40 blur-2xl lg:block"
                animate={{scale: [1, 1.35, 1], opacity: [0.3, 0.75, 0.3]}}
                transition={{duration: 3.5, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="relative z-10 max-w-4xl">
                <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-accent-soft)] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                    <RadioTower className="h-3.5 w-3.5" />
                    {locale.badge}
                </p>

                <h1 className="mt-4 text-3xl font-black uppercase tracking-[-0.035em] text-[var(--color-text)] sm:text-4xl lg:text-[46px]">
                    <span>Space </span>
                    <span className="bg-gradient-to-r from-[var(--color-warning)] via-[var(--color-accent)] to-[var(--color-plasma)] bg-clip-text text-transparent">
                        Weather
                    </span>
                    <span> Center</span>
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">
                    {locale.text}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                    <MiniSignal icon={Sun} label="Solar Activity" />
                    <MiniSignal icon={Activity} label="DONKI Events" />
                    <MiniSignal icon={RadioTower} label="NASA Data" />
                </div>
            </div>
        </section>
    );
};

const MiniSignal = ({
                        icon: Icon,
                        label,
                    }: {
    icon: typeof Sun;
    label: string;
}) => (
    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
        <Icon className="h-3.5 w-3.5 text-[var(--color-accent)]" />
        {label}
    </div>
);