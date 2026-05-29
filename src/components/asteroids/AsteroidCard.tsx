"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {ExternalLink, Orbit, ShieldAlert, ShieldCheck} from "lucide-react";

import type {AsteroidItem} from "@/src/types/asteroids/asteroids.types";
import type {AsteroidsLocale} from "@/src/types/asteroids/asteroidsUi.types";

import {
    formatKm,
    formatNumber,
    getAsteroidDistance,
    getAsteroidVelocity,
    getPrimaryApproach,
} from "@/src/helpers/asteroids/asteroidsUi.helpers";

type Props = {
    item: AsteroidItem;
    locale: AsteroidsLocale;
};

export const AsteroidCard = ({item, locale}: Props) => {
    const approach = getPrimaryApproach(item);
    const isHazardous = item.isPotentiallyHazardous;

    return (
        <motion.article
            initial={{opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            whileHover={{y: -6}}
            viewport={{once: true}}
            transition={{duration: 0.4}}
            className={`group relative overflow-hidden rounded-[1.55rem] border bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-xl ${
                isHazardous
                    ? "border-[var(--color-error)]/35"
                    : "border-[var(--color-border)]"
            }`}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,var(--color-accent-soft),transparent_34%)] opacity-80" />

            {isHazardous && (
                <motion.div
                    className="absolute inset-0 border border-[var(--color-error)]/30"
                    animate={{opacity: [0.15, 0.45, 0.15]}}
                    transition={{duration: 2.4, repeat: Infinity, ease: "easeInOut"}}
                />
            )}

            <motion.div
                className="absolute right-[-44px] top-[-44px] h-32 w-32 rounded-full border border-[var(--color-border)] opacity-45"
                animate={{rotate: 360}}
                transition={{duration: 22, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute right-7 top-7 h-2.5 w-2.5 rounded-full bg-[var(--color-warning)] shadow-[0_0_18px_var(--color-warning)]"
                animate={{scale: [1, 1.7, 1], opacity: [0.5, 1, 0.5]}}
                transition={{duration: 2.2, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="relative z-10">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                            JPL ID · {item.neoReferenceId}
                        </p>

                        <h3 className="mt-2 line-clamp-2 text-xl font-black tracking-[-0.05em] text-[var(--color-text)]">
                            {item.name}
                        </h3>
                    </div>

                    <div
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border ${
                            isHazardous
                                ? "border-[var(--color-error)]/35 bg-[var(--color-error)]/10 text-[var(--color-error)]"
                                : "border-[var(--color-success)]/35 bg-[var(--color-success)]/10 text-[var(--color-success)]"
                        }`}
                    >
                        {isHazardous ? (
                            <ShieldAlert className="h-4 w-4" />
                        ) : (
                            <ShieldCheck className="h-4 w-4" />
                        )}
                    </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <Metric label={locale.distance} value={formatKm(getAsteroidDistance(item))} />
                    <Metric label={locale.velocity} value={`${formatNumber(getAsteroidVelocity(item))} km/h`} />
                    <Metric label={locale.diameter} value={`${formatNumber(item.estimatedDiameter.avgKm, 3)} km`} />
                    <Metric label={locale.magnitude} value={formatNumber(item.absoluteMagnitudeH, 2)} />
                </div>

                <div className="mt-4 rounded-[1.1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-3">
                    <div className="flex items-center gap-2">
                        <Orbit className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
                            {approach?.fullDate || approach?.date || "—"}
                        </p>
                    </div>

                    <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                        {locale.orbitingBody}: {approach?.orbitingBody || "—"}
                    </p>

                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        {locale.sentry}: {item.isSentryObject ? "Yes" : "No"}
                    </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2.5">
                    <Link
                        href={`/asteroids/${item.id}`}
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-2 text-[11px] font-black text-white transition hover:gap-3"
                    >
                        {locale.details}
                    </Link>

                    {item.nasaJplUrl && (
                        <a
                            href={item.nasaJplUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-[11px] font-black text-[var(--color-text-muted)] transition hover:border-[var(--color-border-strong)]"
                        >
                            {locale.source}
                            <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
};

const Metric = ({label, value}: {label: string; value: string}) => (
    <div className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-3">
        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            {label}
        </p>

        <p className="mt-1 text-sm font-black text-[var(--color-text)]">
            {value}
        </p>
    </div>
);