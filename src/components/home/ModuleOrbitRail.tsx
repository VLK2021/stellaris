"use client";

import {motion} from "framer-motion";

import type {NasaAsset} from "@/src/types/nasa";
import {useLanguage} from "@/src/context";

import {getModuleItems} from "./moduleOrbitRail.data";
import {ModuleOrbitRailCard} from "./ModuleOrbitRailCard";

type Props = {
    assets: NasaAsset[];
};

export const ModuleOrbitRail = (_props: Props) => {
    const {locale} = useLanguage();
    const modules = getModuleItems(locale);

    return (
        <section className="relative px-4 pb-8 pt-3 sm:px-6 lg:px-10">
            <motion.div
                initial={{opacity: 0, y: 14}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: "-80px"}}
                transition={{duration: 0.5}}
                className="relative mx-auto max-w-[1800px]"
            >
                <div className="mb-4 flex items-center justify-between gap-4">
                    <h2 className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-success)] bg-clip-text text-xl font-black tracking-[-0.04em] text-transparent sm:text-2xl">
                        {locale.spaceExperience.modulesTitle}
                    </h2>

                    <a
                        href="/explore"
                        className="hidden items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-3 py-1.5 text-xs font-bold text-[var(--color-text-muted)] backdrop-blur-xl transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-accent)] sm:flex"
                    >
                        {locale.spaceExperience.viewAll}
                        <span>→</span>
                    </a>
                </div>

                <div className="grid grid-cols-13 gap-2">
                    {modules.map((item, index) => (
                        <ModuleOrbitRailCard key={item.href} item={item} index={index} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};