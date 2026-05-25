"use client";

import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {motion} from "framer-motion";

import {useLanguage} from "@/src/context";

const visuals = {
    earth:
        "bg-[radial-gradient(circle_at_32%_26%,#eff6ff,#60a5fa_22%,#2563eb_40%,#0f766e_58%,#020617_90%)]",
    mars:
        "bg-[radial-gradient(circle_at_32%_26%,#fed7aa,#ea580c_44%,#7c2d12_76%,#2b0d05_100%)]",
    sun:
        "bg-[radial-gradient(circle_at_35%_30%,#fff7ad,#fb923c_42%,#b45309_72%,#431407_100%)]",
};

export const SpaceSignalsPanel = () => {
    const {locale} = useLanguage();

    const cards = [
        {
            title: locale.spaceExperience.signals.earthTitle,
            text: locale.spaceExperience.signals.earthText,
            href: "/earth",
            visual: visuals.earth,
            glow: "var(--color-accent)",
        },
        {
            title: locale.spaceExperience.signals.marsTitle,
            text: locale.spaceExperience.signals.marsText,
            href: "/mars",
            visual: visuals.mars,
            glow: "var(--color-warning)",
        },
        {
            title: locale.spaceExperience.signals.weatherTitle,
            text: locale.spaceExperience.signals.weatherText,
            href: "/space-weather",
            visual: visuals.sun,
            glow: "var(--color-success)",
        },
    ];

    return (
        <motion.aside
            initial={{opacity: 0, x: 28}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.65, delay: 0.25}}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-glass)] p-4 shadow-[var(--shadow-card)] backdrop-blur-2xl"
        >
            <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 text-base font-black sm:text-lg">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-success)] shadow-[0_0_14px_var(--color-success)]" />

                    <span className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-success)] bg-clip-text text-transparent">
                        {locale.spaceExperience.liveSignals}
                    </span>
                </h2>

                <span className="shrink-0 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1 text-xs font-medium text-[var(--color-text-muted)]">
                    <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
                    {locale.spaceExperience.live}
                </span>
            </div>

            <div className="grid gap-3">
                {cards.map((card, index) => (
                    <motion.article
                        key={card.href}
                        initial={{opacity: 0, y: 16}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{delay: index * 0.08}}
                        className="group relative min-h-[118px] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-glass-strong)] p-4 transition hover:border-[var(--color-border-strong)] sm:min-h-[128px] sm:p-5"
                    >
                        <div
                            className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-0 blur-3xl transition duration-300 group-hover:opacity-25"
                            style={{background: card.glow}}
                        />

                        <div className="relative z-10 max-w-[68%]">
                            <h3 className="text-lg font-black leading-tight sm:text-xl">
                                <span className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-text)] to-[var(--color-accent)] bg-clip-text text-transparent">
                                    {card.title}
                                </span>
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                                {card.text}
                            </p>

                            <Link
                                href={card.href}
                                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-text)] transition hover:text-[var(--color-accent)]"
                            >
                                {locale.spaceExperience.viewModule}
                                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                            </Link>
                        </div>

                        <div className="absolute right-4 top-1/2 grid h-[86px] w-[86px] -translate-y-1/2 place-items-center sm:h-[96px] sm:w-[96px]">
                            <div
                                className={`relative h-[78px] w-[78px] rounded-full sm:h-[88px] sm:w-[88px] ${card.visual}`}
                                style={{
                                    boxShadow: `0 0 30px ${card.glow}`,
                                }}
                            >
                                <div className="absolute inset-0 rounded-full bg-[linear-gradient(120deg,rgba(255,255,255,0.42),transparent_38%,rgba(0,0,0,0.46)_82%)]" />
                                <div className="absolute inset-[-4px] rounded-full border border-[var(--color-border)]" />
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </motion.aside>
    );
};