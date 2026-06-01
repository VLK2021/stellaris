"use client";

import {motion} from "framer-motion";

export const EarthBackground = () => {
    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(34,197,94,0.22),transparent_30%),radial-gradient(circle_at_86%_12%,rgba(56,189,248,0.18),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.18),transparent_42%)]" />

            <motion.div
                className="absolute inset-0 opacity-50"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "86px 86px",
                }}
                animate={{backgroundPosition: ["0px 0px", "86px 172px"]}}
                transition={{duration: 42, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute -left-52 top-20 h-[740px] w-[740px] rounded-full border border-[var(--color-accent)]/15"
                animate={{rotate: 360, scale: [1, 1.06, 1]}}
                transition={{duration: 55, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute -right-64 bottom-[-180px] h-[900px] w-[900px] rounded-full border border-emerald-400/10"
                animate={{rotate: -360, scale: [1, 1.05, 1]}}
                transition={{duration: 68, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute left-[-40%] top-[38%] h-[2px] w-[90%] rotate-[-12deg] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent blur-[1px]"
                animate={{x: ["0%", "230%"], opacity: [0, 0.9, 0]}}
                transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
            />
        </div>
    );
};