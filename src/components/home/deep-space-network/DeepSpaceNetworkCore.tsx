"use client";

import {motion} from "framer-motion";

type Props = {
    title: string;
    status: string;
    subtitle: string;
};

export const DeepSpaceNetworkCore = ({title, status, subtitle}: Props) => {
    return (
        <div className="absolute left-1/2 top-[49%] z-20 hidden -translate-x-1/2 -translate-y-1/2 text-center lg:block">
            <motion.div
                className="absolute -inset-[260px] rounded-full border border-cyan-300/10"
                animate={{rotate: 360}}
                transition={{duration: 70, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute -inset-[190px] rounded-full border border-blue-300/15"
                animate={{rotate: -360}}
                transition={{duration: 56, repeat: Infinity, ease: "linear"}}
            />

            <div className="relative rounded-[1.25rem] border border-white/10 bg-black/45 px-7 py-4 backdrop-blur-xl">
                <h3 className="text-base font-black uppercase tracking-[0.08em] text-white">
                    {title}
                </h3>

                <p className="mt-2 text-sm font-bold text-emerald-300">
                    {status}
                </p>

                <p className="mt-1.5 text-xs text-slate-300">
                    {subtitle}
                </p>
            </div>
        </div>
    );
};