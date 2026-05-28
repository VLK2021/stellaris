"use client";

import {Activity, RadioTower, ShieldCheck} from "lucide-react";
import {motion} from "framer-motion";

import type {DeepSpaceNetworkLocale} from "@/src/types/deepSpaceNetwork";

type Props = {
    stats: DeepSpaceNetworkLocale["stats"];
};

const icons = {
    signal: RadioTower,
    radar: Activity,
    uptime: ShieldCheck,
};

export const DeepSpaceNetworkStats = ({stats}: Props) => {
    return (
        <div className="grid gap-4 rounded-[1.6rem] border border-cyan-300/15 bg-black/25 p-5 backdrop-blur-xl">
            {stats.map((stat, index) => {
                const Icon = icons[stat.icon];

                return (
                    <motion.div
                        key={stat.label}
                        initial={{opacity: 0, x: -18}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.45, delay: index * 0.08}}
                        className="flex items-center gap-4"
                    >
                        <div className="grid h-12 w-12 place-items-center rounded-full border border-cyan-300/20 bg-cyan-300/8">
                            <Icon className="h-5 w-5 text-cyan-300" />
                        </div>

                        <div>
                            <p className="text-2xl font-black text-cyan-300">{stat.value}</p>
                            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                                {stat.label}
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};