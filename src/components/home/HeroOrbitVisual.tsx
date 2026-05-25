"use client";

import {motion} from "framer-motion";
import type {ReactNode} from "react";

import type {NasaAsset} from "@/src/types/nasa";

type Props = {
    assets?: NasaAsset[];
};

const OrbitObject = ({
                         children,
                         className,
                         duration,
                         delay,
                     }: {
    children: ReactNode;
    className: string;
    duration: number;
    delay: number;
}) => {
    return (
        <motion.div
            className={`absolute ${className} rounded-full`}
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
};

const Label = ({children}: {children: ReactNode}) => (
    <div className="rounded-full border border-[var(--color-border)] bg-[rgba(2,6,23,0.58)] px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-xl">
        <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
        {children}
    </div>
);

export const HeroOrbitVisual = (_props: Props) => {
    return (
        <motion.div
            initial={{opacity: 0, scale: 0.94}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.8, delay: 0.15}}
            className="relative z-10 mx-auto grid aspect-square w-full max-w-[350px] place-items-center sm:max-w-[500px] lg:max-w-[610px]"
        >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.07),transparent_68%)]" />

            <div className="absolute inset-[4%] rounded-full border border-[var(--color-border)]" />
            <div className="absolute inset-[13%] rounded-full border border-orange-500/30" />
            <div className="absolute inset-[26%] rounded-full border border-cyan-400/32" />
            <div className="absolute inset-[40%] rounded-full border border-dashed border-[var(--color-border-strong)]" />

            <div className="relative h-28 w-28 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff7ad,#fb923c_42%,#7c2d12_78%,#431407_100%)] shadow-[0_0_80px_rgba(251,146,60,0.62)] sm:h-32 sm:w-32" />

            <OrbitObject className="inset-[13%]" duration={42} delay={-12}>
                <div className="flex items-center gap-1.5">
                    <div className="h-12 w-12 rounded-full bg-[radial-gradient(circle_at_32%_26%,#fed7aa,#ea580c_42%,#7c2d12_76%,#2b0d05_100%)] shadow-[0_0_28px_rgba(239,106,58,0.45)]" />
                    <Label>Mars</Label>
                </div>
            </OrbitObject>

            <OrbitObject className="inset-[26%]" duration={28} delay={0}>
                <div className="flex items-center gap-1.5">
                    <div className="h-16 w-16 rounded-full bg-[radial-gradient(circle_at_32%_26%,#eff6ff,#60a5fa_20%,#2563eb_36%,#0f766e_54%,#020617_88%)] shadow-[0_0_34px_rgba(56,189,248,0.52)]" />
                    <Label>Earth</Label>
                </div>
            </OrbitObject>

            <OrbitObject className="inset-[40%]" duration={20} delay={-7}>
                <div className="flex items-center gap-1.5">
                    <div className="h-8 w-8 rounded-full bg-[radial-gradient(circle_at_35%_28%,#f8fafc,#cbd5e1_34%,#64748b_66%,#1e293b_96%)] shadow-[0_0_20px_rgba(203,213,225,0.38)]" />
                    <Label>Moon</Label>
                </div>
            </OrbitObject>

            <div className="absolute left-[7%] top-[54%] hidden rounded-full border border-[var(--color-border)] bg-[rgba(2,6,23,0.58)] px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-xl sm:block">
                ISS
            </div>
        </motion.div>
    );
};