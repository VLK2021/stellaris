"use client";

import {motion} from "framer-motion";

export const EarthBackground = () => {
    return (
        <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(34,197,94,0.18),transparent_32%),radial-gradient(circle_at_82%_12%,var(--color-accent-soft),transparent_34%),radial-gradient(circle_at_55%_92%,rgba(59,130,246,0.14),transparent_38%)]" />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.04)_1px,transparent_1px)] bg-[size:82px_82px] opacity-70" />

            <motion.div
                className="absolute left-[-20%] top-[18%] h-[2px] w-[70%] rotate-[-12deg] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent blur-[1px]"
                animate={{x: ["0%", "190%"], opacity: [0, 0.75, 0]}}
                transition={{duration: 7, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute right-[-20%] bottom-[22%] h-[2px] w-[62%] rotate-[10deg] bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent blur-[1px]"
                animate={{x: ["0%", "-190%"], opacity: [0, 0.65, 0]}}
                transition={{duration: 8, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.035),transparent)]" />
        </>
    );
};