"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {ArrowRight, Database, Rocket} from "lucide-react";

import {useLanguage} from "@/src/context";
import {HeroOrbitVisual} from "./HeroOrbitVisual";

export const HeroSection = () => {
    const {locale} = useLanguage();

    return (
        <section className="relative min-h-[calc(100vh-80px)] overflow-hidden px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-8 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[rgba(56,189,248,0.10)] blur-3xl" />
                <div className="absolute right-0 top-20 h-[420px] w-[420px] rounded-full bg-[rgba(139,92,246,0.14)] blur-3xl" />
                <div className="absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-[rgba(236,72,153,0.10)] blur-3xl" />
            </div>

            <div className="relative grid min-h-[calc(100vh-180px)] items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
                <motion.div
                    initial={{opacity: 0, y: 28}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.7, ease: "easeOut"}}
                    className="max-w-4xl"
                >
                    <div className="inline-flex items-center gap-3 border border-[var(--color-border)] bg-[rgba(255,255,255,0.045)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)] backdrop-blur-xl">
                        <Database className="h-4 w-4" />
                        {locale.home.heroBadge}
                    </div>

                    <h1 className="mt-8 max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl lg:text-7xl xl:text-8xl">
                        {locale.home.heroTitle}
                    </h1>

                    <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--color-text-muted)] sm:text-lg">
                        {locale.home.heroText}
                    </p>

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/explore"
                            className="group inline-flex items-center justify-center gap-3 rounded-full bg-[var(--color-text)] px-6 py-4 text-sm font-bold text-[var(--color-background)] transition hover:opacity-90"
                        >
                            <Rocket className="h-4 w-4" />
                            {locale.home.primaryAction}
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href="/datasets"
                            className="inline-flex items-center justify-center gap-3 rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.045)] px-6 py-4 text-sm font-bold text-[var(--color-text)] backdrop-blur-xl transition hover:border-[rgba(56,189,248,0.42)] hover:text-[var(--color-accent)]"
                        >
                            {locale.home.secondaryAction}
                        </Link>
                    </div>
                </motion.div>

                <HeroOrbitVisual />
            </div>
        </section>
    );
};