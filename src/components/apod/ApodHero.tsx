"use client";

import {motion} from "framer-motion";
import {ExternalLink} from "lucide-react";

import type {ApodExplorerLocale, ApodItem} from "@/src/types/apod/apod.types";

type Props = {
    item: ApodItem | null;
    locale: ApodExplorerLocale;
};

export const ApodHero = ({item, locale}: Props) => {
    const image =
        item?.mediaType === "image"
            ? item.hdUrl ?? item.url
            : item?.thumbnailUrl;

    return (
        <section className="relative min-h-[540px] overflow-hidden rounded-[2.15rem] border border-white/10 bg-white/[0.03] shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
            {image && (
                <motion.img
                    key={image}
                    src={image}
                    alt={item?.title ?? locale.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-68"
                    initial={{scale: 1.065}}
                    animate={{scale: 1}}
                    transition={{duration: 1.25}}
                />
            )}

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,17,0.98),rgba(2,6,17,0.74),rgba(2,6,17,0.18)),linear-gradient(0deg,rgba(2,6,17,0.92),transparent_58%)]" />

            <motion.div
                className="absolute right-12 top-12 h-24 w-24 rounded-full border border-cyan-300/20"
                animate={{rotate: 360}}
                transition={{duration: 26, repeat: Infinity, ease: "linear"}}
            />

            <div className="relative z-10 flex min-h-[540px] flex-col justify-end p-5 sm:p-7 lg:p-10">
                <motion.div
                    initial={{opacity: 0, y: 22}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.65}}
                    className="max-w-3xl"
                >
                    <p className="w-fit rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.26em] text-cyan-300">
                        {locale.badge}
                    </p>

                    <h1 className="mt-5 text-3xl font-black tracking-[-0.075em] text-white sm:text-5xl lg:text-6xl">
                        {item?.title ?? locale.title}
                    </h1>

                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-300">
                        {item?.date ?? locale.text}
                    </p>

                    {item?.explanation && (
                        <p className="mt-5 line-clamp-4 max-w-2xl text-[13px] leading-7 text-slate-300 sm:text-sm">
                            {item.explanation}
                        </p>
                    )}

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        {item?.hdUrl && (
                            <a
                                href={item.hdUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2.5 rounded-full bg-cyan-300 px-5 py-2.5 text-xs font-black text-slate-950 transition hover:gap-4"
                            >
                                {locale.hd}
                                <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                        )}

                        {item?.copyright && (
                            <span className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[11px] text-slate-300 backdrop-blur-xl">
                                © {item.copyright}
                            </span>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};