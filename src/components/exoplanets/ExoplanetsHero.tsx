"use client";

import {motion} from "framer-motion";
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
            className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-8 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:px-8 lg:px-10"
        >
            <motion.div
                className="absolute inset-0"
                style={{background: "var(--hero-bg)"}}
                animate={{
                    scale: [1, 1.04, 1],
                    opacity: [0.65, 0.95, 0.65],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:34px_34px]" />

            <motion.div
                className="absolute -right-20 top-[-90px] h-[330px] w-[330px] rounded-full border border-[var(--color-accent)]/35 bg-[var(--color-accent-soft)] shadow-[var(--shadow-glow)]"
                animate={{
                    rotate: 360,
                    scale: [1, 1.06, 1],
                }}
                transition={{
                    duration: 48,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            <motion.div
                className="absolute right-[12%] top-[34%] h-[170px] w-[170px] rounded-full border border-[var(--color-brand-secondary)]/35"
                animate={{rotate: -360}}
                transition={{
                    duration: 34,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            <motion.div
                className="absolute left-[-12%] bottom-[-45%] h-[360px] w-[360px] rounded-full bg-[var(--color-accent-soft)] blur-3xl"
                animate={{
                    x: [0, 45, 0],
                    y: [0, -25, 0],
                    opacity: [0.18, 0.45, 0.18],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute left-0 top-[62%] h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                animate={{
                    x: ["-35%", "35%", "-35%"],
                    opacity: [0.08, 0.38, 0.08],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="relative z-10 flex min-h-[300px] max-w-5xl flex-col justify-center">
                <p className="exo-label text-[10px] font-black uppercase tracking-[0.28em] sm:text-[11px]">
                    {t.hero.eyebrow}
                </p>

                <h1 className="mt-5 max-w-4xl text-[2.55rem] font-black uppercase leading-[0.92] tracking-[-0.075em] sm:text-[3.4rem] lg:text-[4.15rem]">
                    {t.hero.title}
                </h1>

                <p className="exo-muted mt-5 max-w-3xl text-sm leading-7 sm:text-[15px]">
                    {t.hero.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                    <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)] backdrop-blur-xl">
                        NASA TAP
                    </div>

                    <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)] backdrop-blur-xl">
                        Planetary Systems
                    </div>

                    <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)] backdrop-blur-xl">
                        Exoplanet Archive
                    </div>
                </div>
            </div>
        </motion.section>
    );
};