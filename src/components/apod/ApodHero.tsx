"use client";

import {motion} from "framer-motion";
import {ExternalLink} from "lucide-react";

import type {ApodExplorerLocale, ApodItem} from "@/src/types/apod/apod.types";

type Props = {
    item: ApodItem | null;
    locale: ApodExplorerLocale;
};

export const ApodHero = ({item, locale}: Props) => {
    return (
        <section className="relative min-h-[620px] overflow-hidden rounded-[2.6rem] border border-white/10 bg-white/[0.035] shadow-[0_30px_110px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
            {item?.url && item.mediaType === "image" && (
                <motion.img
                    key={item.url}
                    src={item.hdUrl ?? item.url}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-70"
                    initial={{scale: 1.06}}
                    animate={{scale: 1}}
                    transition={{duration: 1.2}}
                />
            )}

            {item?.thumbnailUrl && item.mediaType === "video" && (
                <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-70"
                />
            )}

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,17,0.98),rgba(2,6,17,0.75),rgba(2,6,17,0.2)),linear-gradient(0deg,rgba(2,6,17,0.9),transparent_55%)]" />

            <div className="relative z-10 flex min-h-[620px] flex-col justify-end p-6 sm:p-8 lg:p-12">
                <motion.div
                    initial={{opacity: 0, y: 26}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.65}}
                    className="max-w-4xl"
                >
                    <p className="w-fit rounded-full border border-cyan-300/20 bg-cyan-300/8 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
                        {locale.badge}
                    </p>

                    <h1 className="mt-6 text-4xl font-black tracking-[-0.08em] text-white sm:text-6xl lg:text-7xl">
                        {item?.title ?? locale.title}
                    </h1>

                    <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-slate-300">
                        {item?.date ?? locale.text}
                    </p>

                    {item?.explanation && (
                        <p className="mt-6 line-clamp-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                            {item.explanation}
                        </p>
                    )}

                    {item?.hdUrl && (
                        <a
                            href={item.hdUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-8 inline-flex items-center gap-3 rounded-full bg-cyan-300 px-6 py-3 text-sm font-black text-slate-950 transition hover:gap-5"
                        >
                            {locale.hd}
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    )}
                </motion.div>
            </div>
        </section>
    );
};