"use client";

import {motion} from "framer-motion";

const GALAXY =
    "https://images-assets.nasa.gov/image/PIA04921/PIA04921~orig.jpg";

export const ExplorationManifestBackground = () => {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.8rem] bg-[#010611]">
            <motion.img
                src={GALAXY}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-34"
                animate={{
                    scale: [1, 1.06, 1],
                    x: [0, -18, 0],
                    y: [0, 10, 0],
                }}
                transition={{
                    duration: 34,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(34,211,238,0.16),transparent_32%),linear-gradient(180deg,rgba(2,6,17,0.58),rgba(2,6,17,0.96))]" />

            <motion.div
                className="absolute bottom-[-22%] left-1/2 h-[520px] w-[140%] -translate-x-1/2 rounded-[50%] border-t border-cyan-300/35 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.22),rgba(2,6,17,0.05)_38%,transparent_70%)]"
                animate={{opacity: [0.7, 1, 0.7]}}
                transition={{duration: 5, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(255,255,255,0.45)_1px,transparent_1px),radial-gradient(circle_at_68%_36%,rgba(34,211,238,0.35)_1px,transparent_1px),radial-gradient(circle_at_88%_72%,rgba(168,85,247,0.3)_1px,transparent_1px)] bg-[size:110px_110px] opacity-45" />
        </div>
    );
};