"use client";

import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {motion} from "framer-motion";

import {useLanguage} from "@/src/context";

const visualMap = {
    earth: "bg-[radial-gradient(circle_at_35%_28%,#eff6ff,#2563eb_35%,#0f766e_54%,#020617_84%)]",
    mars: "bg-[radial-gradient(circle_at_35%_28%,#fed7aa,#c2410c_48%,#431407_86%)]",
    sun: "bg-[radial-gradient(circle_at_35%_28%,#fff7ad,#fb923c_42%,#7c2d12_82%)]",
};

export const SpaceSignalsPanel = () => {
    const {locale} = useLanguage();

    const cards = [
        {
            title: locale.spaceExperience.signals.earthTitle,
            text: locale.spaceExperience.signals.earthText,
            href: "/earth",
            visual: visualMap.earth,
        },
        {
            title: locale.spaceExperience.signals.marsTitle,
            text: locale.spaceExperience.signals.marsText,
            href: "/mars",
            visual: visualMap.mars,
        },
        {
            title: locale.spaceExperience.signals.weatherTitle,
            text: locale.spaceExperience.signals.weatherText,
            href: "/space-weather",
            visual: visualMap.sun,
        },
    ];

    return (
        <motion.aside
            initial={{opacity: 0, x: 28}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.65, delay: 0.25}}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-glass)] p-4 shadow-[var(--shadow-card)] backdrop-blur-2xl"
        >
            <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-base font-bold text-[var(--color-text)]">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-success)] shadow-[0_0_16px_var(--color-success)]" />
                    {locale.spaceExperience.liveSignals}
                </h2>

                <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1 text-xs text-[var(--color-text-muted)]">
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
                        className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-glass-strong)] p-4 transition hover:border-[var(--color-border-strong)]"
                    >
                        <div className="relative z-10 max-w-[70%]">
                            <h3 className="text-lg font-black text-[var(--color-text)]">
                                {card.title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                                {card.text}
                            </p>

                            <Link
                                href={card.href}
                                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-text)] transition hover:text-[var(--color-accent)]"
                            >
                                {locale.spaceExperience.viewModule}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className={`absolute right-4 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full ${card.visual} shadow-[0_0_50px_rgba(56,189,248,0.32)]`} />
                    </motion.article>
                ))}
            </div>
        </motion.aside>
    );
};