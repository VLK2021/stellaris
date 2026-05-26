"use client";

import {motion} from "framer-motion";

type Props = {
    imageUrl?: string | null;
};

export const LiveSpaceBackdrop = ({imageUrl}: Props) => {
    return (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div
                className="absolute inset-0 scale-110 bg-cover bg-center opacity-35 blur-[1px]"
                style={{
                    backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
                    backgroundAttachment: "fixed",
                }}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(168,85,247,0.18),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.15),transparent_32%),linear-gradient(180deg,rgba(2,6,17,0.92),rgba(2,6,17,0.82),rgba(2,6,17,0.96))]" />

            <motion.div
                className="absolute left-[-10%] top-[18%] h-[2px] w-[460px] rotate-[-18deg] bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-70 blur-[1px]"
                animate={{x: ["-20%", "140%"], opacity: [0, 0.8, 0]}}
                transition={{duration: 7, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(circle_at_20px_30px,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:90px_90px]" />

            <motion.div
                className="absolute right-[8%] top-[12%] h-72 w-72 rounded-full border border-cyan-300/15"
                animate={{rotate: 360}}
                transition={{duration: 42, repeat: Infinity, ease: "linear"}}
            />
        </div>
    );
};