"use client";

import {motion} from "framer-motion";

const SPACE_BACKGROUND =
    "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001982/GSFC_20171208_Archive_e001982~orig.jpg";

export const NasaArchitectureBackground = () => {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.4rem]">
            <motion.img
                src={SPACE_BACKGROUND}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-28"
                animate={{scale: [1, 1.08, 1], x: [0, -18, 0], y: [0, 10, 0]}}
                transition={{duration: 28, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(34,211,238,0.12),transparent_30%),linear-gradient(180deg,rgba(2,6,17,0.58),rgba(2,6,17,0.9))]" />

            <motion.div
                className="absolute left-[-14%] top-[34%] h-[3px] w-[70%] rotate-[-18deg] bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent blur-[1px]"
                animate={{x: ["-20%", "80%"], opacity: [0, 0.85, 0]}}
                transition={{duration: 7, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute right-[-18%] top-[58%] h-[2px] w-[58%] rotate-[-12deg] bg-gradient-to-r from-transparent via-violet-300/55 to-transparent blur-[1px]"
                animate={{x: ["30%", "-80%"], opacity: [0, 0.7, 0]}}
                transition={{duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1.5}}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(255,255,255,0.35)_1px,transparent_1px),radial-gradient(circle_at_72%_38%,rgba(34,211,238,0.32)_1px,transparent_1px),radial-gradient(circle_at_82%_76%,rgba(168,85,247,0.3)_1px,transparent_1px)] bg-[size:110px_110px] opacity-45" />
        </div>
    );
};