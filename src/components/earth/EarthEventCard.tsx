"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {ArrowUpRight, Calendar, MapPin, RadioTower, Tag} from "lucide-react";

import type {EarthEvent} from "@/src/types/earth/earth.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

type Props = {
    event: EarthEvent;
    t: EarthLocale;
    index?: number;
};

export const EarthEventCard = ({event, t, index = 0}: Props) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 18, scale: 0.985}}
            whileInView={{opacity: 1, y: 0, scale: 1}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.35, delay: Math.min(index * 0.035, 0.25)}}
        >
            <Link
                href={`/earth/${encodeURIComponent(event.id)}`}
                className="group relative flex h-[360px] min-w-[380px] max-w-[380px] flex-col justify-between overflow-hidden rounded-[1.45rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-5 shadow-[var(--shadow-card)] backdrop-blur-xl transition hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
            >
                <motion.div
                    className="absolute inset-0"
                    style={{background: "var(--hero-bg)"}}
                    animate={{opacity: [0.12, 0.28, 0.12]}}
                    transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
                />

                <motion.div
                    className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                    animate={{x: ["-100%", "100%"]}}
                    transition={{duration: 5, repeat: Infinity, ease: "easeInOut"}}
                />

                <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                            <p className="earth-label text-[10px] font-black uppercase tracking-[0.22em]">
                                {event.status === "open" ? t.details.open : t.details.closed}
                            </p>

                            <h3 className="mt-3 line-clamp-2 min-h-[58px] text-[1.35rem] font-black leading-[1.18]">
                                {event.title}
                            </h3>
                        </div>

                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-accent)] transition group-hover:rotate-45 group-hover:border-[var(--color-accent)]">
                            <ArrowUpRight className="h-4 w-4" />
                        </span>
                    </div>

                    <div className="mt-4 grid gap-2 text-[13px] text-[var(--color-text-muted)]">
                        <Info icon={Tag} text={`${t.details.category}: ${event.categories.map((item) => item.title).join(", ") || "—"}`} />
                        <Info icon={MapPin} text={`${t.details.coordinates}: ${event.coordinates?.join(" / ") ?? "—"}`} />
                        <Info icon={RadioTower} text={`${t.details.geometryPoints}: ${event.geometryCount}`} />
                        <Info icon={Calendar} text={`${t.details.latestDate}: ${event.latestDate ?? "—"}`} />
                    </div>
                </div>

                <div className="relative z-10 mt-4 h-[88px] shrink-0 rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-card)]/55 p-3 backdrop-blur-xl">
                    <p className="earth-muted text-[10px] font-black uppercase tracking-[0.2em]">
                        {t.details.sources}: {event.sourceCount}
                    </p>

                    <p className="mt-2 line-clamp-2 text-sm font-bold leading-5 text-[var(--color-accent)]">
                        {event.sources.map((source) => source.id).join(", ") || "—"}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};

const Info = ({
                  icon: Icon,
                  text,
              }: {
    icon: typeof MapPin;
    text: string;
}) => (
    <p className="flex min-w-0 items-start gap-2">
        <Icon className="mt-[2px] h-4 w-4 shrink-0 text-[var(--color-accent)]" />
        <span className="line-clamp-2 leading-5">{text}</span>
    </p>
);