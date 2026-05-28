import {motion} from "framer-motion";

import type {
    NasaArchitectureLocale,
    NasaArchitectureNode as Node,
} from "@/src/types/nasaArchitecture";
import {NasaArchitectureIcon} from "./NasaArchitectureIcon";

type Props = {
    node: Node;
    locale: NasaArchitectureLocale;
    index: number;
};

const toneClass = {
    cyan: "text-cyan-300 border-cyan-300/15 bg-cyan-300/8",
    green: "text-emerald-300 border-emerald-300/15 bg-emerald-300/8",
    orange: "text-orange-300 border-orange-300/15 bg-orange-300/8",
    violet: "text-violet-300 border-violet-300/15 bg-violet-300/8",
    blue: "text-blue-300 border-blue-300/15 bg-blue-300/8",
    pink: "text-pink-300 border-pink-300/15 bg-pink-300/8",
};

export const NasaArchitectureNode = ({node, locale, index}: Props) => {
    const copy = locale.nodes[node.id];
    const isRight = node.position === "right";

    return (
        <motion.article
            initial={{opacity: 0, x: isRight ? 24 : -24}}
            whileInView={{opacity: 1, x: 0}}
            whileHover={{y: -4, scale: 1.01}}
            viewport={{once: true}}
            transition={{duration: 0.5, delay: index * 0.04}}
            className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl"
        >
            <div className="absolute right-[-40px] top-[-40px] h-24 w-24 rounded-full bg-cyan-300/5 blur-2xl" />

            <div className="relative z-10 flex items-center gap-3">
                <motion.div
                    animate={{rotate: [0, 6, -6, 0]}}
                    transition={{duration: 5, repeat: Infinity, delay: index * 0.2}}
                    className={`grid h-13 w-13 shrink-0 place-items-center rounded-2xl border ${toneClass[node.tone]}`}
                >
                    <NasaArchitectureIcon name={node.icon} className="h-6 w-6" />
                </motion.div>

                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-black uppercase tracking-[0.06em] text-white">
                            {copy.title}
                        </h3>

                        <span className={`rounded-full border px-2 py-0.5 text-[9px] font-black uppercase ${toneClass[node.tone]}`}>
                            {node.status}
                        </span>
                    </div>

                    <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-400">
                        {copy.text}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                        {node.apis.map((api) => (
                            <span key={api} className="text-[11px] font-bold text-slate-300">
                                {api}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.article>
    );
};