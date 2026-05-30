"use client";

import {motion} from "framer-motion";

export const SpaceWeatherBackground = () => {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[var(--body-bg)]" />

            <div className="absolute left-[-16rem] top-[-6rem] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_42%_46%,rgba(251,146,60,0.95),rgba(234,88,12,0.58)_28%,rgba(190,24,93,0.18)_48%,transparent_68%)] blur-[2px]" />

            <motion.div
                className="absolute left-[-15rem] top-[-4rem] h-[540px] w-[540px] rounded-full border border-[var(--color-warning)]/20"
                animate={{scale: [1, 1.04, 1], opacity: [0.35, 0.65, 0.35]}}
                transition={{duration: 5.5, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute left-[7rem] top-[6rem] h-[2px] w-[520px] rotate-[-18deg] bg-gradient-to-r from-[var(--color-warning)] via-[var(--color-error)] to-transparent blur-[1px]"
                animate={{opacity: [0.15, 0.6, 0.15], x: [0, 34, 0]}}
                transition={{duration: 4.5, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute right-[5%] top-[7rem] h-[340px] w-[340px] rounded-full border border-[var(--color-accent)]/20"
                animate={{rotate: 360}}
                transition={{duration: 38, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute right-[8%] top-[10rem] h-[220px] w-[220px] rounded-full border border-[var(--color-accent)]/14"
                animate={{rotate: -360}}
                transition={{duration: 30, repeat: Infinity, ease: "linear"}}
            />

            <div className="absolute right-[12%] top-[15.5rem] h-16 w-16 rounded-full bg-[radial-gradient(circle,var(--color-earth),rgba(56,189,248,0.24)_52%,transparent_72%)] shadow-[0_0_70px_rgba(56,189,248,0.38)]" />

            <motion.div
                className="absolute right-[10%] top-[13rem] h-[2px] w-[390px] rotate-[18deg] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent blur-[1px]"
                animate={{x: [-60, 60], opacity: [0, 0.55, 0]}}
                transition={{duration: 5.8, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-60" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,var(--star-color)_1px,transparent_1px),radial-gradient(circle_at_72%_38%,var(--color-accent)_1px,transparent_1px),radial-gradient(circle_at_88%_76%,var(--color-warning)_1px,transparent_1px)] bg-[size:110px_110px] opacity-25" />
        </div>
    );
};