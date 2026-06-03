"use client";

import {motion} from "framer-motion";

export const ExoplanetsOrbitField = () => {
    return (
        <>
            <motion.div
                className="absolute inset-0"
                style={{background: "var(--hero-bg)"}}
                animate={{opacity: [0.45, 0.9, 0.45]}}
                transition={{duration: 8, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-accent)]/40"
                animate={{rotate: 360}}
                transition={{duration: 34, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-brand-secondary)]/30"
                animate={{rotate: -360}}
                transition={{duration: 54, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute left-1/2 top-1/2 h-[580px] w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-border)]"
                animate={{rotate: 360}}
                transition={{duration: 86, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute left-1/2 top-1/2 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent-soft)] shadow-[var(--shadow-glow)]"
                animate={{scale: [1, 1.12, 1], opacity: [0.65, 1, 0.65]}}
                transition={{duration: 3.8, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                animate={{opacity: [0.1, 0.55, 0.1], x: ["-20%", "20%", "-20%"]}}
                transition={{duration: 7, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-[var(--color-brand-secondary)] to-transparent"
                animate={{opacity: [0.1, 0.45, 0.1], y: ["-12%", "12%", "-12%"]}}
                transition={{duration: 9, repeat: Infinity, ease: "easeInOut"}}
            />
        </>
    );
};