"use client";

import {motion} from "framer-motion";
import {Orbit} from "lucide-react";

import type {NasaLiveNeo} from "@/src/types/nasaLive";

type Props = {
    neo: NasaLiveNeo | null;
    locale: {
        neo: string;
        objects: string;
        syncing: string;
        approach?: string;
        radarText?: string;
        kmFromEarth: string;
    };
};

export const NeoApproachModule = ({neo, locale}: Props) => {
    return (
        <motion.article
            initial={{opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: "-100px"}}
            transition={{duration: 0.6}}
            className="relative min-h-[265px] overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-white/[0.045] p-6 shadow-[0_22px_75px_rgba(0,0,0,0.34)] backdrop-blur-2xl"
        >
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-300/15 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(34,211,238,0.18),transparent_34%)]" />

            <div className="relative z-10 grid gap-6 sm:grid-cols-[170px_1fr] sm:items-center">
                <div className="relative mx-auto aspect-square w-[160px] rounded-full border border-cyan-300/20 bg-black/25">
                    <motion.div
                        className="absolute inset-4 rounded-full border border-cyan-300/25"
                        animate={{rotate: 360}}
                        transition={{duration: 18, repeat: Infinity, ease: "linear"}}
                    >
                        <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.9)]" />
                    </motion.div>

                    <div className="absolute inset-0 grid place-items-center">
                        <div className="grid h-20 w-20 place-items-center rounded-full bg-cyan-300/10 shadow-[0_0_45px_rgba(34,211,238,0.25)]">
                            <Orbit className="h-9 w-9 text-cyan-300" />
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.28em] text-cyan-300">
                        {locale.neo}
                    </p>

                    <h3 className="mt-3 text-4xl font-black tracking-[-0.06em] text-white">
                        {neo ? `${neo.totalToday} ${locale.objects}` : locale.syncing}
                    </h3>

                    <p className="mt-4 text-sm leading-6 text-slate-300">
                        {locale.radarText}
                    </p>

                    <p className="mt-4 text-sm font-bold text-cyan-300">
                        {neo
                            ? `${locale.approach}: ${neo.closestName} · ${neo.closestDistanceKm.toLocaleString()} ${locale.kmFromEarth}`
                            : locale.syncing}
                    </p>
                </div>
            </div>
        </motion.article>
    );
};