"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {ArrowRight, Orbit, Satellite} from "lucide-react";

import type {NasaLiveEpic} from "@/src/types/nasaLive";

type Props = {
    locale: {
        earth: string;
        earthFallback: string;
        openSource: string;
        earthSignal?: string;
    };
    epic: NasaLiveEpic | null;
};

export const EpicEarthModule = ({locale, epic}: Props) => {
    return (
        <Link href="/earth" className="group block">
            <motion.article
                initial={{opacity: 0, y: 28}}
                whileInView={{opacity: 1, y: 0}}
                whileHover={{y: -6}}
                viewport={{once: true, margin: "-100px"}}
                transition={{duration: 0.7}}
                className="relative min-h-[560px] overflow-hidden rounded-[2.6rem] border border-cyan-300/10 bg-white/[0.025] backdrop-blur-xl"
            >
                {epic?.imageUrl && (
                    <img
                        src={epic.imageUrl}
                        alt={locale.earth}
                        className="absolute right-[-18%] top-[-16%] h-[130%] w-[86%] object-cover opacity-48 transition duration-700 group-hover:scale-105"
                    />
                )}

                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,17,0.98),rgba(2,6,17,0.76),rgba(2,6,17,0.16))]" />

                <motion.div
                    className="absolute right-[8%] top-[16%] h-[380px] w-[380px] rounded-full border border-cyan-300/10"
                    animate={{rotate: 360}}
                    transition={{duration: 55, repeat: Infinity, ease: "linear"}}
                />

                <motion.div
                    className="absolute right-[25%] bottom-[10%] h-[160px] w-[160px] rounded-full border border-cyan-300/12"
                    animate={{rotate: -360}}
                    transition={{duration: 38, repeat: Infinity, ease: "linear"}}
                />

                <div className="relative z-10 flex min-h-[560px] max-w-[62%] flex-col justify-between p-8">
                    <div>
                        <div className="inline-flex items-center gap-3 rounded-2xl border border-cyan-300/15 bg-cyan-300/8 px-4 py-3">
                            <Orbit className="h-5 w-5 text-cyan-300" />

                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">
                                    {locale.earthSignal ?? "EPIC Earth feed"}
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    {epic?.date ?? "NASA DSCOVR"}
                                </p>
                            </div>
                        </div>

                        <h3 className="mt-14 text-6xl font-black leading-[0.88] tracking-[-0.08em] text-white">
                            {locale.earth}
                        </h3>

                        <p className="mt-7 line-clamp-4 text-base leading-8 text-slate-300">
                            {epic?.caption ?? locale.earthFallback}
                        </p>
                    </div>

                    <div>
                        <div className="mb-7 grid grid-cols-2 gap-3">
                            <SignalChip label="Source" value="DSCOVR" />
                            <SignalChip label="System" value="EPIC" />
                        </div>

                        <div className="flex items-center gap-3 text-cyan-300">
                            <span className="text-sm font-black uppercase tracking-[0.2em]">
                                {locale.openSource}
                            </span>
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 right-8 z-10 flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl">
                    <Satellite className="h-4 w-4 text-cyan-300" />
                    <span className="text-xs font-black uppercase tracking-[0.22em] text-slate-300">
                        Earth module
                    </span>
                </div>
            </motion.article>
        </Link>
    );
};

const SignalChip = ({label, value}: {label: string; value: string}) => (
    <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">
            {label}
        </p>
        <p className="mt-1 text-sm font-black text-white">{value}</p>
    </div>
);