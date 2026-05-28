"use client";

import {motion} from "framer-motion";

export const MissionTimelineBackground = () => {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.6rem]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,17,0.92),rgba(2,6,17,0.98))]" />

            <motion.div
                className="absolute right-[-12%] top-[4%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.13),rgba(59,130,246,0.08),transparent_68%)] blur-3xl"
                animate={{x: [0, -35, 0], y: [0, 24, 0], scale: [1, 1.08, 1]}}
                transition={{duration: 16, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute left-[-18%] top-[46%] h-[3px] w-[70%] rotate-[-15deg] bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent blur-[1px]"
                animate={{x: ["-20%", "85%"], opacity: [0, 0.75, 0]}}
                transition={{duration: 8, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(255,255,255,0.34)_1px,transparent_1px),radial-gradient(circle_at_70%_38%,rgba(34,211,238,0.28)_1px,transparent_1px),radial-gradient(circle_at_88%_72%,rgba(168,85,247,0.24)_1px,transparent_1px)] bg-[size:115px_115px] opacity-40" />
        </div>
    );
};