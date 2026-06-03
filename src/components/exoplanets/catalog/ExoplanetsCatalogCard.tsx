"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {Activity, Orbit, Radio, Sparkles} from "lucide-react";

import type {ExoplanetCatalogItem} from "./ExoplanetsCatalogPage";

type Props = {
    item: ExoplanetCatalogItem;
    index: number;
};

const formatNumber = (value: number | null, digits = 2) => {
    if (value === null || !Number.isFinite(value)) return "—";
    return Number(value.toFixed(digits));
};

const getPlanetSlug = (name: string | null) => {
    return encodeURIComponent((name ?? "unknown-planet").toLowerCase());
};

export const ExoplanetsCatalogCard = ({item, index}: Props) => {
    const planetName = item.pl_name ?? "Unknown planet";

    return (
        <motion.article
            initial={{opacity: 0, y: 22, scale: 0.96}}
            whileInView={{opacity: 1, y: 0, scale: 1}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.4, delay: Math.min(index * 0.035, 0.22)}}
            className="group relative min-h-[330px] overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
        >
            <div className="absolute inset-0 opacity-25 transition duration-500 group-hover:opacity-55" style={{background: "var(--hero-bg)"}} />

            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:26px_26px]" />

            <motion.div
                className="absolute -right-16 -top-16 h-[180px] w-[180px] rounded-full border border-[var(--color-accent)]/25"
                animate={{rotate: 360}}
                transition={{duration: 36, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute right-8 top-12 h-[84px] w-[84px] rounded-full border border-[var(--color-brand-secondary)]/25"
                animate={{rotate: -360}}
                transition={{duration: 24, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                animate={{x: ["-100%", "100%"]}}
                transition={{duration: 3.5, repeat: Infinity, ease: "linear"}}
            />

            <Link
                href={`/exoplanets/catalog/${getPlanetSlug(item.pl_name)}`}
                className="relative z-10 flex min-h-[330px] flex-col p-5"
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-glass)] backdrop-blur-xl">
                        <Orbit className="h-5 w-5 text-[var(--color-accent)]" />
                    </div>

                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                            {item.discoverymethod ?? "Unknown"}
                        </p>

                        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                            {item.disc_year ?? "—"}
                        </p>
                    </div>
                </div>

                <div className="mt-7">
                    <h2 className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-[1.45rem] font-black uppercase leading-[1] tracking-[-0.045em] text-transparent">
                        {planetName}
                    </h2>

                    <p className="mt-3 text-sm text-[var(--color-text-muted)]">
                        Host star:{" "}
                        <span className="font-bold text-[var(--color-text)]">
                            {item.hostname ?? "—"}
                        </span>
                    </p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <Metric icon={Radio} label="Distance" value={`${formatNumber(item.sy_dist)} pc`} />
                    <Metric icon={Sparkles} label="Radius" value={`${formatNumber(item.pl_rade)} R⊕`} />
                    <Metric icon={Activity} label="Mass" value={`${formatNumber(item.pl_bmasse)} M⊕`} />
                    <Metric icon={Orbit} label="Orbit" value={`${formatNumber(item.pl_orbper)} d`} />
                </div>

                <div className="mt-auto pt-5">
                    <div className="flex items-center justify-between border-t border-[var(--color-border)]/70 pt-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                            Temp: {item.pl_eqt ? `${formatNumber(item.pl_eqt, 1)} K` : "—"}
                        </span>

                        <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                            Details →
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
}) => {
    return (
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
};