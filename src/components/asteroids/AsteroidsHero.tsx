"use client";

import {motion} from "framer-motion";
import {Radar} from "lucide-react";

import type {AsteroidsLocale} from "@/src/types/asteroids/asteroidsUi.types";

type Props = {
    locale: AsteroidsLocale;
};

export const AsteroidsHero = ({locale}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-8 lg:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,var(--color-accent-soft),transparent_34%)]" />

            <motion.div
                className="absolute right-8 top-8 hidden h-32 w-32 rounded-full border border-[var(--color-border)] sm:block"
                animate={{rotate: 360}}
                transition={{duration: 28, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute right-16 top-16 hidden h-16 w-16 rounded-full border border-[var(--color-border-strong)] sm:block"
                animate={{scale: [1, 1.16, 1], opacity: [0.3, 0.8, 0.3]}}
                transition={{duration: 3, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="relative z-10 max-w-4xl">
                <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-accent-soft)] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                    <Radar className="h-3.5 w-3.5" />
                    {locale.badge}
                </p>

                <h1 className="mt-5 text-3xl font-black uppercase tracking-[-0.075em] text-[var(--color-text)] sm:text-5xl lg:text-[54px] lg:leading-[0.95]">
                    {locale.title}
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">
                    {locale.text}
                </p>
            </div>
        </section>
    );
};