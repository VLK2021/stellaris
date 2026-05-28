"use client";

import {motion} from "framer-motion";

import type {ExplorationManifestLocale} from "@/src/types/explorationManifest";

type Props = {
    locale: ExplorationManifestLocale;
};

export const ExplorationManifestQuote = ({locale}: Props) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.6}}
            className="mx-auto mt-20 max-w-4xl rounded-[1.8rem] border border-white/15 bg-black/25 px-8 py-8 text-center shadow-[0_0_70px_rgba(34,211,238,0.08)] backdrop-blur-xl"
        >
            <p className="text-lg font-black uppercase leading-8 tracking-[0.28em] text-white sm:text-2xl">
                {locale.quote}
            </p>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.32em] text-slate-500">
                {locale.quoteAuthor}
            </p>
        </motion.div>
    );
};