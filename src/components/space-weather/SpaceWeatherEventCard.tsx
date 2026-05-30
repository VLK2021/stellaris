"use client";

import {motion} from "framer-motion";
import {ExternalLink, RadioTower} from "lucide-react";

import type {SpaceWeatherEvent} from "@/src/types/space-weather/spaceWeather.types";
import type {SpaceWeatherLocale} from "@/src/types/space-weather/spaceWeatherUi.types";

import {
    formatNumber,
    getEventTime,
    getEventTone,
    getToneClasses,
} from "@/src/helpers/space-weather/spaceWeatherUi.helpers";

type Props = {
    event: SpaceWeatherEvent;
    locale: SpaceWeatherLocale;
};

export const SpaceWeatherEventCard = ({event, locale}: Props) => {
    const tone = getEventTone(event.type);

    return (
        <motion.article
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            whileHover={{y: -5}}
            viewport={{once: true}}
            transition={{duration: 0.35}}
            className="group relative overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-xl"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(234,88,12,0.12),transparent_34%)]" />

            <motion.div
                className="absolute left-[-20%] top-8 h-[1px] w-[60%] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                animate={{x: ["0%", "220%"], opacity: [0, 0.55, 0]}}
                transition={{duration: 5.5, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="relative z-10">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <span className={`inline-flex rounded-full border px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] ${getToneClasses(tone)}`}>
                            {event.type}
                        </span>

                        <h3 className="mt-3 line-clamp-2 text-lg font-black tracking-[-0.04em] text-[var(--color-text)]">
                            {event.title}
                        </h3>

                        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                            {getEventTime(event) ?? "—"}
                        </p>
                    </div>

                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                        <RadioTower className="h-4 w-4" />
                    </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <Metric label={locale.classType} value={event.classType ?? "—"} />
                    <Metric label={locale.speed} value={event.speed ? `${formatNumber(event.speed)} km/s` : "—"} />
                    <Metric label={locale.kpIndex} value={event.kpIndex ? `Kp ${formatNumber(event.kpIndex, 1)}` : "—"} />
                    <Metric label={locale.halfAngle} value={event.halfAngle ? `${formatNumber(event.halfAngle)}°` : "—"} />
                </div>

                <div className="mt-4 grid gap-2 rounded-[1.1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-3 text-xs text-[var(--color-text-muted)]">
                    <p>{locale.sourceLocation}: {event.sourceLocation || "—"}</p>
                    <p>{locale.coordinates}: {event.latitude ?? "—"} / {event.longitude ?? "—"}</p>
                    <p>{locale.catalog}: {event.catalog || "—"}</p>
                </div>

                {!!event.instruments.length && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {event.instruments.slice(0, 4).map((instrument) => (
                            <span
                                key={instrument}
                                className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-3 py-1.5 text-[10px] font-black text-[var(--color-text-muted)]"
                            >
                                {instrument}
                            </span>
                        ))}
                    </div>
                )}

                {event.note && (
                    <p className="mt-4 line-clamp-3 text-xs leading-6 text-[var(--color-text-muted)]">
                        {event.note}
                    </p>
                )}

                {event.link && (
                    <a
                        href={event.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-2 text-[11px] font-black text-white transition hover:gap-3"
                    >
                        {locale.source}
                        <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                )}
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