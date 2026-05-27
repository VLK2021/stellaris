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
                initial={{opacity: 0, x: 24}}
                whileInView={{opacity: 1, x: 0}}
                whileHover={{x: -5}}
                viewport={{once: true, margin: "-100px"}}
                transition={{duration: 0.65}}
                className="relative min-h-[270px] overflow-hidden rounded-[2.4rem] border border-violet-300/10 bg-white/[0.025] backdrop-blur-xl"
            >
                {marsMedia?.imageUrl && (
                    <img
                        src={marsMedia.imageUrl}
                        alt={marsMedia.title}
                        className="absolute inset-0 h-full w-full object-cover opacity-35 transition duration-700 group-hover:scale-105"
                    />
                )}

                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,17,0.96),rgba(2,6,17,0.76),rgba(2,6,17,0.42)),radial-gradient(circle_at_88%_24%,rgba(168,85,247,0.22),transparent_32%)]" />

                <div className="relative z-10 flex min-h-[270px] items-center gap-6 p-7">
                    <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full border border-violet-300/15 bg-violet-300/8">
                        <Radar className="h-10 w-10 text-violet-300" />
                    </div>

                    <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-violet-300">
                            {locale.marsSignal ?? locale.nasaLibrary}
                        </p>

                        <p className="mt-2 text-xs text-slate-500">
                            {marsMedia?.dateCreated ?? "NASA Image Library"}
                        </p>

                        <h3 className="mt-5 line-clamp-2 text-4xl font-black leading-[0.92] tracking-[-0.07em] text-white">
                            {marsMedia?.title ?? locale.marsFallbackTitle}
                        </h3>

                        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-300">
                            {marsMedia?.description ?? locale.marsFallbackText}
                        </p>

                        <div className="mt-5 flex items-center gap-3 text-violet-300">
                            <span className="text-xs font-black uppercase tracking-[0.2em]">
                                {locale.openSource}
                            </span>
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </div>
                    </div>
                </div>
            </motion.article>
        </Link>
    );
};