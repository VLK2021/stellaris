"use client";

import {motion} from "framer-motion";

import type {ExplorationManifestLocale} from "@/src/types/explorationManifest";

type Props = {
    locale: ExplorationManifestLocale;
};

export const ExplorationManifestHeader = ({locale}: Props) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 22}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.65}}
            className="mx-auto max-w-4xl text-center"
        >
            <p className="text-xs font-black uppercase tracking-[0.38em] text-cyan-300">
                {locale.eyebrow}
            </p>

            <h2 className="mt-5 text-4xl font-black uppercase tracking-[0.16em] text-white sm:text-5xl lg:text-6xl">
                {locale.title}
            </h2>

            <div className="mx-auto mt-6 h-px w-20 bg-cyan-300/80 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 tracking-[0.08em] text-slate-300 sm:text-base">
                {locale.text}
            </p>
        </motion.div>
    );
};