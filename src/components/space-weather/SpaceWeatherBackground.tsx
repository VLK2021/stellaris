"use client";

import {motion} from "framer-motion";

export const SpaceWeatherBackground = () => {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[var(--body-bg)]" />

            <motion.div
                className="absolute right-[-14%] top-[-18%] h-[620px] w-[620px] rounded-full bg-[var(--color-sun)]/20 blur-3xl"
                animate={{
                    scale: [1, 1.12, 1],
                    opacity: [0.28, 0.58, 0.28],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute left-[-12%] top-[34%] h-[520px] w-[520px] rounded-full bg-[var(--color-accent)]/12 blur-3xl"
                animate={{
                    scale: [1, 1.16, 1],
                    opacity: [0.18, 0.44, 0.18],
                }}
                transition={{
                    duration: 11,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute left-[-25%] top-[28%] h-[2px] w-[85%] rotate-[-12deg] bg-gradient-to-r from-transparent via-[var(--color-warning)] to-transparent blur-[1px]"
                animate={{
                    x: ["-10%", "130%"],
                    opacity: [0, 0.65, 0],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute left-[18%] top-[70%] h-[2px] w-[45%] rotate-[18deg] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent blur-[1px]"
                animate={{
                    x: ["-20%", "100%"],
                    opacity: [0, 0.42, 0],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,var(--star-color)_1px,transparent_1px),radial-gradient(circle_at_72%_38%,var(--color-accent)_1px,transparent_1px),radial-gradient(circle_at_88%_76%,var(--color-warning)_1px,transparent_1px)] bg-[size:110px_110px] opacity-25" />
        </div>
    );
};