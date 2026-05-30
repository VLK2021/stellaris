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
            label: locale.flr,
            value: String(stats.flr),
            meta: stats.strongestFlare?.classType ?? "—",
            icon: Flame,
            gradient: "from-[var(--color-warning)]/20",
        },
        {
            label: locale.cme,
            value: String(stats.cme),
            meta: stats.fastestCme?.speed
                ? `${formatNumber(stats.fastestCme.speed)} km/s`
                : "—",
            icon: Sun,
            gradient: "from-[var(--color-error)]/18",
        },
        {
            label: locale.gst,
            value: String(stats.gst),
            meta: stats.strongestStorm?.kpIndex
                ? `Kp ${formatNumber(stats.strongestStorm.kpIndex, 1)}`
                : "—",
            icon: Gauge,
            gradient: "from-[var(--color-accent)]/18",
        },
        {
            label: locale.sep,
            value: String(stats.sep),
            meta: locale.events,
            icon: Zap,
            gradient: "from-[var(--color-warning)]/16",
        },
        {
            label: locale.total,
            value: String(stats.total),
            meta: stats.latestEvent?.type ?? "—",
            icon: RadioTower,
            gradient: "from-[var(--color-accent)]/16",
        },
        {
            label: locale.enlil,
            value: String(stats.enlil),
            meta: "WSA-Enlil",
            icon: Activity,
            gradient: "from-[var(--color-nebula)]/16",
        },
    ];

    return (
        <section className="mt-5 overflow-hidden rounded-[1.4rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] backdrop-blur-2xl">
            <div className="grid divide-y divide-[var(--color-border)] sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-6">
                {cards.map((card, index) => {
                    const Icon = card.icon;

                    return (
                        <motion.article
                            key={card.label}
                            initial={{opacity: 0, y: 12}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.32, delay: index * 0.035}}
                            className="group relative min-h-[118px] overflow-hidden p-4"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} via-transparent to-transparent opacity-80`} />
                            <div className="absolute right-[-42px] top-[-42px] h-28 w-28 rounded-full bg-[var(--color-accent-soft)] blur-2xl transition group-hover:scale-125" />

                            <div className="relative z-10 flex items-start gap-3">
                                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                                    <Icon className="h-4 w-4" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                                        {card.label}
                                    </p>

                                    <h3 className="mt-1 text-3xl font-black tracking-[-0.06em] text-[var(--color-text)]">
                                        {card.value}
                                    </h3>

                                    <p className="mt-1 truncate text-xs text-[var(--color-text-muted)]">
                                        {card.meta}
                                    </p>
                                </div>
                            </div>
                        </motion.article>
                    );
                })}
            </div>
        </section>
    );
};