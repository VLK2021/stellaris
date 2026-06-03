"use client";

import {motion} from "framer-motion";
import {Activity, Database, Orbit, Sparkles} from "lucide-react";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

type Props = {
    t: ExoplanetsLocale;
};

export const ExoplanetsHero = ({t}: Props) => {
    return (
        <motion.section
            initial={{opacity: 0, y: 18}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.45}}
            className="relative overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl lg:p-7"
        >
            <motion.div
                className="absolute inset-0"
                style={{background: "var(--hero-bg)"}}
                animate={{
                    scale: [1, 1.035, 1],
                    opacity: [0.72, 1, 0.72],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:30px_30px]" />

            <motion.div
                className="absolute -right-20 -top-28 h-[420px] w-[420px] rounded-full border border-[var(--color-accent)]/25"
                animate={{rotate: 360}}
                transition={{duration: 62, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute right-[5%] top-[17%] h-[250px] w-[250px] rounded-full border border-[var(--color-brand-secondary)]/25"
                animate={{rotate: -360}}
                transition={{duration: 44, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute right-[12%] top-[34%] h-20 w-20 rounded-full bg-[var(--color-accent-soft)] shadow-[var(--shadow-glow)]"
                animate={{
                    scale: [1, 1.12, 1],
                    opacity: [0.6, 1, 0.6],
                }}
                transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                animate={{
                    x: ["-30%", "30%", "-30%"],
                    opacity: [0.15, 0.7, 0.15],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="relative z-10 grid min-h-[330px] items-center gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div>
                    <p className="exo-label text-[10px] font-black uppercase tracking-[0.28em]">
                        {t.hero.eyebrow}
                    </p>

                    <h1 className="mt-4 max-w-[620px] text-[1.95rem] font-black uppercase leading-[0.95] tracking-[-0.045em] sm:text-[2.45rem] lg:text-[3rem]">
                        {t.hero.title}
                    </h1>

                    <p className="exo-muted mt-5 max-w-2xl text-sm leading-7">
                        {t.hero.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <HeroChip icon={Database} label="NASA TAP" />
                        <HeroChip icon={Orbit} label="Planetary Systems" />
                        <HeroChip icon={Sparkles} label="Archive Online" />
                    </div>
                </div>

                <div className="relative hidden min-h-[280px] lg:block">
                    <motion.div
                        className="absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-accent)]/35"
                        animate={{rotate: 360}}
                        transition={{duration: 30, repeat: Infinity, ease: "linear"}}
                    />

                    <motion.div
                        className="absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-brand-secondary)]/35"
                        animate={{rotate: -360}}
                        transition={{duration: 22, repeat: Infinity, ease: "linear"}}
                    />

                    <motion.div
                        className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent-soft)] shadow-[var(--shadow-glow)]"
                        animate={{scale: [1, 1.15, 1]}}
                        transition={{duration: 3, repeat: Infinity, ease: "easeInOut"}}
                    />

                    <motion.div
                        className="absolute left-[22%] top-[35%] h-4 w-4 rounded-full bg-[var(--color-accent)] shadow-[var(--shadow-glow)]"
                        animate={{scale: [1, 1.4, 1], opacity: [0.55, 1, 0.55]}}
                        transition={{duration: 2.4, repeat: Infinity}}
                    />

                    <motion.div
                        className="absolute right-[28%] top-[28%] h-3 w-3 rounded-full bg-[var(--color-brand-secondary)] shadow-[var(--shadow-glow)]"
                        animate={{scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5]}}
                        transition={{duration: 2.8, repeat: Infinity}}
                    />

                    <motion.div
                        className="absolute bottom-[25%] right-[34%] h-5 w-5 rounded-full bg-[var(--color-earth)] shadow-[var(--shadow-glow)]"
                        animate={{scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6]}}
                        transition={{duration: 3.2, repeat: Infinity}}
                    />

                    <div className="absolute bottom-4 right-4 rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-3 backdrop-blur-xl">
                        <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-[var(--color-accent)]" />
                            <span className="exo-label text-[10px] font-black uppercase tracking-[0.18em]">
                                TAP Signal
                            </span>
                        </div>

                        <p className="mt-1 text-xs font-bold text-[var(--color-text)]">
                            Exoplanet Archive online
                        </p>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

type HeroChipProps = {
    icon: typeof Database;
    label: string;
};

const HeroChip = ({icon: Icon, label}: HeroChipProps) => {
    return (
        <motion.div
            whileHover={{y: -3, scale: 1.03}}
            className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 backdrop-blur-xl"
        >
            <Icon className="h-4 w-4 text-[var(--color-accent)]" />
            <span className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                {label}
            </span>
        </motion.div>
    );
};