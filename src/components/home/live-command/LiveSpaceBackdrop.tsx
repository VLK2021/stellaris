"use client";

import {motion} from "framer-motion";

type Props = {
    imageUrl?: string | null;
};

export const LiveSpaceBackdrop = ({imageUrl}: Props) => {
    return (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div
                className="absolute inset-0 scale-125 bg-cover bg-center opacity-45 blur-[1px]"
                style={{
                    backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
                }}
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,17,0.88),rgba(2,6,17,0.76),rgba(2,6,17,0.97)),radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.24),transparent_28%),radial-gradient(circle_at_75%_22%,rgba(168,85,247,0.2),transparent_32%),radial-gradient(circle_at_50%_88%,rgba(16,185,129,0.16),transparent_35%)]" />

            <div className="absolute inset-0 opacity-55 [background-image:radial-gradient(circle_at_24px_32px,rgba(255,255,255,0.55)_1px,transparent_1px),radial-gradient(circle_at_70px_82px,rgba(34,211,238,0.35)_1px,transparent_1px)] [background-size:110px_110px,170px_170px]" />

            <motion.div
                className="absolute left-[-20%] top-[24%] h-[2px] w-[620px] rotate-[-19deg] bg-gradient-to-r from-transparent via-cyan-200 to-transparent opacity-80 blur-[1px]"
                animate={{x: ["-10%", "155%"], opacity: [0, 0.9, 0]}}
                transition={{duration: 8, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute right-[-120px] top-[8%] h-[520px] w-[520px] rounded-full border border-cyan-300/10"
                animate={{rotate: 360}}
                transition={{duration: 55, repeat: Infinity, ease: "linear"}}
            />

            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#020611] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#020611] to-transparent" />
        </div>
    );
};