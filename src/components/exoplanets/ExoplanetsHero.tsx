"use client";

import {motion} from "framer-motion";
import {Activity, Orbit, Sparkles} from "lucide-react";

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
            className="relative overflow-hidden rounded-[2.4rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl lg:p-7"
        >
            <motion.div
                className="absolute inset-0"
                style={{background: "var(--hero-bg)"}}
                animate={{
                    opacity: [0.42, 0.88, 0.42],
                    scale: [1, 1.03, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:28px_28px]" />

            <motion.div
                className="absolute right-[-110px] top-[-150px] h-[430px] w-[430px] rounded-full border border-[var(--color-accent)]/25"
                animate={{rotate: 360}}
                transition={{duration: 62, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute right-[6%] top-[20%] h-[240px] w-[240px] rounded-full border border-[var(--color-brand-secondary)]/25"
                animate={{rotate: -360}}
                transition={{duration: 43, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute right-[15%] top-[38%] h-16 w-16 rounded-full bg-[var(--color-accent-soft)] shadow-[var(--shadow-glow)]"
                animate={{
                    scale: [1, 1.16, 1],
                    opacity: [0.55, 1, 0.55],
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
                    x: ["-40%", "40%", "-40%"],
                    opacity: [0.08, 0.58, 0.08],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="relative z-10 grid min-h-[300px] items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                    <p className="exo-label text-[10px] font-black uppercase tracking-[0.28em]">
                        {t.hero.eyebrow}
                    </p>

                    <h1 className="mt-4 max-w-[680px] text-[2rem] font-black uppercase leading-[0.96] tracking-[-0.05em] sm:text-[2.6rem] lg:text-[3.15rem]">
                        {t.hero.title}
                    </h1>

                    <p className="exo-muted mt-5 max-w-2xl text-sm leading-7">
                        {t.hero.description}
                    </p>
                </div>

                <div className="relative hidden min-h-[250px] lg:block">
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
                        animate={{scale: [1, 1.16, 1]}}
                        transition={{duration: 3, repeat: Infinity, ease: "easeInOut"}}
                    />

                    <HeroSignal icon={Orbit} label="Orbital Map" className="left-[7%] top-[22%]" />
                    <HeroSignal icon={Sparkles} label="Host Stars" className="right-[12%] top-[16%]" />
                    <HeroSignal icon={Activity} label="Live Archive" className="bottom-[12%] left-[28%]" />
                </div>
            </div>
        </motion.section>
    );
};

const HeroSignal = ({
                        icon: Icon,
                        label,
                        className,
                    }: {
    icon: typeof Orbit;
    label: string;
    className: string;
}) => (
    <motion.div
        className={`absolute rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-accent)] backdrop-blur-xl ${className}`}
        animate={{
            y: [0, -8, 0],
            opacity: [0.65, 1, 0.65],
        }}
        transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
        }}
    >
        <Icon className="mr-2 inline h-3.5 w-3.5" />
        {label}
    </motion.div>
);