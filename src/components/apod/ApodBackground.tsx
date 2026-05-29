"use client";

import {motion} from "framer-motion";

export const ApodBackground = () => {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_8%,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_82%_28%,rgba(168,85,247,0.12),transparent_28%),linear-gradient(180deg,#020611,#01030a)]" />

            <motion.div
                className="absolute left-[52%] top-[-18%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl"
                animate={{
                    scale: [1, 1.13, 1],
                    opacity: [0.38, 0.68, 0.38],
                }}
                transition={{duration: 8, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute right-[-8%] top-[22%] h-[460px] w-[460px] rounded-full bg-violet-500/10 blur-3xl"
                animate={{
                    scale: [1, 1.18, 1],
                    opacity: [0.18, 0.42, 0.18],
                }}
                transition={{duration: 10, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute left-[-20%] top-[34%] h-[2px] w-[70%] rotate-[-16deg] bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent blur-[1px]"
                animate={{x: ["-12%", "120%"], opacity: [0, 0.7, 0]}}
                transition={{duration: 9, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.3)_1px,transparent_1px),radial-gradient(circle_at_72%_38%,rgba(34,211,238,0.24)_1px,transparent_1px),radial-gradient(circle_at_88%_76%,rgba(168,85,247,0.2)_1px,transparent_1px)] bg-[size:105px_105px] opacity-45" />
        </div>
    );
};