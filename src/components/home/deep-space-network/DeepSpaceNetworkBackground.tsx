"use client";

import {motion} from "framer-motion";

export const DeepSpaceNetworkBackground = () => {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.8rem] bg-[#01040d]">
            <motion.div
                className="absolute left-[52%] top-[50%] h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(255,220,160,.95) 0%, rgba(104,180,255,.55) 7%, rgba(88,92,255,.34) 18%, rgba(34,211,238,.18) 31%, rgba(88,28,135,.16) 45%, transparent 68%)",
                    filter: "blur(1px)",
                }}
                animate={{rotate: 360, scale: [1, 1.035, 1]}}
                transition={{rotate: {duration: 90, repeat: Infinity, ease: "linear"}, scale: {duration: 18, repeat: Infinity}}}
            />

            <motion.div
                className="absolute left-[52%] top-[50%] h-[860px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
                style={{
                    background:
                        "conic-gradient(from 20deg, transparent 0deg, rgba(34,211,238,.28) 38deg, transparent 74deg, rgba(168,85,247,.22) 135deg, transparent 190deg, rgba(59,130,246,.26) 255deg, transparent 360deg)",
                    filter: "blur(8px)",
                }}
                animate={{rotate: -360}}
                transition={{duration: 120, repeat: Infinity, ease: "linear"}}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_50%,rgba(2,6,17,0.05),rgba(2,6,17,0.34)_36%,rgba(2,6,17,0.96)_78%),linear-gradient(90deg,rgba(2,6,17,0.96),rgba(2,6,17,0.18),rgba(2,6,17,0.94))]" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_22%,rgba(255,255,255,.48)_1px,transparent_1px),radial-gradient(circle_at_72%_34%,rgba(34,211,238,.38)_1px,transparent_1px),radial-gradient(circle_at_86%_76%,rgba(168,85,247,.32)_1px,transparent_1px)] bg-[size:96px_96px] opacity-55" />
        </div>
    );
};