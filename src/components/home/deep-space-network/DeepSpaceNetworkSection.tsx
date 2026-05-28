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
        <section className="relative isolate overflow-hidden bg-[#020611] px-4 py-12 text-white sm:px-6 lg:px-10">
            <div className="relative mx-auto max-w-[1680px] overflow-hidden rounded-[2.8rem] border border-white/10 p-5 sm:p-7">
                <DeepSpaceNetworkBackground />

                <div className="relative z-10 grid gap-5 lg:grid-cols-[250px_1fr]">
                    <aside className="pt-5">
                        <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-300">
                            <span className="h-2 w-2 rounded-full bg-cyan-300" />
                            {t.eyebrow}
                        </p>

                        <h2 className="mt-7 text-[42px] font-black uppercase leading-[0.92] tracking-[-0.075em] sm:text-[52px]">
                            {t.title}
                        </h2>

                        <p className="mt-5 text-sm text-slate-200">{t.subtitle}</p>

                        <p className="mt-4 max-w-[230px] text-xs leading-6 text-slate-400">{t.text}</p>

                        <div className="mt-8">
                            <DeepSpaceNetworkStats stats={t.stats} />
                        </div>

                        <Link
                            href="/"
                            className="mt-7 inline-flex items-center gap-4 rounded-2xl border border-cyan-300/30 bg-cyan-300/8 px-5 py-3 text-[11px] font-black uppercase tracking-[0.1em] text-cyan-300 transition hover:gap-6"
                        >
                            {t.viewAll}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </aside>

                    <DeepSpaceNetworkMap locale={t} />
                </div>

                <motion.div
                    initial={{opacity: 0, y: 22}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.55}}
                    className="mt-3"
                >
                    <DeepSpaceNetworkFooter locale={t} />
                </motion.div>
            </div>
        </section>
    );
};