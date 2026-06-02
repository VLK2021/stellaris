"use client";

import {motion} from "framer-motion";
import {Calendar, Database, MapPin, RadioTower, Tag} from "lucide-react";

import type {EarthEvent} from "@/src/types/earth/earth.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

type Props = {
    event: EarthEvent;
    t: EarthLocale;
};

export const EarthEventDetailsHero = ({event, t}: Props) => {
    return (
        <motion.section
            initial={{opacity: 0, y: 18}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.45}}
            className="relative overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-8"
        >
            <motion.div
                className="absolute inset-0"
                style={{background: "var(--hero-bg)"}}
                animate={{opacity: [0.32, 0.55, 0.32]}}
                transition={{duration: 7, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                animate={{x: ["-100%", "100%"]}}
                transition={{duration: 5, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="relative z-10">
                <p className="earth-label text-[11px] font-black uppercase tracking-[0.24em]">
                    {t.details.nasaEvent}
                </p>

                <div className="mt-4 flex flex-wrap items-start justify-between gap-5">
                    <div className="max-w-5xl">
                        <h1 className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-4xl font-black uppercase tracking-[-0.06em] text-transparent sm:text-5xl">
                            {event.title}
                        </h1>

                        <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--color-text-muted)]">
                            {event.description ?? t.details.descriptionFallback}
                        </p>
                    </div>

                    <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-xs font-black uppercase text-[var(--color-accent)]">
                        {event.status === "open" ? t.details.open : t.details.closed}
                    </span>
                </div>

                <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                    <Info icon={Database} label={t.details.id} value={event.id} />
                    <Info icon={Tag} label={t.details.category} value={event.categories.map((item) => item.title).join(", ") || "—"} />
                    <Info icon={Calendar} label={t.details.latestDate} value={event.latestDate ?? "—"} />
                    <Info icon={MapPin} label={t.details.coordinates} value={event.coordinates?.join(" / ") ?? "—"} />
                    <Info icon={RadioTower} label={t.details.geometryPoints} value={String(event.geometryCount)} />
                </div>
            </div>
        </motion.section>
    );
};

const Info = ({
                  icon: Icon,
                  label,
                  value,
              }: {
    icon: typeof Database;
    label: string;
    value: string;
}) => (
    <div className="relative overflow-hidden rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl">
        <Icon className="h-4 w-4 text-[var(--color-accent)]" />

        <p className="earth-muted mt-3 text-[10px] font-black uppercase tracking-[0.18em]">
            {label}
        </p>

        <p className="mt-1 break-words text-sm font-bold text-[var(--color-text)]">
            {value}
        </p>
    </div>
);