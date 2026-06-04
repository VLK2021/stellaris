"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {Activity, Orbit, Radio, Sparkles} from "lucide-react";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";
import type {ExoplanetCatalogItem} from "./ExoplanetsCatalogPage";

import {ExoplanetDataPlanet} from "./ExoplanetDataPlanet";

type Props = {
    item: ExoplanetCatalogItem;
    index: number;
    t: ExoplanetsLocale["catalog"];
};

const formatNumber = (value: number | null, digits = 2) => {
    if (value === null || !Number.isFinite(value)) return "—";
    return Number(value.toFixed(digits));
};

const getPlanetHref = (name: string | null) => {
    return `/exoplanets/catalog/${encodeURIComponent(name ?? "")}`;
};

export const ExoplanetsCatalogCard = ({item, index, t}: Props) => {
    const planetName = item.pl_name ?? t.unknownPlanet;

    return (
        <motion.article
            initial={{opacity: 0, y: 22, scale: 0.96}}
            whileInView={{opacity: 1, y: 0, scale: 1}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.4, delay: Math.min(index * 0.035, 0.22)}}
            className="group relative min-h-[350px] overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
        >
            <div className="absolute inset-0 opacity-25 transition duration-500 group-hover:opacity-55" style={{background: "var(--hero-bg)"}} />
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:26px_26px]" />

            <motion.div
                className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                animate={{x: ["-100%", "100%"]}}
                transition={{duration: 3.5, repeat: Infinity, ease: "linear"}}
            />

            <Link href={getPlanetHref(item.pl_name)} className="relative z-10 flex min-h-[350px] flex-col p-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                            {item.discoverymethod ?? t.unknownMethod}
                        </p>

                        <h2 className="mt-3 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-[1.35rem] font-black uppercase leading-[1] tracking-[-0.045em] text-transparent">
                            {planetName}
                        </h2>

                        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                            {t.hostStar}:{" "}
                            <span className="font-bold text-[var(--color-text)]">
                                {item.hostname ?? "—"}
                            </span>
                        </p>
                    </div>

                    <ExoplanetDataPlanet item={item} />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                    <Metric icon={Radio} label={t.distance} value={`${formatNumber(item.sy_dist)} pc`} />
                    <Metric icon={Sparkles} label={t.radius} value={`${formatNumber(item.pl_rade)} R⊕`} />
                    <Metric icon={Activity} label={t.mass} value={`${formatNumber(item.pl_bmasse)} M⊕`} />
                    <Metric icon={Orbit} label={t.orbit} value={`${formatNumber(item.pl_orbper)} d`} />
                </div>

                <div className="mt-auto pt-5">
                    <div className="flex items-center justify-between border-t border-[var(--color-border)]/70 pt-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                            {t.temperature}: {item.pl_eqt ? `${formatNumber(item.pl_eqt, 1)} K` : "—"}
                        </span>

                        <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                            {t.details} →
                        </span>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
};

const Metric = ({
                    icon: Icon,
                    label,
                    value,
                }: {
    icon: typeof Orbit;
    label: string;
    value: string;
}) => (
    <div className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-3 backdrop-blur-xl">
        <Icon className="h-4 w-4 text-[var(--color-accent)]" />

        <p className="mt-2 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {label}
        </p>

        <p className="mt-1 truncate text-xs font-black text-[var(--color-text)]">
            {value}
        </p>
    </div>
);