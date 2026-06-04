"use client";

import {motion} from "framer-motion";
import {Orbit, Sparkles} from "lucide-react";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

import type {ExoplanetSystemItem} from "./ExoplanetsSystemsPage";

type Props = {
    item: ExoplanetSystemItem;
    index: number;
    t: ExoplanetsLocale["systems"];
};

const format = (value: number | null, suffix = "", digits = 2) => {
    if (value === null || !Number.isFinite(value)) return "—";
    return `${Number(value.toFixed(digits))}${suffix}`;
};

const getStarSize = (radius: number | null) => {
    if (!radius) return 92;
    if (radius < 0.8) return 74;
    if (radius < 1.2) return 96;
    if (radius < 2) return 120;
    return 150;
};

const getStarGradient = (temperature: number | null) => {
    if (!temperature) {
        return "radial-gradient(circle at 35% 30%, #e0f2fe, #38bdf8, #0f172a)";
    }

    if (temperature < 3700) {
        return "radial-gradient(circle at 35% 30%, #fecaca, #ef4444, #450a0a)";
    }

    if (temperature < 5200) {
        return "radial-gradient(circle at 35% 30%, #fed7aa, #f97316, #7c2d12)";
    }

    if (temperature < 6500) {
        return "radial-gradient(circle at 35% 30%, #fef9c3, #facc15, #713f12)";
    }

    return "radial-gradient(circle at 35% 30%, #e0f2fe, #38bdf8, #1e3a8a)";
};

export const ExoplanetsSystemsCard = ({item, index, t}: Props) => {
    const planetCount = item.sy_pnum ?? 0;
    const starSize = getStarSize(item.st_rad);
    const starGradient = getStarGradient(item.st_teff);

    return (
        <motion.article
            initial={{opacity: 0, y: 24, scale: 0.97}}
            whileInView={{opacity: 1, y: 0, scale: 1}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.42, delay: Math.min(index * 0.04, 0.25)}}
            className="group relative min-h-[430px] overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
        >
            <div
                className="absolute inset-0 opacity-30 transition group-hover:opacity-60"
                style={{background: "var(--hero-bg)"}}
            />

            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:28px_28px]" />

            <motion.div
                className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                animate={{x: ["-100%", "100%"]}}
                transition={{duration: 4, repeat: Infinity, ease: "linear"}}
            />

            <div className="relative z-10 grid min-h-[430px] gap-5 p-5 lg:grid-cols-[1fr_1.25fr_0.9fr] lg:p-6">
                <div className="flex flex-col justify-between">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                            {t.hostName}
                        </p>

                        <h2 className="mt-3 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-3xl font-black uppercase leading-[0.95] tracking-[-0.06em] text-transparent">
                            {item.hostname ?? t.unknown}
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-[var(--color-text-muted)]">
                            {t.spectralType}:{" "}
                            <span className="font-bold text-[var(--color-text)]">
                                {item.st_spectype ?? "—"}
                            </span>
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                        <Mini label={t.planets} value={planetCount || "—"} />
                        <Mini label={t.stars} value={item.sy_snum ?? "—"} />
                        <Mini label={t.distance} value={format(item.sy_dist, " pc")} />
                    </div>
                </div>

                <div className="relative grid min-h-[320px] place-items-center overflow-hidden rounded-[1.7rem] border border-[var(--color-border)] bg-[var(--color-glass)] backdrop-blur-xl">
                    <motion.div
                        className="absolute h-[300px] w-[300px] rounded-full border border-[var(--color-accent)]/25"
                        animate={{rotate: 360}}
                        transition={{duration: 45, repeat: Infinity, ease: "linear"}}
                    />

                    <motion.div
                        className="absolute h-[220px] w-[220px] rounded-full border border-[var(--color-brand-secondary)]/25"
                        animate={{rotate: -360}}
                        transition={{duration: 34, repeat: Infinity, ease: "linear"}}
                    />

                    <motion.div
                        className="relative z-10 rounded-full shadow-[var(--shadow-glow)]"
                        style={{
                            width: starSize,
                            height: starSize,
                            background: starGradient,
                        }}
                        animate={{
                            scale: [1, 1.08, 1],
                            boxShadow: [
                                "0 0 40px rgba(56,189,248,.16)",
                                "0 0 100px rgba(56,189,248,.36)",
                                "0 0 40px rgba(56,189,248,.16)",
                            ],
                        }}
                        transition={{duration: 3.6, repeat: Infinity, ease: "easeInOut"}}
                    />

                    {Array.from({length: Math.min(planetCount || 1, 7)}).map((_, planetIndex) => {
                        const orbitSize = 125 + planetIndex * 28;
                        const duration = 18 + planetIndex * 4;

                        return (
                            <motion.div
                                key={planetIndex}
                                className="absolute rounded-full border border-[var(--color-border)]/60"
                                style={{
                                    width: orbitSize,
                                    height: orbitSize,
                                }}
                                animate={{rotate: 360}}
                                transition={{
                                    duration,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            >
                                <span
                                    className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--color-accent)] shadow-[var(--shadow-glow)]"
                                />
                            </motion.div>
                        );
                    })}

                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                        <Orbit className="h-4 w-4" />
                        {t.open}
                    </div>
                </div>

                <div className="grid content-between gap-3">
                    <Metric icon={Sparkles} label={t.temperature} value={format(item.st_teff, " K")} />
                    <Metric label={t.radius} value={format(item.st_rad, " R☉")} />
                    <Metric label={t.mass} value={format(item.st_mass, " M☉")} />
                    <Metric label={t.age} value={format(item.st_age, " Gyr")} />
                    <Metric label={t.metallicity} value={format(item.st_met)} />
                    <Metric label={t.gravity} value={format(item.st_logg)} />
                </div>
            </div>
        </motion.article>
    );
};

const Mini = ({label, value}: {label: string; value: string | number}) => {
    return (
        <div className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-3 backdrop-blur-xl">
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                {label}
            </p>
            <p className="mt-1 text-sm font-black text-[var(--color-text)]">
                {value}
            </p>
        </div>
    );
};

const Metric = ({
                    icon: Icon,
                    label,
                    value,
                }: {
    icon?: typeof Sparkles;
    label: string;
    value: string | number;
}) => {
    return (
        <div className="rounded-[1.1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl">
            {Icon && <Icon className="h-4 w-4 text-[var(--color-accent)]" />}

            <p className={`${Icon ? "mt-2" : ""} text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]`}>
                {label}
            </p>

            <p className="mt-1 truncate text-sm font-black text-[var(--color-text)]">
                {value}
            </p>
        </div>
    );
};