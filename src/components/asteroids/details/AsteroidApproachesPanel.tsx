"use client";

import {motion} from "framer-motion";
import {Activity} from "lucide-react";

import type {AsteroidItem} from "@/src/types/asteroids/asteroids.types";
import type {AsteroidsLocale} from "@/src/types/asteroids/asteroidsUi.types";

import {
    getClosestEarthApproaches,
} from "@/src/helpers/asteroids/asteroidDetails.helpers";

import {
    formatKm,
    formatNumber,
} from "@/src/helpers/asteroids/asteroidsUi.helpers";

type Props = {
    locale: AsteroidsLocale;
    asteroid: AsteroidItem;
};

export const AsteroidApproachesPanel = ({locale, asteroid}: Props) => {
    const approaches = getClosestEarthApproaches(asteroid, 10);

    return (
        <section className="rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-xl">
            <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    <Activity className="h-4 w-4" />
                </div>

                <h2 className="text-lg font-black tracking-[-0.04em] text-[var(--color-text)]">
                    {locale.earthEncounters}
                </h2>
            </div>

            {!approaches.length ? (
                <p className="mt-4 text-sm text-[var(--color-text-muted)]">
                    {locale.noData}
                </p>
            ) : (
                <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                    {approaches.map((approach, index) => (
                        <motion.article
                            key={`${approach.fullDate}-${index}`}
                            initial={{opacity: 0, y: 16}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.35, delay: index * 0.035}}
                            className="relative overflow-hidden rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4"
                        >
                            <div className="absolute right-[-20px] top-[-20px] h-16 w-16 rounded-full bg-[var(--color-accent-soft)] blur-2xl" />

                            <div className="relative z-10">
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                                    {approach.date}
                                </p>

                                <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                                    {locale.distance}
                                </p>

                                <p className="text-sm font-black text-[var(--color-text)]">
                                    {formatKm(approach.missDistanceKm)}
                                </p>

                                <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                                    {locale.velocity}
                                </p>

                                <p className="text-sm font-black text-[var(--color-text)]">
                                    {formatNumber(approach.velocityKmH)} km/h
                                </p>
                            </div>
                        </motion.article>
                    ))}
                </div>
            )}
        </section>
    );
};