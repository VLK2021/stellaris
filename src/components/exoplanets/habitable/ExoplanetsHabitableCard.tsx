"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {ArrowRight, Earth, Orbit, Ruler, Sparkles, Thermometer, Weight} from "lucide-react";

import type {HabitableWorld} from "./ExoplanetsHabitablePage";

type Props = {
    item: HabitableWorld;
    index: number;
};

const format = (value: number | null, suffix = "", digits = 2) => {
    if (value === null || !Number.isFinite(value)) return "—";
    return `${Number(value.toFixed(digits))}${suffix}`;
};

const getPlanetGradient = (temperature: number | null) => {
    if (!temperature) return "radial-gradient(circle at 35% 30%, #bfdbfe, #2563eb, #0f172a)";
    if (temperature > 330) return "radial-gradient(circle at 35% 30%, #fed7aa, #f97316, #7c2d12)";
    if (temperature >= 180) return "radial-gradient(circle at 35% 30%, #bbf7d0, #10b981, #064e3b)";
    return "radial-gradient(circle at 35% 30%, #dbeafe, #3b82f6, #172554)";
};

const getZoneLabel = (zone: string) => {
    if (zone === "temperate") return "Temperate Zone";
    if (zone === "hot") return "Hot Zone";
    if (zone === "cold") return "Cold Zone";
    return "Unknown Zone";
};

const getScoreLabel = (score: number) => {
    if (score >= 75) return "Strong candidate";
    if (score >= 55) return "Moderate candidate";
    return "Weak candidate";
};

export const ExoplanetsHabitableCard = ({item, index}: Props) => {
    const href = `/exoplanets/habitable/${encodeURIComponent(item.pl_name ?? "")}`;
    const score = Math.max(0, Math.min(100, item.habitabilityScore));

    return (
        <motion.article
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.3, delay: Math.min(index * 0.025, 0.16)}}
            className="group relative min-h-[340px] overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] transition duration-300 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
        >
            <div className="pointer-events-none absolute inset-0 opacity-28" style={{background: "var(--hero-bg)"}} />
            <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:28px_28px]" />

            <div
                className="pointer-events-none absolute right-[-70px] top-[-70px] h-[220px] w-[220px] rounded-full opacity-40 transition duration-500 group-hover:scale-110 group-hover:opacity-60"
                style={{background: getPlanetGradient(item.pl_eqt)}}
            />

            <div className="relative z-10 grid min-h-[340px] gap-4 p-5 lg:grid-cols-[1fr_220px]">
                <div className="flex min-w-0 flex-col">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                        {getZoneLabel(item.habitabilityZone)}
                    </p>

                    <h2 className="mt-3 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase leading-[0.95] tracking-[-0.06em] text-transparent">
                        {item.pl_name ?? "Unknown world"}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                        Host star:{" "}
                        <span className="font-bold text-[var(--color-text)]">
                            {item.hostname ?? "—"}
                        </span>
                    </p>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                        <Mini label="Score" value={`${score}/100`} />
                        <Mini label="Distance" value={format(item.sy_dist, " pc")} />
                        <Mini label="Year" value={item.disc_year ?? "—"} />
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                        <Metric icon={Ruler} label="Radius" value={format(item.pl_rade, " R⊕")} />
                        <Metric icon={Weight} label="Mass" value={format(item.pl_bmasse, " M⊕")} />
                        <Metric icon={Thermometer} label="Temperature" value={format(item.pl_eqt, " K", 1)} />
                        <Metric icon={Orbit} label="Orbit" value={format(item.pl_orbper, " d")} />
                    </div>

                    <Link
                        href={href}
                        className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-accent)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--color-accent)] transition hover:bg-[var(--color-accent)] hover:text-black"
                    >
                        Open
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="relative grid min-h-[220px] place-items-center overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-glass)]">
                    <div className="absolute h-[190px] w-[190px] rounded-full border border-[var(--color-accent)]/25" />
                    <div className="absolute h-[140px] w-[140px] rounded-full border border-[var(--color-brand-secondary)]/25" />

                    <div
                        className="relative z-10 h-[90px] w-[90px] rounded-full shadow-[var(--shadow-glow)] transition duration-500 group-hover:scale-105"
                        style={{background: getPlanetGradient(item.pl_eqt)}}
                    />

                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                        <Earth className="h-4 w-4" />
                        {getScoreLabel(score)}
                    </div>

                    <div className="absolute right-4 top-4 rounded-full border border-[var(--color-border)] bg-[var(--color-card)]/70 px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                        {score}%
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

const Mini = ({label, value}: {label: string; value: string | number}) => (
    <div className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-3">
        <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />

        <p className="mt-2 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {label}
        </p>

        <p className="mt-1 truncate text-sm font-black text-[var(--color-text)]">
            {value}
        </p>
    </div>
);

const Metric = ({
                    icon: Icon,
                    label,
                    value,
                }: {
    icon: typeof Earth;
    label: string;
    value: string | number;
}) => (
    <div className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-3 transition group-hover:border-[var(--color-border)]">
        <Icon className="h-4 w-4 text-[var(--color-accent)]" />

        <p className="mt-2 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {label}
        </p>

        <p className="mt-1 truncate text-xs font-black text-[var(--color-text)]">
            {value}
        </p>
    </div>
);