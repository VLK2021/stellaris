"use client";

import {motion} from "framer-motion";
import {ExternalLink, ShieldAlert, ShieldCheck} from "lucide-react";

import type {AsteroidDetails} from "@/src/types/asteroids/asteroidDetails.types";
import type {AsteroidsLocale} from "@/src/types/asteroids/asteroidsUi.types";

import {AsteroidVisual} from "./AsteroidVisual";

type Props = {
    locale: AsteroidsLocale;
    details: AsteroidDetails;
};

export const AsteroidDetailsHero = ({locale, details}: Props) => {
    const {asteroid} = details;
    const hazardous = asteroid.isPotentiallyHazardous;

    return (
        <section className="relative overflow-hidden rounded-[1.9rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-7 lg:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_28%,var(--color-accent-soft),transparent_34%)]" />

            <div className="relative z-10 grid gap-6 xl:grid-cols-[1fr_420px] xl:items-center">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    <p className="w-fit rounded-full border border-[var(--color-border)] bg-[var(--color-accent-soft)] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                        NASA NEO DATABASE
                    </p>

                    <h1 className="mt-4 text-3xl font-black tracking-[-0.045em] text-[var(--color-text)] sm:text-4xl lg:text-[46px]">
                        {asteroid.name}
                    </h1>

                    <div className="mt-4 flex flex-wrap gap-2.5">
                        <Badge label={`JPL ID · ${asteroid.neoReferenceId}`} />

                        <span
                            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.16em] ${
                                hazardous
                                    ? "border-[var(--color-error)]/35 bg-[var(--color-error)]/10 text-[var(--color-error)]"
                                    : "border-[var(--color-success)]/35 bg-[var(--color-success)]/10 text-[var(--color-success)]"
                            }`}
                        >
                            {hazardous ? (
                                <ShieldAlert className="h-3.5 w-3.5" />
                            ) : (
                                <ShieldCheck className="h-3.5 w-3.5" />
                            )}
                            {hazardous ? locale.hazardous : locale.safe}
                        </span>
                    </div>

                    <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">
                        {locale.overview}
                    </p>

                    {asteroid.nasaJplUrl && (
                        <a
                            href={asteroid.nasaJplUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-xs font-black text-white transition hover:gap-4"
                        >
                            {locale.source}
                            <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                    )}
                </motion.div>

                <AsteroidVisual />
            </div>
        </section>
    );
};

const Badge = ({label}: {label: string}) => (
    <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
        {label}
    </span>
);