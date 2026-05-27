"use client";

import {motion} from "framer-motion";
import {Orbit, Radar, SunMedium} from "lucide-react";

import type {
    NasaLiveDonki,
    NasaLiveEpic,
    NasaLiveMediaItem,
} from "@/src/types/nasaLive";

import {LiveSignalNode} from "./LiveSignalNode";
import {LiveFlyingStar} from "./LiveFlyingStar";

type Props = {
    locale: {
        dock: {
            earth: string;
            earthFallback: string;
            marsFallbackTitle: string;
            marsFallbackText: string;
            nasaLibrary: string;
            donkiStream: string;
            solarFlares: string;
            geomagneticStorms: string;
            latestEvent: string;
            sources: string;
            sourceEpic: string;
            sourceMars: string;
            sourceDonki: string;
            sourceOnline: string;
            sourceSync: string;
            earthSignal?: string;
            marsSignal?: string;
            solarSignal?: string;
        };
    };
    epic: NasaLiveEpic | null;
    marsMedia: NasaLiveMediaItem | null;
    donki: NasaLiveDonki | null;
};

export const LiveMediaDock = ({
                                  locale,
                                  epic,
                                  marsMedia,
                                  donki,
                              }: Props) => {
    const t = locale.dock;

    const onlineCount = [epic, marsMedia, donki].filter(Boolean).length;

    return (
        <motion.section
            initial={{opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.7}}
            className="relative mt-12 min-h-[560px] overflow-hidden bg-transparent"
        >
            <div className="pointer-events-none absolute inset-0 opacity-40">
                <div
                    className="absolute left-[20%] top-[18%] h-[240px] w-[240px] rounded-full bg-cyan-400/6 blur-[120px]"/>
                <div
                    className="absolute bottom-[10%] right-[18%] h-[260px] w-[260px] rounded-full bg-orange-400/5 blur-[140px]"/>
                <div
                    className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/5 blur-[120px]"/>
            </div>

            <svg
                className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
                viewBox="0 0 1200 560"
                preserveAspectRatio="none"
            >
                <path
                    d="M200 240 C350 120 500 140 620 270 C760 420 920 350 1020 220"
                    stroke="rgba(34,211,238,.18)"
                    strokeWidth="2"
                    fill="none"
                />

                <path
                    d="M200 240 C380 410 560 430 730 350 C850 290 950 250 1020 220"
                    stroke="rgba(251,146,60,.14)"
                    strokeWidth="2"
                    fill="none"
                />

                <path
                    d="M620 270 C570 340 520 400 470 470"
                    stroke="rgba(168,85,247,.16)"
                    strokeWidth="2"
                    fill="none"
                />

                <motion.path
                    d="M200 240 C350 120 500 140 620 270 C760 420 920 350 1020 220"
                    stroke="rgba(34,211,238,.9)"
                    strokeWidth="2.4"
                    fill="none"
                    strokeDasharray="100 900"
                    animate={{strokeDashoffset: [0, -1000]}}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                <motion.path
                    d="M200 240 C380 410 560 430 730 350 C850 290 950 250 1020 220"
                    stroke="rgba(251,146,60,.7)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="120 880"
                    animate={{strokeDashoffset: [0, 1000]}}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </svg>

            <LiveFlyingStar/>

            <div className="relative z-10 h-[560px] w-full">
                <div
                    className="absolute left-1/2 top-[40%] z-10 flex h-[138px] w-[138px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-cyan-300/12 bg-white/[0.02] backdrop-blur-xl"
                >
                    <motion.div
                        className="absolute inset-0 rounded-full border border-cyan-300/10"
                        animate={{rotate: 360}}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />

                    <p className="text-[8px] font-black uppercase tracking-[0.22em] text-cyan-300">
                        {t.sources}
                    </p>

                    <h3 className="mt-1 text-3xl font-black tracking-[-0.07em] text-white">
                        {onlineCount}/3
                    </h3>

                    <div className="mt-2 space-y-0.5 text-[8px] uppercase tracking-[0.1em] text-slate-500">
                        <p>
                            {t.sourceEpic}:{" "}
                            {epic ? t.sourceOnline : t.sourceSync}
                        </p>

                        <p>
                            {t.sourceMars}:{" "}
                            {marsMedia ? t.sourceOnline : t.sourceSync}
                        </p>

                        <p>
                            {t.sourceDonki}:{" "}
                            {donki ? t.sourceOnline : t.sourceSync}
                        </p>
                    </div>
                </div>

                <LiveSignalNode
                    href="/earth"
                    icon={Orbit}
                    tone="cyan"
                    className="absolute left-[4%] top-[8%] h-[235px] w-[235px]"
                    label={t.earthSignal ?? "EPIC Earth feed"}
                    title={t.earth}
                    value={epic?.caption ?? t.earthFallback}
                    meta={epic?.date ?? "NASA DSCOVR"}
                />

                <LiveSignalNode
                    href="/mars"
                    icon={Radar}
                    tone="violet"
                    className="absolute left-[37%] bottom-[4%] h-[215px] w-[215px]"
                    label={t.marsSignal ?? t.nasaLibrary}
                    title={marsMedia?.title ?? t.marsFallbackTitle}
                    value={marsMedia?.description ?? t.marsFallbackText}
                    meta={marsMedia?.dateCreated ?? "NASA Library"}
                />

                <LiveSignalNode
                    href="/space-weather"
                    icon={SunMedium}
                    tone="orange"
                    className="absolute right-[4%] top-[10%] h-[240px] w-[240px]"
                    label={t.solarSignal ?? t.donkiStream}
                    title={`${donki?.cmeEvents ?? 0} CME`}
                    value={`${t.solarFlares}: ${donki?.solarFlares ?? 0} · ${t.geomagneticStorms}: ${donki?.geomagneticStorms ?? 0}`}
                    meta={donki?.latestEventDate?.slice(0, 16) ?? t.latestEvent}
                />
            </div>
        </motion.section>
    );
};