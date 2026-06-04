"use client";

import {motion} from "framer-motion";

export const ExoplanetsSpaceBackground = () => {
    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
            <div
                className="absolute inset-0 opacity-95"
                style={{background: "var(--body-bg)"}}
            />

            <motion.div
                className="absolute -inset-[12%]"
                style={{
                    background:
                        "radial-gradient(circle at 18% 20%, var(--color-accent-soft), transparent 30%), radial-gradient(circle at 82% 14%, rgba(139, 92, 246, .22), transparent 34%), radial-gradient(circle at 48% 110%, rgba(236, 72, 153, .16), transparent 40%)",
                }}
                animate={{
                    x: [0, 36, -28, 0],
                    y: [0, -22, 30, 0],
                    scale: [1, 1.04, 1.02, 1],
                    opacity: [0.55, 0.95, 0.7, 0.55],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute inset-0 opacity-35 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:34px_34px]"
                animate={{
                    x: [0, -22, 0],
                    y: [0, 16, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute inset-0 opacity-20 [background-image:radial-gradient(var(--color-accent)_1px,transparent_1px)] [background-size:110px_110px]"
                animate={{
                    x: [0, 38, 0],
                    y: [0, -24, 0],
                    opacity: [0.08, 0.22, 0.08],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute left-[-15%] top-[18%] h-[520px] w-[520px] rounded-full bg-[var(--color-accent-soft)] blur-3xl"
                animate={{
                    x: [0, 80, 20, 0],
                    y: [0, -40, 50, 0],
                    opacity: [0.16, 0.42, 0.25, 0.16],
                }}
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute right-[-10%] top-[8%] h-[620px] w-[620px] rounded-full bg-[var(--color-accent-soft)] blur-3xl"
                animate={{
                    x: [0, -70, -20, 0],
                    y: [0, 35, -35, 0],
                    opacity: [0.12, 0.36, 0.2, 0.12],
                }}
                transition={{
                    duration: 19,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute left-0 top-[32%] h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                animate={{
                    x: ["-40%", "40%", "-40%"],
                    opacity: [0.04, 0.38, 0.04],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="absolute inset-0 opacity-[0.09] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:88px_88px]" />

            <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,.04)_45%,transparent_62%)] opacity-40" />
        </div>
    );
};