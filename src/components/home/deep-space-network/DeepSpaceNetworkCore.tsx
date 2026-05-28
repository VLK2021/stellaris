"use client";

import {motion} from "framer-motion";

type Props = {
    title: string;
    status: string;
    subtitle: string;
};

export const DeepSpaceNetworkCore = ({title, status, subtitle}: Props) => {
    return (
        <div className="absolute left-[57%] top-[48%] z-20 -translate-x-1/2 -translate-y-1/2 text-center">
            <motion.div
                className="absolute -inset-[250px] rounded-full border border-cyan-300/10"
                animate={{rotate: 360}}
                transition={{duration: 75, repeat: Infinity, ease: "linear"}}
            />

            <div className="relative rounded-[1.2rem] border border-white/10 bg-black/45 px-7 py-4 backdrop-blur-xl">
                <h3 className="text-sm font-black uppercase tracking-[0.1em] text-white">
                    {title}
                </h3>

                <p className="mt-2 text-sm font-bold text-emerald-300">{status}</p>
                <p className="mt-1.5 text-xs text-slate-300">{subtitle}</p>
            </div>
        </div>
    );
};