"use client";

import {motion} from "framer-motion";
import {Database, Orbit, Search, Sparkles} from "lucide-react";

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
            className="relative min-h-[420px] overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-8"
        >
            <motion.div
                className="absolute inset-0"
                style={{background: "var(--hero-bg)"}}
                animate={{opacity: [0.7, 1, 0.7]}}
                transition={{duration: 8, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute right-[-120px] top-[-160px] h-[520px] w-[520px] rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)]"
                animate={{rotate: 360, scale: [1, 1.05, 1]}}
                transition={{duration: 60, repeat: Infinity, ease: "linear"}}
            />

            <div className="relative z-10 flex min-h-[360px] flex-col justify-between">
                <div>
                    <p className="exo-label text-[11px] font-black uppercase tracking-[0.24em]">
                        {t.hero.eyebrow}
                    </p>

                    <h1 className="mt-5 max-w-5xl text-5xl font-black uppercase tracking-[-0.07em] sm:text-6xl">
                        {t.hero.title}
                    </h1>

                    <p className="exo-muted mt-5 max-w-4xl text-sm leading-7 sm:text-base">
                        {t.hero.description}
                    </p>
                </div>

                <div className="mt-8 grid gap-3 md:grid-cols-4">
                    <Info icon={Database} label={t.hero.source} value="NASA TAP" />
                    <Info icon={Orbit} label={t.hero.dataset} value="Planetary Systems" />
                    <Info icon={Search} label={t.hero.mode} value="Search / Filter" />
                    <Info icon={Sparkles} label={t.hero.data} value="Confirmed planets" />
                </div>
            </div>
        </motion.section>
    );
};

const Info = ({
                  icon: Icon,
                  label,
                  value,
              }: {
    icon: typeof Database;
    label: string;
    value: string;
}) => (
    <div className="rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl">
        <Icon className="h-4 w-4 text-[var(--color-accent)]" />

        <p className="exo-muted mt-3 text-[10px] font-black uppercase tracking-[0.18em]">
            {label}
        </p>

        <p className="mt-1 text-sm font-bold text-[var(--color-text)]">
            {value}
        </p>
    </div>
);