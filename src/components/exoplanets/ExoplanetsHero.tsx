"use client";

import {motion} from "framer-motion";
import {Database, Orbit, Radar, Search, Sparkles} from "lucide-react";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

type Props = {
    t: ExoplanetsLocale;
};

export const ExoplanetsHero = ({t}: Props) => {
    return (
        <motion.section
            initial={{opacity: 0, y: 18}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="relative min-h-[500px] overflow-hidden rounded-[2.4rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-7 lg:p-9"
        >
            <motion.div
                className="absolute inset-0"
                style={{background: "var(--hero-bg)"}}
                animate={{opacity: [0.65, 1, 0.65], scale: [1, 1.03, 1]}}
                transition={{duration: 9, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:38px_38px]" />

            <motion.div
                className="absolute -right-24 -top-28 h-[460px] w-[460px] rounded-full border border-[var(--color-accent)]/35 bg-[var(--color-accent-soft)] shadow-[var(--shadow-glow)]"
                animate={{rotate: 360, scale: [1, 1.05, 1]}}
                transition={{duration: 55, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute right-[8%] top-[18%] h-[260px] w-[260px] rounded-full border border-[var(--color-brand-secondary)]/30"
                animate={{rotate: -360}}
                transition={{duration: 42, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute left-[-10%] bottom-[-35%] h-[420px] w-[420px] rounded-full bg-[var(--color-accent-soft)] blur-3xl"
                animate={{x: [0, 40, 0], y: [0, -30, 0], opacity: [0.25, 0.55, 0.25]}}
                transition={{duration: 10, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                animate={{x: ["-30%", "30%", "-30%"], opacity: [0.08, 0.45, 0.08]}}
                transition={{duration: 7, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="relative z-10 flex min-h-[420px] flex-col justify-between">
                <div className="max-w-5xl">
                    <p className="exo-label text-[10px] font-black uppercase tracking-[0.28em] sm:text-[11px]">
                        {t.hero.eyebrow}
                    </p>

                    <h1 className="mt-5 max-w-4xl text-[3.1rem] font-black uppercase leading-[0.9] tracking-[-0.075em] sm:text-[4rem] lg:text-[5.1rem]">
                        {t.hero.title}
                    </h1>

                    <p className="exo-muted mt-6 max-w-3xl text-sm leading-7 sm:text-[15px]">
                        {t.hero.description}
                    </p>
                </div>

                <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                    <HeroMetric icon={Database} label={t.hero.source} value="NASA TAP" />
                    <HeroMetric icon={Orbit} label={t.hero.dataset} value="Planetary Systems" />
                    <HeroMetric icon={Search} label={t.hero.mode} value="Portal / Explorer" />
                    <HeroMetric icon={Sparkles} label={t.hero.data} value="Confirmed planets" />
                    <HeroMetric icon={Radar} label="Status" value="Archive Online" />
                </div>
            </div>
        </motion.section>
    );
};

type HeroMetricProps = {
    icon: typeof Database;
    label: string;
    value: string;
};

const HeroMetric = ({icon: Icon, label, value}: HeroMetricProps) => {
    return (
        <motion.div
            whileHover={{y: -4, scale: 1.015}}
            transition={{duration: 0.2}}
            className="group relative overflow-hidden rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl"
        >
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-40"
                style={{background: "var(--hero-bg)"}}
                animate={{x: ["-25%", "25%", "-25%"]}}
                transition={{duration: 5, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="relative z-10">
                <Icon className="h-4 w-4 text-[var(--color-accent)]" />

                <p className="exo-muted mt-4 text-[10px] font-black uppercase tracking-[0.18em]">
                    {label}
                </p>

                <p className="mt-1 text-sm font-bold text-[var(--color-text)]">
                    {value}
                </p>
            </div>
        </motion.div>
    );
};