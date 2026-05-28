import {motion} from "framer-motion";

import type {NasaArchitectureLocale, NasaArchitectureNode as Node} from "@/src/types/nasaArchitecture";
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
            initial={{opacity: 0, x: isRight ? 28 : -28}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{duration: 0.55, delay: index * 0.05}}
            className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl"
        >
            <div className="flex items-center gap-4">
                <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl border ${toneClass[node.tone]}`}>
                    <NasaArchitectureIcon name={node.icon} className="h-7 w-7" />
                </div>

                <div className="min-w-0">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-black uppercase tracking-[0.04em] text-white">
                            {copy.title}
                        </h3>
                        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase ${toneClass[node.tone]}`}>
                            {node.status}
                        </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                        {copy.text}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3">
                        {node.apis.map((api) => (
                            <span key={api} className="text-xs font-bold text-slate-300">
                                {api}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.article>
    );
};