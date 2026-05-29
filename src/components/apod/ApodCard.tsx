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
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            whileHover={{y: -5}}
            viewport={{once: true}}
            transition={{duration: 0.42}}
            className="group overflow-hidden rounded-[1.65rem] border border-white/10 bg-white/[0.032] shadow-[0_18px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl"
        >
            <div className="relative h-60 overflow-hidden bg-black/30">
                {image ? (
                    <img
                        src={image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="grid h-full place-items-center text-sm text-slate-500">
                        {locale.noData}
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#020611]/70 to-transparent opacity-70" />

                <div className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-cyan-300 backdrop-blur-xl">
                    {locale[item.mediaType]}
                </div>
            </div>

            <div className="p-4.5 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300">
                    {item.date}
                </p>

                <h3 className="mt-2.5 line-clamp-2 text-xl font-black tracking-[-0.045em] text-white">
                    {item.title}
                </h3>

                <p className="mt-3.5 line-clamp-4 text-[13px] leading-6 text-slate-400">
                    {item.explanation}
                </p>

                <div className="mt-4 flex flex-wrap gap-2.5">
                    {item.hdUrl && (
                        <a
                            href={item.hdUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 px-3.5 py-2 text-[11px] font-black text-cyan-300 transition hover:border-cyan-300/50"
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
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-[11px] font-black text-slate-300 transition hover:border-white/20"
                        >
                            {locale.source}
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
};