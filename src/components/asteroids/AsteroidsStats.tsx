"use client";

import {motion} from "framer-motion";
import {Activity, Gauge, Radar, ShieldAlert} from "lucide-react";

import type {AsteroidsFeedStats} from "@/src/types/asteroids/asteroids.types";
import type {AsteroidsLocale} from "@/src/types/asteroids/asteroidsUi.types";

import {
    formatKm,
    formatNumber,
    getAsteroidDistance,
    getAsteroidVelocity,
} from "@/src/helpers/asteroids/asteroidsUi.helpers";

type Props = {
    locale: AsteroidsLocale;
    stats: AsteroidsFeedStats;
};

export const AsteroidsStats = ({locale, stats}: Props) => {
    const cards = [
        {label: locale.total, value: String(stats.total), icon: Radar, tone: "accent"},
        {label: locale.hazardousCount, value: String(stats.hazardous), icon: ShieldAlert, tone: "danger"},
        {
            label: locale.closestObject,
            value: stats.closest?.name ?? "—",
            meta: formatKm(stats.closest ? getAsteroidDistance(stats.closest) : null),
            icon: Activity,
            tone: "accent",
        },
        {
            label: locale.fastestObject,
            value: stats.fastest?.name ?? "—",
            meta: `${formatNumber(stats.fastest ? getAsteroidVelocity(stats.fastest) : null)} km/h`,
            icon: Gauge,
            tone: "warning",
        },
    ] as const;

    return (
        <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card, index) => {
                const Icon = card.icon;

                return (
                    <motion.article
                        key={card.label}
                        initial={{opacity: 0, y: 18}}
                        whileInView={{opacity: 1, y: 0}}
                        whileHover={{y: -5, scale: 1.01}}
                        viewport={{once: true}}
                        transition={{duration: 0.42, delay: index * 0.05}}
                        className="group relative overflow-hidden rounded-[1.45rem] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-xl"
                    >
                        <div className="absolute right-[-28px] top-[-28px] h-24 w-24 rounded-full bg-[var(--color-accent-soft)] blur-2xl transition group-hover:scale-125" />
                        <motion.div
                            className="absolute bottom-3 right-3 h-12 w-12 rounded-full border border-[var(--color-border)] opacity-40"
                            animate={{rotate: 360}}
                            transition={{duration: 18, repeat: Infinity, ease: "linear"}}
                        />

                        <div className="relative z-10 flex items-center gap-3">
                            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                                <Icon className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
                                    {card.label}
                                </p>

                                <h3 className="mt-1 truncate text-lg font-black tracking-[-0.04em] text-[var(--color-text)]">
                                    {card.value}
                                </h3>

                                {"meta" in card && card.meta && (
                                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                        {card.meta}
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.article>
                );
            })}
        </section>
    );
};