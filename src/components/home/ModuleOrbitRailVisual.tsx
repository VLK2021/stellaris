"use client";

import { motion, type Transition } from "framer-motion";
import {
    Camera,
    Database,
    GraduationCap,
    ImageIcon,
    MoreHorizontal,
    Radar,
    Rocket,
    Satellite,
} from "lucide-react";

import type { VisualType } from "./moduleOrbitRail.data";

type Props = {
    visual: VisualType;
};

const pulseTransition: Transition = {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
};

export const ModuleOrbitRailVisual = ({ visual }: Props) => {
    switch (visual) {
        case "earth":
            return (
                <div className="relative h-20 w-20">
                    <motion.div
                        animate={{
                            scale: [1, 1.08, 1],
                            opacity: [0.75, 1, 0.75],
                        }}
                        transition={pulseTransition}
                        className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl"
                    />
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#8ddcff_0%,#2563eb_40%,#0f766e_72%,#052e2b_100%)] shadow-[0_0_28px_rgba(34,211,238,0.35)]" />
                    <div className="absolute right-4 top-4 h-3 w-3 rounded-full bg-emerald-400/70 blur-[2px]" />
                    <div className="absolute bottom-6 left-5 h-4 w-4 rounded-full bg-emerald-500/40 blur-[2px]" />
                </div>
            );

        case "mars":
            return (
                <div className="relative h-20 w-20">
                    <motion.div
                        animate={{
                            scale: [1, 1.08, 1],
                            opacity: [0.75, 1, 0.75],
                        }}
                        transition={pulseTransition}
                        className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl"
                    />
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_28%,#ffd7a6_0%,#f97316_42%,#9a3412_72%,#431407_100%)] shadow-[0_0_28px_rgba(249,115,22,0.32)]" />
                    <div className="absolute left-5 top-7 h-2 w-6 rounded-full bg-black/20" />
                    <div className="absolute right-5 bottom-6 h-2 w-5 rounded-full bg-black/20" />
                </div>
            );

        case "asteroid":
            return (
                <div className="relative h-20 w-20">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 28,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#f5d08d_0%,#b7791f_48%,#5f370e_100%)] shadow-[0_0_22px_rgba(245,158,11,0.22)]" />
                        <div className="absolute right-5 top-5 h-2 w-2 rounded-full bg-black/20" />
                        <div className="absolute bottom-5 left-4 h-3 w-3 rounded-full bg-black/20" />
                    </motion.div>
                </div>
            );

        case "sun":
            return (
                <div className="relative h-20 w-20">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute inset-0 rounded-full bg-orange-400/30 blur-2xl"
                    />
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_38%_28%,#fff7c2_0%,#fbbf24_35%,#f97316_68%,#9a3412_100%)] shadow-[0_0_38px_rgba(251,146,60,0.42)]" />
                </div>
            );

        case "exoplanet":
            return (
                <div className="relative h-20 w-20">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 16,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-1 rounded-full bg-[radial-gradient(circle_at_35%_25%,#b8d7ff_0%,#2563eb_45%,#1e3a8a_100%)]" />
                        <div className="absolute left-[-6px] top-8 h-[10px] w-[92px] rotate-[12deg] rounded-full bg-cyan-200/40 blur-[1px]" />
                    </motion.div>
                </div>
            );

        case "apod":
            return (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-fuchsia-400/20 bg-fuchsia-500/5 shadow-[0_0_30px_rgba(192,38,211,0.22)]">
                    <Camera className="h-9 w-9 text-fuchsia-300" />
                </div>
            );

        case "media":
            return (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/5 shadow-[0_0_30px_rgba(139,92,246,0.22)]">
                    <ImageIcon className="h-9 w-9 text-violet-300" />
                </div>
            );

        case "satellite":
            return (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/5 shadow-[0_0_30px_rgba(34,211,238,0.18)]">
                    <Satellite className="h-9 w-9 text-cyan-300" />
                </div>
            );

        case "data":
            return (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-sky-400/20 bg-sky-500/5 shadow-[0_0_30px_rgba(56,189,248,0.18)]">
                    <Database className="h-9 w-9 text-sky-300" />
                </div>
            );

        case "learn":
            return (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/5 shadow-[0_0_30px_rgba(99,102,241,0.18)]">
                    <GraduationCap className="h-9 w-9 text-indigo-300" />
                </div>
            );

        case "rocket":
            return (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-pink-400/20 bg-pink-500/5 shadow-[0_0_30px_rgba(236,72,153,0.18)]">
                    <Rocket className="h-9 w-9 text-pink-300" />
                </div>
            );

        case "events":
            return (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.18)]">
                    <Radar className="h-9 w-9 text-emerald-300" />
                </div>
            );

        default:
            return (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <MoreHorizontal className="h-9 w-9 text-white/70" />
                </div>
            );
    }
};