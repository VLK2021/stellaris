"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {ArrowRight, Database, Rocket} from "lucide-react";

import {useLanguage} from "@/src/context";
import {HeroOrbitVisual} from "./HeroOrbitVisual";

export const HeroSection = () => {
    const {locale} = useLanguage();

    return (
        <section className="relative overflow-hidden px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(139,92,246,0.16),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(236,72,153,0.10),transparent_34%)]" />

                <motion.div
                    className="absolute inset-0 opacity-25 sm:opacity-35"
                    animate={{backgroundPosition: ["0px 0px", "160px 120px"]}}
                    transition={{duration: 28, repeat: Infinity, ease: "linear"}}
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, rgba(248,250,252,0.55) 1px, transparent 1px)",
                        backgroundSize: "42px 42px",
                    }}
                />

                <motion.div
                    className="absolute left-1/2 top-1/2 hidden h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(56,189,248,0.10)] sm:block"
                    animate={{rotate: 360}}
                    transition={{duration: 90, repeat: Infinity, ease: "linear"}}
                />
            </div>

            <div className="relative grid min-h-[auto] items-center gap-8 lg:min-h-[calc(100vh-150px)] lg:grid-cols-[1fr_0.9fr] lg:gap-10">
                <motion.div
                    initial={{opacity: 0, y: 24}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.65, ease: "easeOut"}}
                    className="max-w-4xl pt-4 lg:pt-0"
                >
                    <motion.div
                        initial={{opacity: 0, y: 12}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.15}}
                        className="inline-flex max-w-full items-center gap-2 border border-[var(--color-border)] bg-[rgba(255,255,255,0.045)] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)] backdrop-blur-xl sm:gap-3 sm:px-4 sm:text-[11px] sm:tracking-[0.28em]"
                    >
                        <Database className="h-4 w-4 shrink-0" />
                        <span className="truncate">{locale.home.heroBadge}</span>
                    </motion.div>

                    <motion.h1
                        initial={{opacity: 0, y: 18}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.25}}
                        className="mt-5 max-w-5xl text-4xl font-black leading-[1] tracking-[-0.055em] text-[var(--color-text)] sm:mt-6 sm:text-5xl lg:text-6xl xl:text-7xl"
                    >
                        {locale.home.heroTitle}
                    </motion.h1>

                    <motion.p
                        initial={{opacity: 0, y: 18}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.35}}
                        className="mt-5 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)] sm:mt-6 sm:text-base"
                    >
                        {locale.home.heroText}
                    </motion.p>

                    <motion.div
                        initial={{opacity: 0, y: 18}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.45}}
                        className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row"
                    >
                        <Link
                            href="/explore"
                            className="group inline-flex items-center justify-center gap-3 rounded-full bg-[var(--color-text)] px-5 py-3 text-sm font-bold text-[var(--color-background)] transition hover:opacity-90 sm:px-6 sm:py-3.5"
                        >
                            <Rocket className="h-4 w-4" />
                            {locale.home.primaryAction}
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href="/datasets"
                            className="inline-flex items-center justify-center gap-3 rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.045)] px-5 py-3 text-sm font-bold text-[var(--color-text)] backdrop-blur-xl transition hover:border-[rgba(56,189,248,0.42)] hover:text-[var(--color-accent)] sm:px-6 sm:py-3.5"
                        >
                            {locale.home.secondaryAction}
                        </Link>
                    </motion.div>
                </motion.div>

                <HeroOrbitVisual />
            </div>
        </section>
    );
};