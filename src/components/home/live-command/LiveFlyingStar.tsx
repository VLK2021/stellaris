"use client";

import {motion} from "framer-motion";

export const LiveFlyingStar = () => (
    <motion.div
        className="pointer-events-none absolute left-[15%] top-[45%] z-30 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_28px_rgba(34,211,238,0.95)]"
        animate={{
            x: [0, 270, 445, 815, 600, 310, 0],
            y: [0, -95, 25, -55, 120, 155, 0],
            scale: [1, 1.25, 0.85, 1.25, 1, 1.2, 1],
        }}
        transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
        }}
    />
);