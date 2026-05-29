"use client";

import {motion} from "framer-motion";

export const AsteroidsBackground = () => {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[var(--body-bg)]" />

            <motion.div
                className="absolute left-[55%] top-[-18%] h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-[var(--color-accent-soft)] blur-3xl"
                animate={{scale: [1, 1.12, 1], opacity: [0.32, 0.66, 0.32]}}
                transition={{duration: 9, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute right-[-10%] top-[22%] h-[460px] w-[460px] rounded-full bg-[var(--color-mars)]/10 blur-3xl"
                animate={{scale: [1, 1.15, 1], opacity: [0.16, 0.36, 0.16]}}
                transition={{duration: 11, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute left-[-25%] top-[42%] h-[2px] w-[76%] rotate-[-16deg] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent blur-[1px]"
                animate={{x: ["-10%", "125%"], opacity: [0, 0.36, 0]}}
                transition={{duration: 10, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,var(--star-color)_1px,transparent_1px),radial-gradient(circle_at_72%_38%,var(--color-accent)_1px,transparent_1px),radial-gradient(circle_at_88%_76%,var(--color-mars)_1px,transparent_1px)] bg-[size:105px_105px] opacity-25" />
        </div>
    );
};