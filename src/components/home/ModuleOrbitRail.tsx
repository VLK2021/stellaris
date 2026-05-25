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
        <section className="relative isolate -mt-px overflow-hidden px-4 pb-10 pt-8 sm:px-6 lg:px-10">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[#020617]">
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-transparent via-[#020617]/80 to-[#020617]" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_82%_0%,rgba(16,185,129,0.12),transparent_26%),linear-gradient(180deg,#020617_0%,#06111f_48%,#020617_100%)]" />

                <motion.div
                    className="absolute inset-0 opacity-[0.12]"
                    animate={{backgroundPosition: ["0px 0px", "160px 120px"]}}
                    transition={{duration: 38, repeat: Infinity, ease: "linear"}}
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, rgba(248,250,252,0.5) 1px, transparent 1px)",
                        backgroundSize: "46px 46px",
                    }}
                />

                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#020617] to-transparent" />
            </div>

            <motion.div
                initial={{opacity: 0, y: 16}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: "-80px"}}
                transition={{duration: 0.55}}
                className="relative mx-auto max-w-[1800px]"
            >
                <div className="mb-5 flex items-center justify-between gap-4">
                    <h2 className="bg-gradient-to-r from-white via-cyan-200 to-emerald-200 bg-clip-text text-xl font-black tracking-[-0.04em] text-transparent sm:text-2xl">
                        {locale.spaceExperience.modulesTitle}
                    </h2>

                    <a
                        href="/explore"
                        className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-slate-300 backdrop-blur-xl transition hover:border-cyan-300/30 hover:text-cyan-200 sm:flex"
                    >
                        {locale.spaceExperience.viewAll}
                        <span>→</span>
                    </a>
                </div>

                <div className="grid grid-cols-13 gap-2.5">
                    {modules.map((item, index) => (
                        <ModuleOrbitRailCard
                            key={item.href}
                            item={item}
                            index={index}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};