"use client";

import {motion} from "framer-motion";
import {ExternalLink} from "lucide-react";

import type {ApodExplorerLocale, ApodItem} from "@/src/types/apod/apod.types";

type Props = {
    item: ApodItem;
    locale: ApodExplorerLocale;
};

export const ApodCard = ({item, locale}: Props) => {
    const image = item.mediaType === "image" ? item.url : item.thumbnailUrl;

    return (
        <motion.article
            initial={{opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            whileHover={{y: -6}}
            viewport={{once: true}}
            transition={{duration: 0.45}}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] backdrop-blur-xl"
        >
            <div className="relative h-72 overflow-hidden bg-black/30">
                {image ? (
                    <img
                        src={image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    />
                ) : (
                    <div className="grid h-full place-items-center text-slate-500">
                        {locale.noData}
                    </div>
                )}

                <div className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300 backdrop-blur-xl">
                    {locale[item.mediaType]}
                </div>
            </div>

            <div className="p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                    {item.date}
                </p>

                <h3 className="mt-3 line-clamp-2 text-2xl font-black tracking-[-0.05em] text-white">
                    {item.title}
                </h3>

                <p className="mt-4 line-clamp-4 text-sm leading-7 text-slate-400">
                    {item.explanation}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                    {item.hdUrl && (
                        <a
                            href={item.hdUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 px-4 py-2 text-xs font-black text-cyan-300"
                        >
                            {locale.hd}
                            <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                    )}

                    {item.url && (
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-black text-slate-300"
                        >
                            {locale.source}
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
};