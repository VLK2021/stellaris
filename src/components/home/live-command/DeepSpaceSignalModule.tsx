"use client";

import {motion} from "framer-motion";
import {Radio} from "lucide-react";

export const DeepSpaceSignalModule = () => {
    return (
        <motion.article
            initial={{opacity: 0, scale: 0.9}}
            whileInView={{opacity: 1, scale: 1}}
            viewport={{once: true}}
            transition={{duration: 0.6, delay: 0.12}}
            className="absolute right-0 top-10 z-20 h-[160px] w-[160px] rotate-12 rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.05] shadow-[0_0_60px_rgba(34,211,238,0.18)] backdrop-blur-2xl"
        >
            <motion.div
                animate={{rotate: 360}}
                transition={{duration: 12, repeat: Infinity, ease: "linear"}}
                className="absolute inset-5 rounded-full border border-cyan-300/15"
            />

            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                <Radio className="mb-4 h-7 w-7 text-cyan-300" />

                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
                    Deep Signal
                </p>
            </div>
        </motion.article>
    );
};