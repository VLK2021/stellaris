"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {ArrowRight, Orbit} from "lucide-react";

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
                initial={{opacity: 0, y: 26}}
                whileInView={{opacity: 1, y: 0}}
                whileHover={{y: -6}}
                viewport={{once: true, margin: "-100px"}}
                transition={{duration: 0.7}}
                className="relative min-h-[520px] overflow-hidden rounded-[2.4rem] border border-cyan-300/10 bg-white/[0.025] backdrop-blur-xl"
            >
                {epic?.imageUrl && (
                    <img
                        src={epic.imageUrl}
                        alt={locale.earth}
                        className="absolute right-[-18%] top-[-10%] h-[118%] w-[82%] object-cover opacity-50 transition duration-700 group-hover:scale-105"
                    />
                )}

                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,17,0.98),rgba(2,6,17,0.82),rgba(2,6,17,0.18))]" />

                <div className="absolute right-[-90px] top-[-90px] h-[380px] w-[380px] rounded-full border border-cyan-300/10" />
                <div className="absolute right-[80px] bottom-[60px] h-[180px] w-[180px] rounded-full border border-cyan-300/10" />

                <div className="relative z-10 flex min-h-[520px] flex-col justify-between p-8">
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

                        <h3 className="mt-12 max-w-lg text-5xl font-black leading-[0.9] tracking-[-0.075em] text-white">
                            {locale.earth}
                        </h3>

                        <p className="mt-7 line-clamp-4 max-w-xl text-base leading-8 text-slate-300">
                            {epic?.caption ?? locale.earthFallback}
                        </p>
                    </div>

                    <Action label={locale.openSource} />
                </div>
            </motion.article>
        </Link>
    );
};

const Action = ({label}: {label: string}) => (
    <div className="flex items-center gap-3 text-cyan-300">
        <span className="text-sm font-black uppercase tracking-[0.2em]">{label}</span>
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
    </div>
);