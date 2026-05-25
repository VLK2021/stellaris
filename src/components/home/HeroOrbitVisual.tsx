"use client";

import {motion} from "framer-motion";
import type {ReactNode} from "react";

import type {NasaAsset} from "@/src/types/nasa";

type Props = {
    assets?: NasaAsset[];
};

const Label = ({children}: {children: ReactNode}) => (
    <div className="rounded-full border border-white/15 bg-slate-950/62 px-2 py-1 text-[10px] font-bold text-white shadow-[0_0_16px_rgba(56,189,248,0.16)] backdrop-blur-xl">
        {children}
    </div>
);

const MiniLabel = ({children}: {children: ReactNode}) => (
    <div className="rounded-full border border-white/12 bg-slate-950/56 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-[0_0_12px_rgba(56,189,248,0.12)] backdrop-blur-xl">
        {children}
    </div>
);

const Orbit = ({
                   children,
                   className,
                   duration,
                   delay = 0,
               }: {
    children: ReactNode;
    className: string;
    duration: number;
    delay?: number;
}) => (
    <motion.div
        className={`absolute rounded-full ${className}`}
        animate={{rotate: 360}}
        transition={{duration, repeat: Infinity, ease: "linear", delay}}
    >
        <motion.div
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
            animate={{rotate: -360}}
            transition={{duration, repeat: Infinity, ease: "linear", delay}}
        >
            {children}
        </motion.div>
    </motion.div>
);

const Sun = () => (
    <motion.div
        animate={{
            scale: [1, 1.045, 1],
            rotate: 360,
        }}
        transition={{
            scale: {duration: 4, repeat: Infinity, ease: "easeInOut"},
            rotate: {duration: 90, repeat: Infinity, ease: "linear"},
        }}
        className="relative h-26 w-26 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff7ad_0%,#fde68a_18%,#fb923c_42%,#ea580c_64%,#7c2d12_100%)] shadow-[0_0_90px_rgba(251,146,60,0.75)] sm:h-28 sm:w-28"
    >
        <div className="absolute inset-[-14px] rounded-full bg-orange-400/18 blur-xl" />
        <div className="absolute inset-[-6px] rounded-full border border-orange-200/20" />

        <div className="absolute inset-0 rounded-full bg-[linear-gradient(120deg,rgba(255,255,255,0.48),transparent_34%,rgba(0,0,0,0.34)_82%)]" />

        <div className="absolute left-4 top-5 h-2 w-10 rounded-full bg-yellow-100/35 blur-[1px]" />
        <div className="absolute bottom-5 right-3 h-2 w-9 rounded-full bg-orange-100/25 blur-[1px]" />
        <div className="absolute left-6 top-9 h-1.5 w-8 rounded-full bg-yellow-200/25 blur-[1px]" />
    </motion.div>
);

const Earth = () => (
    <div className="relative h-14 w-14 rounded-full bg-[radial-gradient(circle_at_32%_26%,#eff6ff,#60a5fa_20%,#2563eb_36%,#0f766e_55%,#020617_90%)] shadow-[0_0_34px_rgba(56,189,248,0.52)] sm:h-16 sm:w-16">
        <div className="absolute left-4 top-4 h-4 w-6 rounded-full bg-emerald-300/70 blur-[1px]" />
        <div className="absolute bottom-3 right-3 h-5 w-3 rounded-full bg-emerald-400/55 blur-[1px]" />
        <div className="absolute inset-0 rounded-full bg-[linear-gradient(120deg,rgba(255,255,255,0.42),transparent_38%,rgba(0,0,0,0.44)_82%)]" />
    </div>
);

const Mars = () => (
    <div className="relative h-10 w-10 rounded-full bg-[radial-gradient(circle_at_32%_26%,#fed7aa,#ea580c_42%,#7c2d12_76%,#2b0d05_100%)] shadow-[0_0_28px_rgba(239,106,58,0.48)] sm:h-12 sm:w-12">
        <div className="absolute left-3 top-4 h-1.5 w-6 rounded-full bg-orange-950/35" />
        <div className="absolute bottom-3 right-3 h-1.5 w-5 rounded-full bg-orange-950/35" />
        <div className="absolute inset-0 rounded-full bg-[linear-gradient(120deg,rgba(255,255,255,0.38),transparent_38%,rgba(0,0,0,0.4)_82%)]" />
    </div>
);

const Moon = () => (
    <div className="h-5 w-5 rounded-full bg-[radial-gradient(circle_at_35%_28%,#f8fafc,#cbd5e1_34%,#64748b_66%,#1e293b_96%)] shadow-[0_0_20px_rgba(203,213,225,0.38)] sm:h-6 sm:w-6" />
);

const ISSVisual = () => (
    <div className="relative h-5 w-9 sm:h-6 sm:w-11">
        <div className="absolute left-1/2 top-1/2 h-2.5 w-4 -translate-x-1/2 -translate-y-1/2 rounded-sm border border-cyan-200/70 bg-slate-900/80 shadow-[0_0_12px_rgba(56,189,248,0.45)]" />
        <div className="absolute left-0 top-1/2 h-2 w-4 -translate-y-1/2 border border-cyan-200/60 bg-cyan-300/15" />
        <div className="absolute right-0 top-1/2 h-2 w-4 -translate-y-1/2 border border-cyan-200/60 bg-cyan-300/15" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-cyan-100/45" />
    </div>
);

const EarthSystem = () => (
    <div className="relative flex items-center gap-2">
        <div className="relative">
            <Earth />

            <motion.div
                className="absolute left-1/2 top-1/2 h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/18"
                animate={{rotate: 360}}
                transition={{duration: 7, repeat: Infinity, ease: "linear"}}
            >
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex items-center gap-1">
                        <Moon />
                        <MiniLabel>Moon</MiniLabel>
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="absolute left-1/2 top-1/2 h-[116px] w-[116px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/14"
                animate={{rotate: -360}}
                transition={{duration: 4.5, repeat: Infinity, ease: "linear"}}
            >
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex items-center gap-1">
                        <ISSVisual />
                        <MiniLabel>ISS</MiniLabel>
                    </div>
                </div>
            </motion.div>
        </div>

        <Label>Earth</Label>
    </div>
);

export const HeroOrbitVisual = (_props: Props) => {
    return (
        <motion.div
            initial={{opacity: 0, scale: 0.94}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.8, delay: 0.15}}
            className="relative z-10 mx-auto grid aspect-square w-full max-w-[370px] place-items-center sm:max-w-[520px] lg:max-w-[640px]"
        >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.08),transparent_68%)]" />

            <div className="absolute inset-[47%] rounded-full border border-white/10" />
            <div className="absolute inset-[38%] rounded-full border border-white/12" />
            <div className="absolute inset-[26%] rounded-full border border-cyan-300/60" />
            <div className="absolute inset-[10%] rounded-full border border-orange-400/55" />

            <Sun />

            <Orbit className="inset-[26%]" duration={30} delay={-5}>
                <EarthSystem />
            </Orbit>

            <Orbit className="inset-[10%]" duration={48} delay={-17}>
                <div className="flex items-center gap-1.5">
                    <Mars />
                    <Label>Mars</Label>
                </div>
            </Orbit>
        </motion.div>
    );
};