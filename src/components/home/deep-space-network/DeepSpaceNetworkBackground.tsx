"use client";

import {motion} from "framer-motion";

const GALAXY =
    "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001982/GSFC_20171208_Archive_e001982~orig.jpg";

export const DeepSpaceNetworkBackground = () => {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.8rem]">
            <motion.img
                src={GALAXY}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-45"
                animate={{scale: [1, 1.08, 1], x: [0, -22, 0], y: [0, 14, 0]}}
                transition={{duration: 34, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_46%,rgba(34,211,238,0.13),transparent_34%),linear-gradient(90deg,rgba(2,6,17,0.96),rgba(2,6,17,0.55),rgba(2,6,17,0.94))]" />

            <motion.div
                className="absolute left-[-18%] top-[28%] h-[2px] w-[65%] rotate-[-18deg] bg-gradient-to-r from-transparent via-cyan-300/65 to-transparent blur-[1px]"
                animate={{x: ["-20%", "95%"], opacity: [0, 0.8, 0]}}
                transition={{duration: 8, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_22%,rgba(255,255,255,0.42)_1px,transparent_1px),radial-gradient(circle_at_78%_34%,rgba(34,211,238,0.32)_1px,transparent_1px),radial-gradient(circle_at_65%_78%,rgba(168,85,247,0.26)_1px,transparent_1px)] bg-[size:120px_120px] opacity-45" />
        </div>
    );
};