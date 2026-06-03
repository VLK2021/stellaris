"use client";

import {motion} from "framer-motion";

import type {ExoplanetPlanet} from "@/src/types/exoplanets/exoplanets.types";

import {ExoplanetRow} from "./ExoplanetRow";

type Props = {
    planet: ExoplanetPlanet;
    index: number;
};

export const ExoplanetCard = ({planet, index}: Props) => {
    return (
        <motion.article
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{
                duration: 0.35,
                delay: Math.min(index * 0.025, 0.2),
            }}
            className="relative min-h-[260px] overflow-hidden rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl transition hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
        >
            <div className="absolute inset-0 opacity-20" style={{background: "var(--hero-bg)"}} />

            <div className="relative z-10">
                <p className="exo-label text-[10px] font-black uppercase tracking-[0.18em]">
                    {planet.discoverymethod ?? "Unknown method"}
                </p>

                <h3 className="mt-2 text-2xl font-black">
                    {planet.pl_name ?? "Unknown planet"}
                </h3>

                <p className="exo-muted mt-1 text-sm">
                    Host star: {planet.hostname ?? "—"}
                </p>

                <div className="mt-5 grid gap-2 text-sm text-[var(--color-text-muted)]">
                    <ExoplanetRow label="Year" value={planet.disc_year} />

                    <ExoplanetRow
                        label="Distance"
                        value={
                            planet.sy_dist !== null
                                ? `${planet.sy_dist.toFixed(2)} pc`
                                : null
                        }
                    />

                    <ExoplanetRow
                        label="Radius"
                        value={
                            planet.pl_rade !== null
                                ? `${planet.pl_rade} R⊕`
                                : null
                        }
                    />

                    <ExoplanetRow
                        label="Mass"
                        value={
                            planet.pl_bmasse !== null
                                ? `${planet.pl_bmasse} M⊕`
                                : null
                        }
                    />

                    <ExoplanetRow
                        label="Orbit"
                        value={
                            planet.pl_orbper !== null
                                ? `${planet.pl_orbper} days`
                                : null
                        }
                    />

                    <ExoplanetRow
                        label="Temp"
                        value={
                            planet.pl_eqt !== null
                                ? `${planet.pl_eqt} K`
                                : null
                        }
                    />
                </div>
            </div>
        </motion.article>
    );
};