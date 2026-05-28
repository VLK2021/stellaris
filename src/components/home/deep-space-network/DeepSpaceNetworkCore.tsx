"use client";

import {motion} from "framer-motion";

type Props = {
    title: string;
    status: string;
    subtitle: string;
};

export const DeepSpaceNetworkCore = ({title, status, subtitle}: Props) => {
    return (
        <div className="absolute left-1/2 top-[48%] z-20 hidden -translate-x-1/2 -translate-y-1/2 text-center lg:block">
            <motion.div
                className="absolute -inset-48 rounded-full border border-cyan-300/10"
                animate={{rotate: 360}}
                transition={{duration: 60, repeat: Infinity, ease: "linear"}}
            />
            <motion.div
                className="absolute -inset-32 rounded-full border border-blue-300/15"
                animate={{rotate: -360}}
                transition={{duration: 48, repeat: Infinity, ease: "linear"}}
            />

            <div className="relative rounded-[1.4rem] border border-white/10 bg-black/45 px-8 py-5 backdrop-blur-xl">
                <h3 className="text-lg font-black uppercase tracking-[0.08em] text-white">
                    {title}
                </h3>
                <p className="mt-3 text-sm font-bold text-emerald-300">{status}</p>
                <p className="mt-2 text-xs text-slate-300">{subtitle}</p>
            </div>
        </div>
    );
};