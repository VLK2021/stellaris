"use client";

import {motion} from "framer-motion";

export const DeepSpaceNetworkBackground = () => {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.8rem] bg-[#01040d]">
            <motion.div
                className="absolute left-[57%] top-[48%] h-[780px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90"
                style={{
                    background:
                        "radial-gradient(circle, rgba(255,225,170,.9) 0%, rgba(120,190,255,.55) 7%, rgba(90,80,255,.42) 17%, rgba(34,211,238,.2) 30%, rgba(88,28,135,.22) 47%, transparent 69%)",
                    filter: "blur(1px)",
                }}
                animate={{rotate: 360, scale: [1, 1.04, 1]}}
                transition={{
                    rotate: {duration: 100, repeat: Infinity, ease: "linear"},
                    scale: {duration: 18, repeat: Infinity, ease: "easeInOut"},
                }}
            />

            <motion.div
                className="absolute left-[57%] top-[48%] h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80"
                style={{
                    background:
                        "conic-gradient(from 25deg, transparent 0deg, rgba(34,211,238,.32) 38deg, transparent 78deg, rgba(168,85,247,.26) 142deg, transparent 205deg, rgba(59,130,246,.3) 270deg, transparent 360deg)",
                    filter: "blur(10px)",
                }}
                animate={{rotate: -360}}
                transition={{duration: 130, repeat: Infinity, ease: "linear"}}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_57%_48%,rgba(2,6,17,0.04),rgba(2,6,17,0.28)_36%,rgba(2,6,17,0.94)_82%),linear-gradient(90deg,rgba(2,6,17,0.98),rgba(2,6,17,0.14),rgba(2,6,17,0.88))]" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_22%,rgba(255,255,255,.45)_1px,transparent_1px),radial-gradient(circle_at_72%_34%,rgba(34,211,238,.38)_1px,transparent_1px),radial-gradient(circle_at_86%_76%,rgba(168,85,247,.32)_1px,transparent_1px)] bg-[size:92px_92px] opacity-55" />
        </div>
    );
};