"use client";

import {motion} from "framer-motion";
import {Database, ShieldAlert, ShieldCheck} from "lucide-react";

import type {AsteroidDetails} from "@/src/types/asteroids/asteroidDetails.types";
import type {AsteroidsLocale} from "@/src/types/asteroids/asteroidsUi.types";

type Props = {
    locale: AsteroidsLocale;
    details: AsteroidDetails;
};

export const AsteroidRiskPanel = ({locale, details}: Props) => {
    const {asteroid} = details;

    const rows = [
        {
            label: locale.hazardStatus,
            value: asteroid.isPotentiallyHazardous ? locale.yes : locale.no,
            active: asteroid.isPotentiallyHazardous,
            icon: asteroid.isPotentiallyHazardous ? ShieldAlert : ShieldCheck,
        },
        {
            label: locale.sentryStatus,
            value: asteroid.isSentryObject ? locale.yes : locale.no,
            active: asteroid.isSentryObject,
            icon: asteroid.isSentryObject ? ShieldAlert : ShieldCheck,
        },
        {
            label: locale.sbdbStatus,
            value: details.sbdbAvailable ? locale.available : locale.unavailable,
            active: details.sbdbAvailable,
            icon: Database,
        },
    ];

    return (
        <section className="relative overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-xl">
            <div className="absolute right-[-60px] top-[-60px] h-40 w-40 rounded-full bg-[var(--color-accent-soft)] blur-3xl" />

            <h2 className="relative z-10 text-lg font-black tracking-[-0.04em] text-[var(--color-text)]">
                {locale.risk}
            </h2>

            <div className="relative z-10 mt-4 grid gap-3">
                {rows.map((row, index) => {
                    const Icon = row.icon;

                    return (
                        <motion.div
                            key={row.label}
                            initial={{opacity: 0, x: 18}}
                            whileInView={{opacity: 1, x: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.35, delay: index * 0.05}}
                            className="flex items-center justify-between gap-4 rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`grid h-9 w-9 place-items-center rounded-full ${
                                        row.active
                                            ? "bg-[var(--color-error)]/10 text-[var(--color-error)]"
                                            : "bg-[var(--color-success)]/10 text-[var(--color-success)]"
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                </div>

                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                                    {row.label}
                                </p>
                            </div>

                            <p className="text-sm font-black text-[var(--color-text)]">
                                {row.value}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};