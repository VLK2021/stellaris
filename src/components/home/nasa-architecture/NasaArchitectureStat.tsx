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
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            whileHover={{y: -4}}
            viewport={{once: true}}
            transition={{duration: 0.45, delay: index * 0.05}}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl"
        >
            <motion.div
                animate={{rotate: [0, 8, -8, 0]}}
                transition={{duration: 5, repeat: Infinity, delay: index * 0.3}}
                className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-300/10 bg-cyan-300/8"
            >
                <NasaArchitectureIcon name={stat.icon} className="h-5 w-5 text-cyan-300" />
            </motion.div>

            <div>
                <p className="text-2xl font-black tracking-[-0.06em] text-cyan-300">
                    {stat.value}
                </p>

                <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                    {stat.label}
                </p>
            </div>
        </motion.article>
    );
};