"use client";

import {motion} from "framer-motion";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

type Props = {
    t: ExoplanetsLocale["methods"];
    total: number;
    page: number;
    totalPages: number;
};

export const ExoplanetsMethodsHero = ({t, total, page, totalPages}: Props) => {
    return (
        <motion.section
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3}}
            className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)]"
        >
            <div className="absolute inset-0 opacity-25" style={{background: "var(--hero-bg)"}} />
            <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:30px_30px]" />

            <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                    {t.eyebrow}
                </p>

                <h1 className="mt-3 max-w-4xl bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-3xl font-black uppercase tracking-[-0.05em] text-transparent sm:text-4xl">
                    {t.title}
                </h1>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-text-muted)]">
                    {t.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                    <HeroBadge label={`${t.total}: ${total}`} />
                    <HeroBadge label={`${t.page} ${page}/${totalPages}`} />
                </div>
            </div>
        </motion.section>
    );
};

const HeroBadge = ({label}: {label: string}) => (
    <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
        {label}
    </span>
);