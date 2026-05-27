"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {ArrowRight, Radar} from "lucide-react";

import type {NasaLiveMediaItem} from "@/src/types/nasaLive";

type Props = {
    locale: {
        marsFallbackTitle: string;
        marsFallbackText: string;
        nasaLibrary: string;
        openSource: string;
        marsSignal?: string;
    };
    marsMedia: NasaLiveMediaItem | null;
};

export const MarsArchiveModule = ({locale, marsMedia}: Props) => {
    return (
        <Link href="/mars" className="group block">
            <motion.article
                initial={{opacity: 0, y: 26}}
                whileInView={{opacity: 1, y: 0}}
                whileHover={{y: -6}}
                viewport={{once: true, margin: "-100px"}}
                transition={{duration: 0.7, delay: 0.08}}
                className="relative min-h-[520px] overflow-hidden rounded-[2.4rem] border border-violet-300/10 bg-white/[0.025] backdrop-blur-xl"
            >
                {marsMedia?.imageUrl && (
                    <img
                        src={marsMedia.imageUrl}
                        alt={marsMedia.title}
                        className="absolute inset-0 h-full w-full object-cover opacity-35 transition duration-700 group-hover:scale-105"
                    />
                )}

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,17,0.46),rgba(2,6,17,0.98)),radial-gradient(circle_at_20%_18%,rgba(168,85,247,0.18),transparent_34%)]" />

                <motion.div
                    className="absolute right-[-70px] top-[-70px] h-[230px] w-[230px] rounded-full border border-violet-300/10"
                    animate={{rotate: 360}}
                    transition={{duration: 36, repeat: Infinity, ease: "linear"}}
                />

                <div className="relative z-10 flex min-h-[520px] flex-col justify-between p-8">
                    <div>
                        <div className="inline-flex items-center gap-3 rounded-2xl border border-violet-300/15 bg-violet-300/8 px-4 py-3">
                            <Radar className="h-5 w-5 text-violet-300" />
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-violet-300">
                                    {locale.marsSignal ?? locale.nasaLibrary}
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                    {marsMedia?.dateCreated ?? "NASA Library"}
                                </p>
                            </div>
                        </div>

                        <h3 className="mt-12 line-clamp-3 text-4xl font-black leading-[0.92] tracking-[-0.07em] text-white">
                            {marsMedia?.title ?? locale.marsFallbackTitle}
                        </h3>

                        <p className="mt-7 line-clamp-6 text-sm leading-7 text-slate-300">
                            {marsMedia?.description ?? locale.marsFallbackText}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 text-violet-300">
                        <span className="text-sm font-black uppercase tracking-[0.2em]">
                            {locale.openSource}
                        </span>
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                </div>
            </motion.article>
        </Link>
    );
};