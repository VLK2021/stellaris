"use client";

import {motion} from "framer-motion";
import {Calendar, Database, MapPin, RadioTower, Tag} from "lucide-react";

import type {EarthEventEnrichment} from "@/src/types/earth/earthEnrichment.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

type Props = {
    enrichment: EarthEventEnrichment;
    t: EarthLocale;
};

export const EarthEventDetailsHero = ({enrichment, t}: Props) => {
    const {event, epicBackground} = enrichment;

    return (
        <motion.section
            initial={{opacity: 0, y: 18}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.45}}
            className="relative min-h-[480px] overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-8"
        >
            {epicBackground?.imageUrl && (
                <motion.img
                    src={epicBackground.imageUrl}
                    alt={epicBackground.caption}
                    className="absolute right-[-110px] top-[-120px] h-[620px] w-[620px] rounded-full object-cover opacity-35"
                    animate={{scale: [1, 1.04, 1], rotate: [0, 1.5, 0]}}
                    transition={{duration: 12, repeat: Infinity, ease: "easeInOut"}}
                />
            )}

            <motion.div
                className="absolute inset-0"
                style={{background: "var(--hero-bg)"}}
                animate={{opacity: [0.72, 0.95, 0.72]}}
                transition={{duration: 8, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="relative z-10 flex min-h-[420px] flex-col justify-between">
                <div>
                    <p className="earth-label text-[11px] font-black uppercase tracking-[0.24em]">
                        {t.details.nasaEvent}
                    </p>

                    <div className="mt-4 flex flex-wrap items-start justify-between gap-5">
                        <div className="max-w-5xl">
                            <h1 className="text-4xl font-black uppercase tracking-[-0.06em] sm:text-5xl">
                                {event.title}
                            </h1>

                            <p className="earth-muted mt-4 max-w-4xl text-sm leading-7">
                                {event.description ?? t.details.descriptionFallback}
                            </p>
                        </div>

                        <span className="earth-label rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-xs font-black uppercase">
                            {event.status === "open" ? t.details.open : t.details.closed}
                        </span>
                    </div>
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