"use client";

import {motion} from "framer-motion";
import {ExternalLink} from "lucide-react";

import type {EarthEventSource} from "@/src/types/earth/earth.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

type Props = {
    sources: EarthEventSource[];
    t: EarthLocale;
};

export const EarthEventSources = ({sources, t}: Props) => {
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
                {t.details.sources}
            </h2>

            <div className="relative z-10 mt-4 grid gap-3">
                {sources.map((source, index) => (
                    <motion.a
                        key={`${source.id}-${source.url}`}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        initial={{opacity: 0, x: -12}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.3, delay: index * 0.04}}
                        className="group rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 transition hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                <p className="earth-label text-sm font-black">{source.id}</p>
                                <p className="mt-1 break-all text-xs text-[var(--color-text-muted)]">
                                    {source.url}
                                </p>
                            </div>

                            <ExternalLink className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                        </div>

                        <p className="earth-label mt-3 text-[10px] font-black uppercase tracking-[0.16em]">
                            {t.details.openSource} →
                        </p>
                    </motion.a>
                ))}
            </div>
        </motion.section>
    );
};