"use client";

import {motion} from "framer-motion";

export const ExoplanetsSpaceBackground = () => {
    return (
        <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
            <div className="absolute inset-0" style={{background: "var(--body-bg)"}} />

            <motion.div
                className="absolute -inset-[8%] opacity-70"
                style={{
                    background:
                        "radial-gradient(circle at 18% 22%, var(--color-accent-soft), transparent 28%), radial-gradient(circle at 82% 18%, rgba(139,92,246,.18), transparent 32%), radial-gradient(circle at 45% 105%, rgba(236,72,153,.12), transparent 35%)",
                }}
                animate={{
                    x: [0, 18, -14, 0],
                    y: [0, -10, 14, 0],
                }}
                transition={{
                    duration: 24,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute inset-0 opacity-25 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:38px_38px]"
                animate={{
                    x: [0, -12, 0],
                    y: [0, 8, 0],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:90px_90px]" />
        </div>
    );
};