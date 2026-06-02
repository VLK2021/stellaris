"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {ArrowUpRight, Database, FileImage, Layers3} from "lucide-react";

import type {EarthLayer} from "@/src/types/earth/earth.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

type Props = {
    layer: EarthLayer;
    t: EarthLocale;
    index?: number;
};

export const EarthLayerCard = ({layer, t, index = 0}: Props) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 18, scale: 0.985}}
            whileInView={{opacity: 1, y: 0, scale: 1}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.35, delay: Math.min(index * 0.025, 0.2)}}
        >
            <Link
                href={`/earth/layers/${encodeURIComponent(layer.id)}`}
                className="group relative flex h-[280px] flex-col justify-between overflow-hidden rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 shadow-[var(--shadow-card)] backdrop-blur-xl transition hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
            >
                <motion.div
                    className="absolute inset-0"
                    style={{background: "var(--hero-bg)"}}
                    animate={{opacity: [0.08, 0.24, 0.08]}}
                    transition={{duration: 7, repeat: Infinity, ease: "easeInOut"}}
                />

                <motion.div
                    className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                    animate={{x: ["-100%", "100%"]}}
                    transition={{duration: 5, repeat: Infinity, ease: "easeInOut"}}
                />

                <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <p className="earth-label text-[10px] font-black uppercase tracking-[0.2em]">
                                {layer.format ?? "NASA GIBS"}
                            </p>

                            <h3 className="mt-2 line-clamp-2 min-h-[44px] text-base font-black">
                                {layer.title}
                            </h3>
                        </div>

                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-accent)] transition group-hover:rotate-45 group-hover:border-[var(--color-accent)]">
                            <ArrowUpRight className="h-4 w-4" />
                        </span>
                    </div>

                    <p className="mt-3 line-clamp-2 break-words text-xs text-[var(--color-text-muted)]">
                        ID: {layer.id}
                    </p>
                </div>

                <div className="relative z-10 rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-card)]/55 p-3 text-xs text-[var(--color-text-muted)] backdrop-blur-xl">
                    <Info icon={FileImage} label="Format" value={layer.format ?? "—"} />
                    <Info icon={Layers3} label="TileMatrixSet" value={layer.tileMatrixSet ?? "—"} />
                    <Info icon={Database} label="Source" value={layer.source} />

                    <p className="earth-label mt-3 text-[10px] font-black uppercase tracking-[0.16em]">
                        {t.details.viewDetails ?? "View details"} →
                    </p>
                </div>
            </Link>
        </motion.div>
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
}) => {
    return (
        <p className="mt-1 flex min-w-0 items-center gap-2">
            <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" />
            <span className="line-clamp-1">
                <span className="font-black text-[var(--color-text)]">{label}: </span>
                {value}
            </span>
        </p>
    );
};