import {motion} from "framer-motion";

import type {NasaArchitectureStat as Stat} from "@/src/types/nasaArchitecture";
import {NasaArchitectureIcon} from "./NasaArchitectureIcon";

type Props = {
    stat: Stat;
    index: number;
};

export const NasaArchitectureStat = ({stat, index}: Props) => {
    return (
        <motion.article
            initial={{opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.45, delay: index * 0.06}}
            className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.035] px-5 py-4 backdrop-blur-xl"
        >
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-300/10 bg-cyan-300/8">
                <NasaArchitectureIcon name={stat.icon} className="h-5 w-5 text-cyan-300" />
            </div>

            <div>
                <p className="text-3xl font-black tracking-[-0.06em] text-cyan-300">
                    {stat.value}
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    {stat.label}
                </p>
            </div>
        </motion.article>
    );
};