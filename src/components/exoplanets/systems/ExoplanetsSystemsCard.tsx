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
    if (!radius) return 76;
    if (radius < 0.8) return 58;
    if (radius < 1.2) return 78;
    if (radius < 2) return 98;
    return 120;
};

const getStarGradient = (temperature: number | null) => {
    if (!temperature) return "radial-gradient(circle at 35% 30%, #e0f2fe, #38bdf8, #0f172a)";
    if (temperature < 3700) return "radial-gradient(circle at 35% 30%, #fecaca, #ef4444, #450a0a)";
    if (temperature < 5200) return "radial-gradient(circle at 35% 30%, #fed7aa, #f97316, #7c2d12)";
    if (temperature < 6500) return "radial-gradient(circle at 35% 30%, #fef9c3, #facc15, #713f12)";
    return "radial-gradient(circle at 35% 30%, #e0f2fe, #38bdf8, #1e3a8a)";
};

export const ExoplanetsSystemsCard = ({item, index, t}: Props) => {
    const starSize = getStarSize(item.st_rad);
    const starGradient = getStarGradient(item.st_teff);
    const planetCount = item.sy_pnum ?? 0;

    return (
        <motion.article
            initial={{opacity: 0, y: 22, scale: 0.96}}
            whileInView={{opacity: 1, y: 0, scale: 1}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.4, delay: Math.min(index * 0.035, 0.22)}}
            className="group relative min-h-[370px] overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
        >
            <div className="absolute inset-0 opacity-25 transition duration-500 group-hover:opacity-55" style={{background: "var(--hero-bg)"}} />

            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:26px_26px]" />

            <motion.div
                className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                animate={{x: ["-100%", "100%"]}}
                transition={{duration: 3.5, repeat: Infinity, ease: "linear"}}
            />

            <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                            {t.hostName}
                        </p>

                        <h2 className="mt-3 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-[1.45rem] font-black uppercase leading-[1] tracking-[-0.045em] text-transparent">
                            {item.hostname ?? t.unknown}
                        </h2>

                        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                            {t.spectralType}:{" "}
                            <span className="font-bold text-[var(--color-text)]">
                                {item.st_spectype ?? "—"}
                            </span>
                        </p>
                    </div>

                    <div className="relative grid h-[130px] w-[130px] shrink-0 place-items-center">
                        <motion.div
                            className="absolute h-[122px] w-[122px] rounded-full border border-[var(--color-accent)]/30"
                            animate={{rotate: 360}}
                            transition={{duration: 26, repeat: Infinity, ease: "linear"}}
                        />

                        <motion.div
                            className="absolute h-[86px] w-[86px] rounded-full border border-[var(--color-brand-secondary)]/30"
                            animate={{rotate: -360}}
                            transition={{duration: 18, repeat: Infinity, ease: "linear"}}
                        />

                        <motion.div
                            className="rounded-full shadow-[var(--shadow-glow)]"
                            style={{
                                width: starSize,
                                height: starSize,
                                background: starGradient,
                            }}
                            animate={{scale: [1, 1.08, 1]}}
                            transition={{duration: 3, repeat: Infinity, ease: "easeInOut"}}
                        />
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                    <Metric label={t.planets} value={planetCount || "—"} />
                    <Metric label={t.stars} value={item.sy_snum ?? "—"} />
                    <Metric label={t.distance} value={format(item.sy_dist, " pc")} />
                </div>

                <div className="mt-5 rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl">
                    <div className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                        <Orbit className="h-4 w-4" />
                        System orbit map
                    </div>

                    <div className="relative h-[70px] overflow-hidden rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-card)]/50">
                        <div className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full" style={{background: starGradient}} />

                        {Array.from({length: Math.min(planetCount || 1, 5)}).map((_, planetIndex) => (
                            <motion.span
                                key={planetIndex}
                                className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[var(--color-accent)] shadow-[var(--shadow-glow)]"
                                style={{left: `${34 + planetIndex * 11}%`}}
                                animate={{opacity: [0.45, 1, 0.45], scale: [1, 1.4, 1]}}
                                transition={{
                                    duration: 2.2 + planetIndex * 0.25,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                    <Metric icon={Sparkles} label={t.temperature} value={format(item.st_teff, " K")} />
                    <Metric label={t.radius} value={format(item.st_rad, " R☉")} />
                    <Metric label={t.mass} value={format(item.st_mass, " M☉")} />
                    <Metric label={t.age} value={format(item.st_age, " Gyr")} />
                </div>
            </div>
        </motion.article>
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
}) => (
    <div className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-3 backdrop-blur-xl">
        {Icon && <Icon className="h-4 w-4 text-[var(--color-accent)]" />}

        <p className={`${Icon ? "mt-2" : ""} text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]`}>
            {label}
        </p>

        <p className="mt-1 truncate text-xs font-black text-[var(--color-text)]">
            {value}
        </p>
    </div>
);