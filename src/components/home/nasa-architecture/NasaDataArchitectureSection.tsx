"use client";

import {motion} from "framer-motion";

import type {NasaArchitectureLocale} from "@/src/types/nasaArchitecture";
import {NASA_ARCHITECTURE_NODES} from "@/src/constants/nasaArchitecture.constants";

import {NasaArchitectureBackground} from "./NasaArchitectureBackground";
import {NasaArchitectureCore} from "./NasaArchitectureCore";
import {NasaArchitectureFeatureStrip} from "./NasaArchitectureFeatureStrip";
import {NasaArchitectureNode} from "./NasaArchitectureNode";
import {NasaArchitectureOrbit} from "./NasaArchitectureOrbit";
import {NasaArchitectureStat} from "./NasaArchitectureStat";

type Props = {
    locale: NasaArchitectureLocale;
};

export const NasaDataArchitectureSection = ({locale}: Props) => {
    const leftNodes = NASA_ARCHITECTURE_NODES.filter((node) => node.position === "left");
    const rightNodes = NASA_ARCHITECTURE_NODES.filter((node) => node.position === "right");

    return (
        <section className="relative isolate overflow-hidden bg-[#020611] px-4 py-12 text-white sm:px-6 lg:px-10">
            <div className="relative mx-auto max-w-[1680px] overflow-hidden rounded-[2.4rem] border border-white/10 p-4 sm:p-6 lg:p-8">
                <NasaArchitectureBackground />

                <div className="relative z-10">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.6}}
                        className="mx-auto max-w-3xl text-center"
                    >
                        <p className="text-[11px] font-black uppercase tracking-[0.32em] text-cyan-300">
                            {locale.badge}
                        </p>

                        <h2 className="mt-3 text-3xl font-black tracking-[-0.07em] sm:text-5xl">
                            {locale.title}
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-300">
                            {locale.text}
                        </p>
                    </motion.div>

                    <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                        {locale.stats.map((stat, index) => (
                            <NasaArchitectureStat key={stat.label} stat={stat} index={index} />
                        ))}
                    </div>

                    <div className="relative mt-8 grid gap-4 lg:min-h-[500px] lg:grid-cols-[1fr_260px_1fr]">
                        <div className="grid gap-4">
                            {leftNodes.map((node, index) => (
                                <NasaArchitectureNode key={node.id} node={node} locale={locale} index={index} />
                            ))}
                        </div>

                        <div className="relative flex items-center justify-center">
                            <NasaArchitectureOrbit />
                            <NasaArchitectureCore title={locale.coreTitle} subtitle={locale.coreSubtitle} />
                        </div>

                        <div className="grid gap-4">
                            {rightNodes.map((node, index) => (
                                <NasaArchitectureNode key={node.id} node={node} locale={locale} index={index + 4} />
                            ))}
                        </div>
                    </div>

                    <div className="mt-7">
                        <NasaArchitectureFeatureStrip features={locale.features} />
                    </div>
                </div>
            </div>
        </section>
    );
};