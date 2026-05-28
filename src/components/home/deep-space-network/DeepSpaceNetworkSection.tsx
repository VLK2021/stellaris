"use client";

import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {motion} from "framer-motion";

import {useLanguage} from "@/src/context/LanguageContext";
import type {DeepSpaceNetworkLocale} from "@/src/types/deepSpaceNetwork";

import {DeepSpaceNetworkBackground} from "./DeepSpaceNetworkBackground";
import {DeepSpaceNetworkFooter} from "./DeepSpaceNetworkFooter";
import {DeepSpaceNetworkMap} from "./DeepSpaceNetworkMap";
import {DeepSpaceNetworkStats} from "./DeepSpaceNetworkStats";

export const DeepSpaceNetworkSection = () => {
    const {locale} = useLanguage();

    const t = locale.deepSpaceNetwork as DeepSpaceNetworkLocale;

    return (
        <section className="relative isolate overflow-hidden bg-[#020611] px-4 py-14 text-white sm:px-6 lg:px-10">
            <div className="relative mx-auto max-w-[1680px] overflow-hidden rounded-[2.8rem] border border-white/10 p-5 sm:p-8">
                <DeepSpaceNetworkBackground />

                <div className="relative z-10 grid gap-8 lg:grid-cols-[300px_1fr]">
                    <aside className="pt-6">
                        <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
                            <span className="h-2 w-2 rounded-full bg-cyan-300" />
                            {t.eyebrow}
                        </p>

                        <h2 className="mt-8 text-5xl font-black uppercase leading-[0.95] tracking-[-0.07em] sm:text-6xl">
                            {t.title}
                        </h2>

                        <p className="mt-6 text-lg text-slate-200">
                            {t.subtitle}
                        </p>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                            {t.text}
                        </p>

                        <div className="mt-10">
                            <DeepSpaceNetworkStats stats={t.stats} />
                        </div>

                        <Link
                            href="/"
                            className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-cyan-300/30 bg-cyan-300/8 px-6 py-4 text-sm font-black uppercase tracking-[0.08em] text-cyan-300 transition hover:gap-6"
                        >
                            {t.viewAll}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </aside>

                    <DeepSpaceNetworkMap locale={t} />
                </div>

                <motion.div
                    initial={{opacity: 0, y: 24}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.55}}
                    className="mt-6"
                >
                    <DeepSpaceNetworkFooter locale={t} />
                </motion.div>
            </div>
        </section>
    );
};