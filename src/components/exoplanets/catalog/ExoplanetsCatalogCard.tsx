"use client";

import {motion} from "framer-motion";
import {Orbit} from "lucide-react";

import type {ExoplanetCatalogItem} from "./ExoplanetsCatalogPage";

type Props = {
    item: ExoplanetCatalogItem;
    index: number;
};

export const ExoplanetsCatalogCard = ({item, index}: Props) => {
    return (
        <motion.article
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.35, delay: Math.min(index * 0.03, 0.2)}}
            className="group relative min-h-[300px] overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl transition hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
        >
            <div className="absolute inset-0 opacity-20 transition group-hover:opacity-40" style={{background: "var(--hero-bg)"}} />

            <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-glass)]">
                        <Orbit className="h-5 w-5 text-[var(--color-accent)]" />
                    </div>

                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                        {item.discoverymethod ?? "Unknown"}
                    </p>
                </div>

                <h2 className="mt-5 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase tracking-[-0.04em] text-transparent">
                    {item.pl_name ?? "Unknown planet"}
                </h2>

                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Host star: <span className="font-bold text-[var(--color-text)]">{item.hostname ?? "—"}</span>
                </p>

                <div className="mt-5 grid gap-2 text-sm">
                    <Row label="Year" value={item.disc_year} />
                    <Row label="Distance" value={item.sy_dist ? `${item.sy_dist.toFixed(2)} pc` : null} />
                    <Row label="Radius" value={item.pl_rade ? `${item.pl_rade} R⊕` : null} />
                    <Row label="Mass" value={item.pl_bmasse ? `${item.pl_bmasse} M⊕` : null} />
                    <Row label="Orbit" value={item.pl_orbper ? `${item.pl_orbper} days` : null} />
                    <Row label="Temp" value={item.pl_eqt ? `${item.pl_eqt} K` : null} />
                </div>
            </div>
        </motion.article>
    );
};

const Row = ({label, value}: {label: string; value: string | number | null}) => {
    return (
        <p className="flex justify-between gap-4 border-b border-[var(--color-border)]/60 pb-1 text-[var(--color-text-muted)]">
            <span>{label}</span>
            <span className="font-bold text-[var(--color-text)]">{value ?? "—"}</span>
        </p>
    );
};