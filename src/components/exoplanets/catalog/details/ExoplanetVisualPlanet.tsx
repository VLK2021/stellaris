"use client";

import {motion} from "framer-motion";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";
import type {ExoplanetDetails} from "./ExoplanetDetailsPage";

type Props = {
    data: ExoplanetDetails;
    t: ExoplanetsLocale["details"];
};

const getSize = (radius: number | null) => {
    if (!radius) return 250;
    if (radius < 1) return 180;
    if (radius < 2) return 220;
    if (radius < 5) return 280;
    if (radius < 10) return 330;
    return 380;
};

const getGradient = (temperature: number | null) => {
    if (!temperature) {
        return "radial-gradient(circle at 30% 25%, var(--color-glass-strong), var(--color-earth), var(--color-card-deep))";
    }

    if (temperature < 180) return "radial-gradient(circle at 30% 25%, #e0f2fe, #38bdf8 42%, #1e3a8a)";
    if (temperature < 320) return "radial-gradient(circle at 30% 25%, #dcfce7, #38bdf8 45%, #155eef)";
    if (temperature < 700) return "radial-gradient(circle at 30% 25%, #fde68a, #ea580c 48%, #7c2d12)";

    return "radial-gradient(circle at 30% 25%, #fecaca, #ec4899 45%, #450a0a)";
};

export const ExoplanetVisualPlanet = ({data, t}: Props) => {
    const size = getSize(data.pl_rade);
    const gradient = getGradient(data.pl_eqt);

    return (
        <div className="relative grid min-h-[520px] place-items-center overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] backdrop-blur-xl">
            <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:28px_28px]" />

            <motion.div
                className="absolute h-[520px] w-[520px] rounded-full border border-[var(--color-accent)]/25"
                animate={{rotate: 360}}
                transition={{duration: 58, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute h-[390px] w-[390px] rounded-full border border-[var(--color-brand-secondary)]/25"
                animate={{rotate: -360}}
                transition={{duration: 42, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute h-[250px] w-[250px] rounded-full border border-[var(--color-border)]"
                animate={{rotate: 360}}
                transition={{duration: 25, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="relative z-10 rounded-full"
                style={{
                    width: size,
                    height: size,
                    background: gradient,
                }}
                animate={{
                    scale: [1, 1.045, 1],
                    boxShadow: [
                        "0 0 50px rgba(56,189,248,.18)",
                        "0 0 130px rgba(56,189,248,.42)",
                        "0 0 50px rgba(56,189,248,.18)",
                    ],
                }}
                transition={{duration: 4, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute left-1/2 top-1/2 h-px w-[125%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                animate={{rotate: 360, opacity: [0.08, 0.42, 0.08]}}
                transition={{duration: 10, repeat: Infinity, ease: "linear"}}
            />

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                        {t.generated}
                    </p>
                    <h1 className="mt-2 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-3xl font-black uppercase tracking-[-0.06em] text-transparent">
                        {data.pl_name ?? t.unknown}
                    </h1>
                </div>

                <p className="hidden max-w-[250px] text-right text-xs leading-5 text-[var(--color-text-muted)] sm:block">
                    {t.confirmed} {t.orbiting}{" "}
                    <span className="font-bold text-[var(--color-text)]">{data.hostname ?? t.unknown}</span>
                </p>
            </div>
        </div>
    );
};