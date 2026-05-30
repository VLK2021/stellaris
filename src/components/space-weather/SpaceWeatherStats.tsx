"use client";

import {motion} from "framer-motion";
import {Activity, Flame, Gauge, RadioTower, Sun, Zap} from "lucide-react";

import type {SpaceWeatherStats as Stats} from "@/src/types/space-weather/spaceWeather.types";
import type {SpaceWeatherLocale} from "@/src/types/space-weather/spaceWeatherUi.types";

import {formatNumber} from "@/src/helpers/space-weather/spaceWeatherUi.helpers";

type Props = {
    locale: SpaceWeatherLocale;
    stats: Stats;
};

export const SpaceWeatherStats = ({locale, stats}: Props) => {
    const cards = [
        {
            label: locale.total,
            value: String(stats.total),
            meta: stats.latestEvent?.title ?? "—",
            icon: RadioTower,
        },
        {
            label: locale.flr,
            value: String(stats.flr),
            meta: stats.strongestFlare?.classType ?? "—",
            icon: Flame,
        },
        {
            label: locale.cme,
            value: String(stats.cme),
            meta: stats.fastestCme?.speed
                ? `${formatNumber(stats.fastestCme.speed)} km/s`
                : "—",
            icon: Sun,
        },
        {
            label: locale.gst,
            value: String(stats.gst),
            meta: stats.strongestStorm?.kpIndex
                ? `Kp ${formatNumber(stats.strongestStorm.kpIndex, 1)}`
                : "—",
            icon: Gauge,
        },
        {
            label: locale.sep,
            value: String(stats.sep),
            meta: locale.events,
            icon: Zap,
        },
        {
            label: locale.enlil,
            value: String(stats.enlil),
            meta: "WSA-Enlil",
            icon: Activity,
        },
    ];

    return (
        <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
            {cards.map((card, index) => {
                const Icon = card.icon;

                return (
                    <motion.article
                        key={card.label}
                        initial={{opacity: 0, y: 16}}
                        whileInView={{opacity: 1, y: 0}}
                        whileHover={{y: -5, scale: 1.01}}
                        viewport={{once: true}}
                        transition={{duration: 0.35, delay: index * 0.035}}
                        className="group relative overflow-hidden rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-xl"
                    >
                        <div className="absolute right-[-32px] top-[-32px] h-24 w-24 rounded-full bg-[var(--color-warning)]/10 blur-2xl transition group-hover:scale-125" />

                        <div className="relative z-10">
                            <div className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                                <Icon className="h-4 w-4" />
                            </div>

                            <p className="mt-3 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
                                {card.label}
                            </p>

                            <h3 className="mt-1 text-2xl font-black tracking-[-0.05em] text-[var(--color-text)]">
                                {card.value}
                            </h3>

                            <p className="mt-1 truncate text-xs text-[var(--color-text-muted)]">
                                {card.meta}
                            </p>
                        </div>
                    </motion.article>
                );
            })}
        </section>
    );
};