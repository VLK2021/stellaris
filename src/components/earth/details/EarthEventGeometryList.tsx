"use client";

import {motion} from "framer-motion";
import {Clock, MapPin, Route} from "lucide-react";

import type {EarthEventGeometry} from "@/src/types/earth/earth.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

type Props = {
    geometry: EarthEventGeometry[];
    t: EarthLocale;
};

export const EarthEventGeometryList = ({geometry, t}: Props) => {
    return (
        <motion.section
            initial={{opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.4}}
            className="relative overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl"
        >
            <div className="absolute inset-0 opacity-25" style={{background: "var(--hero-bg)"}} />

            <h2 className="relative z-10 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-xl font-black uppercase tracking-[-0.04em] text-transparent">
                {t.details.geometryTrack}
            </h2>

            <div className="relative z-10 mt-5 max-h-[560px] overflow-y-auto pr-2">
                <div className="relative grid gap-3">
                    <div className="absolute bottom-0 left-[19px] top-0 w-px bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-border-strong)] to-transparent" />

                    {geometry.map((item, index) => (
                        <motion.div
                            key={`${item.date}-${index}`}
                            initial={{opacity: 0, x: 14}}
                            whileInView={{opacity: 1, x: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.28, delay: Math.min(index * 0.025, 0.25)}}
                            className="relative ml-10 rounded-[1.15rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl"
                        >
                            <span className="absolute -left-[32px] top-5 grid h-4 w-4 place-items-center rounded-full border border-[var(--color-accent)] bg-[var(--color-card-solid)] shadow-[var(--shadow-glow)]" />

                            <p className="earth-label text-[10px] font-black uppercase tracking-[0.18em]">
                                {t.details.point} #{index + 1}
                            </p>

                            <div className="mt-3 grid gap-2 text-sm text-[var(--color-text-muted)]">
                                <Info icon={Clock} label={t.details.date} value={item.date ?? "—"} />
                                <Info icon={Route} label={t.details.type} value={item.type ?? "—"} />
                                <Info icon={MapPin} label={t.details.coordinates} value={item.coordinates?.join(" / ") ?? "—"} />
                            </div>
                        </motion.div>
                    ))}
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
    icon: typeof Clock;
    label: string;
    value: string;
}) => (
    <p className="flex min-w-0 items-start gap-2">
        <Icon className="mt-[2px] h-4 w-4 shrink-0 text-[var(--color-accent)]" />
        <span>
            <span className="font-black text-[var(--color-text)]">{label}: </span>
            <span className="break-words">{value}</span>
        </span>
    </p>
);