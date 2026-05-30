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
        <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-6 lg:p-7">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_46%,rgba(234,88,12,0.24),transparent_34%),radial-gradient(circle_at_88%_35%,var(--color-accent-soft),transparent_34%)]" />

            <motion.div
                className="absolute left-[-20%] top-[42%] h-[2px] w-[70%] rotate-[-13deg] bg-gradient-to-r from-transparent via-[var(--color-warning)] to-transparent"
                animate={{x: ["-10%", "130%"], opacity: [0, 0.72, 0]}}
                transition={{duration: 6.5, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="relative z-10 grid gap-5 xl:grid-cols-[1fr_0.95fr]">
                <div className="grid gap-5 md:grid-cols-[250px_1fr]">
                    <div className="relative min-h-[210px] overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[radial-gradient(circle_at_38%_48%,rgba(251,146,60,0.94),rgba(234,88,12,0.44)_34%,rgba(190,24,93,0.14)_58%,transparent_76%)] shadow-[0_0_80px_rgba(234,88,12,0.18)]">
                        <motion.div
                            className="absolute left-[34%] top-[45%] h-[2px] w-[220px] rotate-[-12deg] bg-gradient-to-r from-[var(--color-warning)] to-transparent blur-[1px]"
                            animate={{x: [0, 24, 0], opacity: [0.3, 0.9, 0.3]}}
                            transition={{duration: 3.5, repeat: Infinity, ease: "easeInOut"}}
                        />

                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,transparent_0,transparent_18%,rgba(2,6,23,0.18)_19%,transparent_20%)]" />
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="flex flex-wrap gap-2">
                            <span className="rounded-full border border-[var(--color-warning)]/35 bg-[var(--color-warning)]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-warning)]">
                                {event.type}
                            </span>

                            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                                NASA DONKI
                            </span>
                        </div>

                        <h1 className="mt-4 text-2xl font-black tracking-[-0.045em] text-[var(--color-text)] sm:text-3xl lg:text-4xl">
                            {event.title}
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">
                            {event.note || "Detailed NASA DONKI event dossier based on real space weather data."}
                        </p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-3">
                            <SmallInfo label="Start time" value={event.startTime ?? "—"} />
                            <SmallInfo label="End time" value={event.endTime ?? "—"} />
                            <SmallInfo label="Data status" value="NASA real data" />
                        </div>
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    <Metric
                        icon={Gauge}
                        label={locale.speed}
                        value={event.speed ? `${formatNumber(event.speed)} km/s` : "—"}
                    />
                    <Metric
                        icon={Activity}
                        label={locale.halfAngle}
                        value={event.halfAngle ? `${formatNumber(event.halfAngle)}°` : "—"}
                    />
                    <Metric
                        icon={Flame}
                        label={locale.classType}
                        value={event.classType ?? "—"}
                    />
                    <Metric
                        icon={Zap}
                        label={locale.kpIndex}
                        value={event.kpIndex ? `Kp ${formatNumber(event.kpIndex, 1)}` : "—"}
                    />
                    <Metric
                        icon={Sun}
                        label={locale.sourceLocation}
                        value={event.sourceLocation || "—"}
                    />
                    <Metric
                        icon={RadioTower}
                        label={locale.catalog}
                        value={event.catalog || "—"}
                    />
                </div>
            </div>

            {event.link && (
                <a
                    href={event.link}
                    target="_blank"
                    rel="noreferrer"
                    className="relative z-10 mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-xs font-black text-white transition hover:gap-4"
                >
                    {locale.source}
                    <ExternalLink className="h-3.5 w-3.5" />
                </a>
            )}
        </section>
    );
};

const SmallInfo = ({label, value}: {label: string; value: string}) => (
    <div className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-3">
        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            {label}
        </p>

        <p className="mt-1 truncate text-xs font-bold text-[var(--color-text)]">
            {value}
        </p>
    </div>
);

const Metric = ({
                    icon: Icon,
                    label,
                    value,
                }: {
    icon: typeof Gauge;
    label: string;
    value: string;
}) => (
    <div className="relative overflow-hidden rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4">
        <div className="absolute right-[-32px] top-[-32px] h-24 w-24 rounded-full bg-[var(--color-accent-soft)] blur-2xl" />

        <div className="relative z-10 flex items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                <Icon className="h-4.5 w-4.5" />
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
    </div>
);