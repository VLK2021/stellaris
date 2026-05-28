"use client";

import {motion} from "framer-motion";

import type {
    ExplorationManifestFeature,
    ExplorationManifestLocale,
} from "@/src/types/explorationManifest";

import {ExplorationManifestIcon} from "./ExplorationManifestIcon";

type Props = {
    feature: ExplorationManifestFeature;
    locale: ExplorationManifestLocale;
    index: number;
};

export const ExplorationManifestCard = ({feature, locale, index}: Props) => {
    const copy = locale.features[feature.id];

    return (
        <motion.article
            initial={{opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            whileHover={{y: -6}}
            viewport={{once: true}}
            transition={{duration: 0.5, delay: index * 0.06}}
            className="relative flex flex-col items-center border-white/10 px-5 text-center lg:border-r lg:last:border-r-0"
        >
            <motion.div
                animate={{y: [0, -6, 0]}}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.25,
                }}
                className="grid h-20 w-20 place-items-center rounded-full border border-cyan-300/18 bg-cyan-300/8 shadow-[0_0_34px_rgba(34,211,238,0.13)] backdrop-blur-xl"
            >
                <ExplorationManifestIcon
                    name={feature.icon}
                    className="h-8 w-8 text-cyan-300"
                />
            </motion.div>

            <h3 className="mt-6 text-xs font-black uppercase tracking-[0.24em] text-white">
                {copy.title}
            </h3>

            <p className="mt-4 max-w-[190px] text-xs leading-6 text-slate-400">
                {copy.text}
            </p>
        </motion.article>
    );
};