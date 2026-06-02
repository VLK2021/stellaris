"use client";

import {motion} from "framer-motion";
import {Database, ExternalLink} from "lucide-react";

import type {EarthLayer} from "@/src/types/earth/earth.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

type Props = {
    layer: EarthLayer;
    t: EarthLocale;
    index?: number;
};

export const EarthLayerCard = ({layer, t, index = 0}: Props) => {
    const content = (
        <motion.div
            initial={{opacity: 0, y: 18, scale: 0.985}}
            whileInView={{opacity: 1, y: 0, scale: 1}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.35, delay: Math.min(index * 0.025, 0.2)}}
            className="group relative flex h-[280px] flex-col justify-between overflow-hidden rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 shadow-[var(--shadow-card)] backdrop-blur-xl transition hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
        >
            <motion.div
                className="absolute inset-0"
                style={{background: "var(--hero-bg)"}}
                animate={{opacity: [0.08, 0.24, 0.08]}}
                transition={{duration: 7, repeat: Infinity, ease: "easeInOut"}}
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

                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-accent)]">
                        {layer.resourceUrl ? (
                            <ExternalLink className="h-4 w-4" />
                        ) : (
                            <Database className="h-4 w-4" />
                        )}
                    </span>
                </div>

                <p className="mt-3 line-clamp-2 break-words text-xs text-[var(--color-text-muted)]">
                    ID: {layer.id}
                </p>
            </div>

            <div className="relative z-10 rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-card)]/55 p-3 text-xs text-[var(--color-text-muted)] backdrop-blur-xl">
                <p className="line-clamp-1">TileMatrixSet: {layer.tileMatrixSet ?? "—"}</p>
                <p className="mt-1 line-clamp-1">Source: {layer.source}</p>
                <p className="mt-1 line-clamp-2">Abstract: {layer.abstract ?? "—"}</p>

                {layer.resourceUrl && (
                    <p className="earth-label mt-2 text-[10px] font-black uppercase tracking-[0.16em]">
                        {t.details.openSource} →
                    </p>
                )}
            </div>
        </motion.div>
    );

    if (layer.resourceUrl) {
        return (
            <a href={layer.resourceUrl} target="_blank" rel="noreferrer">
                {content}
            </a>
        );
    }

    return content;
};