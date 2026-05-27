"use client";

import {motion} from "framer-motion";
import {Zap} from "lucide-react";

export const SolarPulseModule = () => {
    return (
        <motion.article
            initial={{opacity: 0, scale: 0.9}}
            whileInView={{opacity: 1, scale: 1}}
            viewport={{once: true}}
            transition={{duration: 0.6}}
            className="absolute bottom-10 left-0 z-20 h-[180px] w-[180px] rounded-full border border-orange-300/20 bg-orange-300/[0.06] shadow-[0_0_60px_rgba(251,146,60,0.22)] backdrop-blur-2xl"
        >
            <motion.div
                className="absolute inset-8 rounded-full bg-orange-300/20 blur-xl"
                animate={{scale: [1, 1.35, 1], opacity: [0.45, 1, 0.45]}}
                transition={{duration: 2.5, repeat: Infinity}}
            />

            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                <Zap className="mb-4 h-8 w-8 text-orange-300" />

                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-300">
                    Solar Pulse
                </p>
            </div>
        </motion.article>
    );
};