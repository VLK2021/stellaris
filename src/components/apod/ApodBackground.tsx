"use client";

import {motion} from "framer-motion";

export const ApodBackground = () => {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.13),transparent_28%),radial-gradient(circle_at_85%_25%,rgba(168,85,247,0.13),transparent_30%),linear-gradient(180deg,#020611,#01030a_75%)]" />

            <motion.div
                className="absolute left-[52%] top-[-20%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl"
                animate={{scale: [1, 1.12, 1], opacity: [0.35, 0.68, 0.35]}}
                transition={{duration: 9, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute right-[-12%] top-[22%] h-[460px] w-[460px] rounded-full bg-violet-500/10 blur-3xl"
                animate={{scale: [1, 1.16, 1], opacity: [0.18, 0.42, 0.18]}}
                transition={{duration: 11, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute left-[-25%] top-[38%] h-[2px] w-[76%] rotate-[-16deg] bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent blur-[1px]"
                animate={{x: ["-10%", "125%"], opacity: [0, 0.65, 0]}}
                transition={{duration: 10, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.28)_1px,transparent_1px),radial-gradient(circle_at_72%_38%,rgba(34,211,238,0.22)_1px,transparent_1px),radial-gradient(circle_at_88%_76%,rgba(168,85,247,0.18)_1px,transparent_1px)] bg-[size:105px_105px] opacity-45" />
        </div>
    );
};