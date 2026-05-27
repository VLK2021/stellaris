"use client";

import {motion} from "framer-motion";
import {ArrowRight, Radio, Satellite, Signal} from "lucide-react";
import type {NasaLiveApod, NasaLiveEpic} from "@/src/types/nasaLive";

type Props = {
    locale: {
        visual: {
            badge: string;
            primaryAction: string;
            secondaryAction: string;
            liveTitle?: string;
            liveText?: string;
            liveBadge?: string;
            signal?: string;
            lossSignal?: string;
        };
    };
    apod: NasaLiveApod | null;
    epic: NasaLiveEpic | null;
};

const ISS_LIVE_EMBED_URL =
    "https://www.youtube.com/embed/FuuC4dpSQ1M?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1";

export const LiveHeroPanel = ({locale, apod, epic}: Props) => {
    const t = locale.visual;

    return (
        <motion.article
            initial={{opacity: 0, scale: 0.98, y: 28}}
            whileInView={{opacity: 1, scale: 1, y: 0}}
            viewport={{once: true, margin: "-100px"}}
            transition={{duration: 0.7}}
            className="group relative min-h-[480px] overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[#050a16]/80 shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_85%_35%,rgba(16,185,129,0.12),transparent_34%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(2,6,17,0.95),rgba(2,6,17,0.74),rgba(2,6,17,0.45))]" />

            <div className="relative z-10 grid h-full min-h-[480px] gap-5 p-4 sm:p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-6">
                <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/45 shadow-[0_0_80px_rgba(34,211,238,0.12)]">
                    <iframe
                        src={ISS_LIVE_EMBED_URL}
                        title="NASA ISS Live Stream"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                    />

                    <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-red-400/25 bg-red-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-red-200 backdrop-blur-xl">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-red-400" />
                        {t.liveBadge ?? "ISS LIVE"}
                    </div>
                </div>

                <div className="flex flex-col justify-between rounded-[1.6rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl">
                    <div>
                        <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-5 py-3 text-xs font-black uppercase tracking-[0.24em] text-cyan-200">
                            <Radio className="h-4 w-4" />
                            {t.badge}
                        </div>

                        <h3 className="text-3xl font-black leading-[0.95] tracking-[-0.06em] text-white sm:text-4xl lg:text-5xl">
                            {t.liveTitle ?? "Live orbital window"}
                        </h3>

                        <p className="mt-5 text-base leading-8 text-slate-300">
                            {t.liveText ??
                                "Real-time space station video feed with live orbital context. During signal loss, the stream may temporarily show a standby screen."}
                        </p>
                    </div>

                    <div className="mt-7 grid gap-3">
                        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                            <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-300">
                                <Signal className="h-4 w-4 text-cyan-300" />
                                {t.signal ?? "Signal source"}
                            </span>
                            <strong className="text-sm text-cyan-300">NASA / ISS</strong>
                        </div>

                        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                            <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-300">
                                <Satellite className="h-4 w-4 text-cyan-300" />
                                {t.lossSignal ?? "Signal note"}
                            </span>
                            <strong className="text-sm text-slate-100">Live / LOS</strong>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">
                            <a
                                href="https://www.nasa.gov/live/"
                                target="_blank"
                                className="inline-flex items-center gap-3 rounded-full bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:gap-4"
                            >
                                {t.primaryAction}
                                <ArrowRight className="h-4 w-4" />
                            </a>

                            {epic?.imageUrl && (
                                <a
                                    href={epic.imageUrl}
                                    target="_blank"
                                    className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur-xl"
                                >
                                    {t.secondaryAction}
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};