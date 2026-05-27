"use client";

import {motion} from "framer-motion";
import {Radio} from "lucide-react";

type Props = {
    text: string;
};

export const LiveCommandLoader = ({text}: Props) => {
    return (
        <motion.div
            initial={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.45}}
            className="absolute inset-0 z-50 grid place-items-center bg-[#020611]/90 backdrop-blur-2xl"
        >
            <div className="relative flex flex-col items-center text-center">
                <div className="absolute h-44 w-44 rounded-full border border-cyan-300/15" />
                <div className="absolute h-32 w-32 animate-spin rounded-full border border-cyan-300/20 border-t-cyan-300" />
                <div className="absolute h-20 w-20 rounded-full bg-cyan-300/10 blur-2xl" />

                <div className="relative grid h-16 w-16 place-items-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-300 shadow-[0_0_45px_rgba(34,211,238,0.25)]">
                    <Radio className="h-7 w-7" />
                </div>

                <p className="mt-8 text-xs font-black uppercase tracking-[0.32em] text-cyan-300">
                    {text}
                </p>

                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
                    Synchronizing NASA visual feeds, orbital telemetry and live space signals.
                </p>
            </div>
        </motion.div>
    );
};