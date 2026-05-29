"use client";

import {motion} from "framer-motion";
import {Gauge, Ruler, Sparkles} from "lucide-react";

import type {AsteroidItem} from "@/src/types/asteroids/asteroids.types";
import type {AsteroidsLocale} from "@/src/types/asteroids/asteroidsUi.types";

import {formatNumber} from "@/src/helpers/asteroids/asteroidsUi.helpers";

type Props = {
    locale: AsteroidsLocale;
    asteroid: AsteroidItem;
};

export const AsteroidMetricsPanel = ({locale, asteroid}: Props) => {
    const metrics = [
        {
            label: locale.minDiameter,
            value: `${formatNumber(asteroid.estimatedDiameter.minKm, 4)} km`,
            icon: Ruler,
        },
        {
            label: locale.maxDiameter,
            value: `${formatNumber(asteroid.estimatedDiameter.maxKm, 4)} km`,
            icon: Ruler,
        },
        {
            label: locale.avgDiameter,
            value: `${formatNumber(asteroid.estimatedDiameter.avgKm, 4)} km`,
            icon: Gauge,
        },
        {
            label: locale.magnitude,
            value: formatNumber(asteroid.absoluteMagnitudeH, 2),
            icon: Sparkles,
        },
    ];

    return (
        <section className="rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-xl">
            <h2 className="text-lg font-black tracking-[-0.04em] text-[var(--color-text)]">
                {locale.physical}
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {metrics.map((metric, index) => {
                    const Icon = metric.icon;

                    return (
                        <motion.div
                            key={metric.label}
                            initial={{opacity: 0, y: 14}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.35, delay: index * 0.04}}
                            className="rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                                    <Icon className="h-4 w-4" />
                                </div>

                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
                                        {metric.label}
                                    </p>
                                    <p className="mt-1 text-base font-black text-[var(--color-text)]">
                                        {metric.value}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};