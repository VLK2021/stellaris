"use client";

import {motion} from "framer-motion";

import type {ExoplanetCatalogItem} from "./ExoplanetsCatalogPage";

type Props = {
    item: ExoplanetCatalogItem;
};

const getPlanetSize = (radius: number | null) => {
    if (!radius) return 74;
    if (radius < 1) return 58;
    if (radius < 2) return 72;
    if (radius < 5) return 88;
    if (radius < 10) return 104;
    return 118;
};

const getPlanetGradient = (temperature: number | null) => {
    if (!temperature) {
        return "radial-gradient(circle at 32% 28%, var(--color-glass-strong), var(--color-earth), var(--color-card-deep))";
    }

    if (temperature < 180) {
        return "radial-gradient(circle at 32% 28%, #e0f2fe, #38bdf8, #1e3a8a)";
    }

    if (temperature < 320) {
        return "radial-gradient(circle at 32% 28%, #dcfce7, #38bdf8, #155eef)";
    }

    if (temperature < 700) {
        return "radial-gradient(circle at 32% 28%, #fde68a, #ea580c, #7c2d12)";
    }

    return "radial-gradient(circle at 32% 28%, #fecaca, #ec4899, #450a0a)";
};

export const ExoplanetDataPlanet = ({item}: Props) => {
    const size = getPlanetSize(item.pl_rade);
    const gradient = getPlanetGradient(item.pl_eqt);

    return (
        <div className="relative h-[140px] w-[140px] shrink-0">
            <motion.div
                className="absolute inset-0 rounded-full border border-[var(--color-border)]"
                animate={{rotate: 360}}
                transition={{duration: 28, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute left-1/2 top-1/2 rounded-full border border-[var(--color-accent)]/35"
                style={{
                    width: size + 38,
                    height: size + 38,
                    x: "-50%",
                    y: "-50%",
                }}
                animate={{rotate: -360}}
                transition={{duration: 38, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute left-1/2 top-1/2 rounded-full shadow-[var(--shadow-glow)]"
                style={{
                    width: size,
                    height: size,
                    x: "-50%",
                    y: "-50%",
                    background: gradient,
                }}
                animate={{
                    scale: [1, 1.045, 1],
                    boxShadow: [
                        "0 0 35px rgba(56,189,248,.14)",
                        "0 0 70px rgba(56,189,248,.28)",
                        "0 0 35px rgba(56,189,248,.14)",
                    ],
                }}
                transition={{duration: 4, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.span
                className="absolute left-[18%] top-[26%] h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[var(--shadow-glow)]"
                animate={{scale: [1, 1.8, 1], opacity: [0.45, 1, 0.45]}}
                transition={{duration: 2.5, repeat: Infinity}}
            />
        </div>
    );
};