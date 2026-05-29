"use client";

import {motion} from "framer-motion";
import {Orbit} from "lucide-react";

import type {AsteroidDetails} from "@/src/types/asteroids/asteroidDetails.types";
import type {AsteroidsLocale} from "@/src/types/asteroids/asteroidsUi.types";

type Props = {
    locale: AsteroidsLocale;
    details: AsteroidDetails;
};

export const AsteroidOrbitPanel = ({locale, details}: Props) => {
    const items = details.orbitParameters.slice(0, 12);

    return (
        <section className="rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-xl">
            <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    <Orbit className="h-4 w-4" />
                </div>

                <h2 className="text-lg font-black tracking-[-0.04em] text-[var(--color-text)]">
                    {locale.orbit}
                </h2>
            </div>

            {!items.length ? (
                <p className="mt-4 text-sm text-[var(--color-text-muted)]">
                    {locale.noData}
                </p>
            ) : (
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {items.map((item, index) => (
                        <motion.div
                            key={`${item.name}-${index}`}
                            initial={{opacity: 0, y: 14}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.35, delay: index * 0.025}}
                            className="rounded-[1.1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4"
                        >
                            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                                {item.name}
                            </p>

                            <p className="mt-2 text-sm font-black text-[var(--color-text)]">
                                {item.value ?? "—"}
                            </p>

                            <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-[var(--color-text-muted)]">
                                {item.units && <span>{locale.units}: {item.units}</span>}
                                {item.sigma && <span>{locale.sigma}: {item.sigma}</span>}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    );
};