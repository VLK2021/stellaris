"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {
    ExternalLink,
    Eye,
    Flame,
    Gauge,
    RadioTower,
    Satellite,
    Sun,
    Waves,
    Zap,
} from "lucide-react";

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
    index?: number;
    startDate: string;
    endDate: string;
};

const getEventIcon = (type: SpaceWeatherEvent["type"]) => {
    if (type === "FLR") return Flame;
    if (type === "CME" || type === "CME_ANALYSIS") return Sun;
    if (type === "GST") return Gauge;
    if (type === "SEP") return Zap;
    if (type === "IPS") return Waves;
    if (type === "ENLIL") return Satellite;

    return RadioTower;
};

export const SpaceWeatherEventCard = ({
                                          event,
                                          locale,
                                          index = 0,
                                          startDate,
                                          endDate,
                                      }: Props) => {
    const tone = getEventTone(event.type);
    const Icon = getEventIcon(event.type);

    const detailsHref = {
        pathname: `/space-weather/${encodeURIComponent(event.id)}`,
        query: {
            type: event.type,
            startDate,
            endDate,
        },
    };

    return (
        <motion.article
            initial={{opacity: 0, x: -14}}
            whileInView={{opacity: 1, x: 0}}
            whileHover={{x: 4}}
            viewport={{once: true}}
            transition={{duration: 0.32, delay: Math.min(index * 0.02, 0.22)}}
            className="relative grid gap-3 sm:grid-cols-[28px_1fr]"
        >
            <div className="relative hidden sm:block">
                <div className="absolute left-0 top-5 h-7 w-7 rounded-full border border-[var(--color-border)] bg-[var(--color-card-solid)]" />
                <div className="absolute left-[8px] top-[28px] h-3 w-3 rounded-full bg-[var(--color-accent)] shadow-[0_0_18px_var(--color-accent)]" />
            </div>

            <div className="group relative overflow-hidden rounded-[1.3rem] border border-[var(--color-border)] bg-[linear-gradient(135deg,var(--color-glass),rgba(15,23,42,0.12))] p-4 backdrop-blur-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_16%,rgba(234,88,12,0.11),transparent_30%)]" />

                <div className="relative z-10 grid gap-4 lg:grid-cols-[1fr_310px]">
                    <div className="min-w-0">
                        <div className="flex items-start gap-3">
                            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                                <Icon className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                                <span className={`inline-flex rounded-full border px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] ${getToneClasses(tone)}`}>
                                    {event.type}
                                </span>

                                <h3 className="mt-2 line-clamp-1 text-base font-black tracking-[-0.035em] text-[var(--color-text)]">
                                    {event.title}
                                </h3>

                                <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                    {getEventTime(event) ?? "—"}
                                </p>
                            </div>
                        </div>

                        {event.note && (
                            <p className="mt-3 line-clamp-2 text-xs leading-5 text-[var(--color-text-muted)]">
                                {event.note}
                            </p>
                        )}

                        {!!event.instruments.length && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {event.instruments.slice(0, 3).map((instrument) => (
                                    <span
                                        key={instrument}
                                        className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-2.5 py-1 text-[9px] font-black text-[var(--color-text-muted)]"
                                    >
                                        {instrument}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                        <Metric label={locale.classType} value={event.classType ?? "—"} />
                        <Metric label={locale.speed} value={event.speed ? `${formatNumber(event.speed)} km/s` : "—"} />
                        <Metric label={locale.kpIndex} value={event.kpIndex ? `Kp ${formatNumber(event.kpIndex, 1)}` : "—"} />
                        <Metric label={locale.halfAngle} value={event.halfAngle ? `${formatNumber(event.halfAngle)}°` : "—"} />
                    </div>
                </div>

                <div className="relative z-10 mt-3 flex flex-wrap items-center justify-between gap-3 rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-3 text-[11px] text-[var(--color-text-muted)]">
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                        <span>{locale.sourceLocation}: {event.sourceLocation || "—"}</span>
                        <span>{locale.coordinates}: {event.latitude ?? "—"} / {event.longitude ?? "—"}</span>
                        <span>{locale.catalog}: {event.catalog || "—"}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Link
                            href={detailsHref}
                            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] px-3.5 py-2 text-[10px] font-black text-[var(--color-accent)] transition hover:gap-3"
                        >
                            Details
                            <Eye className="h-3.5 w-3.5" />
                        </Link>

                        {event.link && (
                            <a
                                href={event.link}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-3.5 py-2 text-[10px] font-black text-white transition hover:gap-3"
                            >
                                {locale.source}
                                <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

const Metric = ({label, value}: {label: string; value: string}) => (
    <div className="rounded-[0.9rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-2.5">
        <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            {label}
        </p>

        <p className="mt-1 text-xs font-black text-[var(--color-text)]">
            {value}
        </p>
    </div>
);