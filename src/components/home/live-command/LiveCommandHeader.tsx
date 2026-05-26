"use client";

import {motion} from "framer-motion";
import {Activity, Radio} from "lucide-react";

type Props = {
    updatedAt?: string;
    isLoading: boolean;
    error: string | null;
};

export const LiveCommandHeader = ({updatedAt, isLoading, error}: Props) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: "-100px"}}
            transition={{duration: 0.65}}
            className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
            <div className="max-w-5xl">
                <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-5 py-2 text-xs font-black uppercase tracking-[0.28em] text-cyan-300 backdrop-blur-xl">
                    <Radio className="h-4 w-4" />
                    NASA live command center
                </div>

                <h2 className="max-w-5xl bg-gradient-to-r from-white via-cyan-200 to-emerald-300 bg-clip-text text-5xl font-black tracking-[-0.075em] text-transparent sm:text-6xl lg:text-7xl">
                    Real space intelligence in cinematic motion.
                </h2>

                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
                    Live NASA signals from APOD, near-Earth objects, DONKI solar events, EPIC Earth frames, Mars media and ISS orbital telemetry.
                </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-sm font-bold text-slate-300 backdrop-blur-2xl">
                <Activity className="h-4 w-4 text-cyan-300" />
                {error ? "Signal degraded" : isLoading ? "Synchronizing" : "Live signal"}
                <span className="text-cyan-300">
                    {updatedAt ? new Date(updatedAt).toLocaleTimeString() : ""}
                </span>
            </div>
        </motion.div>
    );
};