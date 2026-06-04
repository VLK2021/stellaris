"use client";

import {motion} from "framer-motion";

import type {ExoplanetCatalogItem} from "./ExoplanetsCatalogPage";

type Props = {
    item: ExoplanetCatalogItem;
};

const getPlanetSize = (radius: number | null) => {
    if (!radius) return 66;
    if (radius < 1) return 48;
    if (radius < 2) return 58;
    if (radius < 5) return 70;
    if (radius < 10) return 82;
    return 92;
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
        <div className="relative grid h-[108px] w-[108px] shrink-0 place-items-center overflow-hidden rounded-full">
            <motion.div
                className="absolute h-[104px] w-[104px] rounded-full border border-[var(--color-accent)]/25"
                animate={{rotate: 360}}
                transition={{duration: 34, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute h-[78px] w-[78px] rounded-full border border-[var(--color-brand-secondary)]/25"
                animate={{rotate: -360}}
                transition={{duration: 24, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="relative z-10 rounded-full shadow-[var(--shadow-glow)]"
                style={{
                    width: size,
                    height: size,
                    background: gradient,
                }}
                animate={{scale: [1, 1.035, 1]}}
                transition={{duration: 4, repeat: Infinity, ease: "easeInOut"}}
            />
        </div>
    );
};