"use client";

import {motion} from "framer-motion";

export const ApodBackground = () => {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(34,211,238,0.14),transparent_34%),linear-gradient(180deg,#020611,#01030a)]" />

            <motion.div
                className="absolute left-1/2 top-[-18%] h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl"
                animate={{scale: [1, 1.12, 1], opacity: [0.45, 0.75, 0.45]}}
                transition={{duration: 8, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.34)_1px,transparent_1px),radial-gradient(circle_at_72%_38%,rgba(34,211,238,0.28)_1px,transparent_1px),radial-gradient(circle_at_88%_76%,rgba(168,85,247,0.24)_1px,transparent_1px)] bg-[size:110px_110px] opacity-45" />
        </div>
    );
};