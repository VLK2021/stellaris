"use client";

import {motion} from "framer-motion";
import {ArrowRight, Orbit} from "lucide-react";
import type {NasaLiveApod, NasaLiveEpic} from "@/src/types/nasaLive";

type Props = {
    apod: NasaLiveApod | null;
    epic: NasaLiveEpic | null;
};

export const LiveHeroPanel = ({apod, epic}: Props) => {
    return (
        <motion.article
            initial={{opacity: 0, scale: 0.98, y: 28}}
            whileInView={{opacity: 1, scale: 1, y: 0}}
            viewport={{once: true, margin: "-100px"}}
            transition={{duration: 0.7}}
            className="group relative min-h-[720px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.055] shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
        >
            {apod?.imageUrl && (
                <img
                    src={apod.imageUrl}
                    alt={apod.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-1000 group-hover:scale-105"
                />
            )}

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,17,0.96),rgba(2,6,17,0.72),rgba(2,6,17,0.22)),radial-gradient(circle_at_72%_28%,rgba(34,211,238,0.2),transparent_26%)]" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/70 to-transparent" />

            <motion.div
                className="absolute right-10 top-12 h-64 w-64 rounded-full border border-cyan-300/25"
                animate={{rotate: 360}}
                transition={{duration: 28, repeat: Infinity, ease: "linear"}}
            >
                <div className="absolute -left-2 top-1/2 h-5 w-5 rounded-full bg-cyan-300 shadow-[0_0_35px_rgba(34,211,238,0.9)]" />
            </motion.div>

            <div className="relative z-10 flex h-full flex-col justify-between p-7 sm:p-9 lg:p-11">
                <div className="w-fit rounded-full border border-white/15 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.28em] text-cyan-200 backdrop-blur-xl">
                    NASA visual stream
                </div>

                <div className="max-w-3xl">
                    <p className="mb-4 text-sm font-black text-cyan-300">{apod?.date}</p>

                    <h3 className="text-5xl font-black tracking-[-0.075em] text-white sm:text-6xl">
                        {apod?.title ?? "NASA deep space visual"}
                    </h3>

                    <p className="mt-6 line-clamp-5 max-w-3xl text-base leading-8 text-slate-200">
                        {apod?.explanation}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <a
                            href={apod?.hdUrl ?? apod?.imageUrl ?? "#"}
                            target="_blank"
                            className="inline-flex items-center gap-3 rounded-full bg-cyan-300 px-6 py-4 text-sm font-black text-slate-950 transition hover:gap-4"
                        >
                            Open HD source
                            <ArrowRight className="h-4 w-4" />
                        </a>

                        {epic?.imageUrl && (
                            <a
                                href={epic.imageUrl}
                                target="_blank"
                                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-6 py-4 text-sm font-black text-white backdrop-blur-xl"
                            >
                                <Orbit className="h-4 w-4 text-cyan-300" />
                                EPIC Earth frame
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    );
};