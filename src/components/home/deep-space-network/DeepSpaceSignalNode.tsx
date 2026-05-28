"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import type {DeepSpaceNetworkLocale, DeepSpaceSignal} from "@/src/types/deepSpaceNetwork";

type Props = {
    signal: DeepSpaceSignal;
    locale: DeepSpaceNetworkLocale;
    index: number;
};

export const DeepSpaceSignalNode = ({signal, locale, index}: Props) => {
    const copy = locale.signals[signal.id];
    const isRight = signal.align === "right";

    return (
        <Link href={signal.href} className="absolute z-30 hidden lg:block" style={{left: signal.x, top: signal.y}}>
            <motion.article
                initial={{opacity: 0, scale: 0.9}}
                whileInView={{opacity: 1, scale: 1}}
                whileHover={{scale: 1.05}}
                viewport={{once: true}}
                transition={{duration: 0.45, delay: index * 0.045}}
                className={`flex items-center gap-2.5 ${isRight ? "" : "flex-row-reverse text-right"}`}
            >
                <motion.div
                    className="relative h-[54px] w-[54px] rounded-full border border-cyan-300/45 bg-cyan-300/10 p-1 shadow-[0_0_24px_rgba(34,211,238,.28)]"
                    animate={{boxShadow: ["0 0 14px rgba(34,211,238,.16)", "0 0 32px rgba(34,211,238,.42)", "0 0 14px rgba(34,211,238,.16)"]}}
                    transition={{duration: 3, repeat: Infinity, delay: index * 0.18}}
                >
                    <img src={signal.image} alt={copy.title} className="h-full w-full rounded-full object-cover" />
                    <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,.9)]" />
                </motion.div>

                <div className="max-w-[138px]">
                    <h4 className="text-[10px] font-black uppercase leading-tight tracking-[0.12em] text-cyan-300">
                        {copy.title}
                    </h4>
                    <p className="mt-1 text-[10px] leading-4 text-slate-300">{copy.region}</p>
                    <p className="text-[10px] leading-4 text-slate-400">{copy.distance}</p>
                    <p className="text-[10px] leading-4 text-emerald-300">{copy.delay}</p>
                </div>
            </motion.article>
        </Link>
    );
};