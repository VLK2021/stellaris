"use client";

import {motion} from "framer-motion";
import {
    Activity,
    ExternalLink,
    Flame,
    Gauge,
    RadioTower,
    Sun,
    Zap,
} from "lucide-react";

import type {SpaceWeatherEventDetails} from "@/src/types/space-weather/spaceWeatherEventDetails.types";
import type {SpaceWeatherLocale} from "@/src/types/space-weather/spaceWeatherUi.types";

import {formatNumber} from "@/src/helpers/space-weather/spaceWeatherUi.helpers";

type Props = {
    locale: SpaceWeatherLocale;
    details: SpaceWeatherEventDetails;
};

export const SpaceWeatherEventDetailsHero = ({locale, details}: Props) => {
    const {event} = details;

    return (
        <section className="relative min-h-[620px] overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] backdrop-blur-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(234,88,12,0.26),transparent_24%),radial-gradient(circle_at_78%_28%,var(--color-accent-soft),transparent_30%),radial-gradient(circle_at_18%_76%,rgba(190,24,93,0.14),transparent_34%)]" />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.035)_1px,transparent_1px)] bg-[size:70px_70px] opacity-60" />

            <motion.div
                className="absolute left-[-30%] top-[46%] h-[2px] w-[82%] rotate-[-13deg] bg-gradient-to-r from-transparent via-[var(--color-warning)] to-transparent blur-[1px]"
                animate={{x: ["0%", "180%"], opacity: [0, 0.8, 0]}}
                transition={{duration: 5.5, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute left-1/2 top-[47%] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-accent)]/20"
                animate={{rotate: 360}}
                transition={{duration: 32, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute left-1/2 top-[47%] h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-warning)]/20"
                animate={{rotate: -360}}
                transition={{duration: 24, repeat: Infinity, ease: "linear"}}
            />

            <div className="absolute left-1/2 top-[47%] h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--color-warning),rgba(234,88,12,0.34)_48%,rgba(190,24,93,0.14)_68%,transparent_76%)] shadow-[0_0_110px_rgba(234,88,12,0.42)]" />

            <div className="absolute left-1/2 top-[47%] z-10 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-warning)]">
                    {event.type}
                </p>

                <h1 className="mt-3 max-w-[520px] text-2xl font-black uppercase tracking-[-0.04em] text-[var(--color-text)] sm:text-4xl">
                    {event.title}
                </h1>

                <p className="mx-auto mt-3 max-w-[520px] text-xs leading-6 text-[var(--color-text-muted)]">
                    {event.note || "NASA DONKI event dossier generated from real space weather data."}
                </p>
            </div>

            <HudMetric
                className="left-6 top-8"
                icon={Gauge}
                label={locale.speed}
                value={event.speed ? `${formatNumber(event.speed)} km/s` : "—"}
            />

            <HudMetric
                className="right-6 top-8"
                icon={Activity}
                label={locale.halfAngle}
                value={event.halfAngle ? `${formatNumber(event.halfAngle)}°` : "—"}
            />

            <HudMetric
                className="left-8 bottom-24"
                icon={Flame}
                label={locale.classType}
                value={event.classType ?? "—"}
            />

            <HudMetric
                className="right-8 bottom-24"
                icon={Zap}
                label={locale.kpIndex}
                value={event.kpIndex ? `Kp ${formatNumber(event.kpIndex, 1)}` : "—"}
            />

            <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-wrap items-center justify-between gap-3 rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-3 backdrop-blur-xl">
                <div className="flex flex-wrap gap-4 text-[11px] text-[var(--color-text-muted)]">
                    <span>{locale.sourceLocation}: {event.sourceLocation || "—"}</span>
                    <span>{locale.coordinates}: {event.latitude ?? "—"} / {event.longitude ?? "—"}</span>
                    <span>{locale.catalog}: {event.catalog || "—"}</span>
                    <span>{locale.startTime}: {event.startTime ?? "—"}</span>
                </div>

                {event.link && (
                    <a
                        href={event.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-2 text-[10px] font-black text-white transition hover:gap-3"
                    >
                        {locale.source}
                        <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                )}
            </div>

            <div className="absolute left-6 top-1/2 hidden h-px w-[28%] bg-gradient-to-r from-[var(--color-accent)] to-transparent lg:block" />
            <div className="absolute right-6 top-1/2 hidden h-px w-[28%] bg-gradient-to-l from-[var(--color-accent)] to-transparent lg:block" />

            <div className="absolute left-6 top-6 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)] backdrop-blur-xl">
                NASA DONKI
            </div>

            <div className="absolute right-6 top-[50%] hidden rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] backdrop-blur-xl lg:block">
                Real Payload
            </div>
        </section>
    );
};

const HudMetric = ({
                       icon: Icon,
                       label,
                       value,
                       className,
                   }: {
    icon: typeof RadioTower;
    label: string;
    value: string;
    className: string;
}) => (
    <motion.div
        initial={{opacity: 0, y: 16}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.45}}
        className={`absolute z-20 w-[210px] rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 shadow-[var(--shadow-card)] backdrop-blur-xl ${className}`}
    >
        <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                <Icon className="h-4 w-4" />
            </div>

            <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                    {label}
                </p>

                <p className="mt-1 text-lg font-black text-[var(--color-text)]">
                    {value}
                </p>
            </div>
        </div>
    </motion.div>
);