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

export const LiveMediaDock = ({locale, epic, marsMedia, donki}: Props) => {
    const t = locale.dock;
    const onlineCount = [epic, marsMedia, donki].filter(Boolean).length;

    return (
        <motion.section
            initial={{opacity: 0, y: 28}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: "-100px"}}
            transition={{duration: 0.75}}
            className="relative mt-12 min-h-[560px] overflow-hidden rounded-[2.6rem]"
        >
            <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_18%_40%,rgba(34,211,238,0.1),transparent_28%),radial-gradient(circle_at_50%_58%,rgba(168,85,247,0.1),transparent_26%),radial-gradient(circle_at_84%_38%,rgba(251,146,60,0.1),transparent_28%)]"/>

            <svg
                className="pointer-events-none absolute inset-0 h-full w-full opacity-75"
                viewBox="0 0 1200 560"
                preserveAspectRatio="none"
            >
                <path d="M205 250 C360 150 500 165 610 275 C760 430 920 360 1010 235" stroke="rgba(34,211,238,.2)"
                      strokeWidth="2" fill="none"/>
                <path d="M205 250 C390 395 560 430 720 360 C850 300 940 260 1010 235" stroke="rgba(251,146,60,.16)"
                      strokeWidth="2" fill="none"/>
                <path d="M610 275 C570 335 530 390 500 445" stroke="rgba(168,85,247,.22)" strokeWidth="2" fill="none"/>

                <motion.path
                    d="M205 250 C360 150 500 165 610 275 C760 430 920 360 1010 235"
                    stroke="rgba(34,211,238,.85)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="80 920"
                    animate={{strokeDashoffset: [0, -1000]}}
                    transition={{duration: 5.5, repeat: Infinity, ease: "linear"}}
                />
            </svg>

            <LiveFlyingStar/>

            <div
                className="absolute left-1/2 top-[45%] z-10 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8 bg-white/[0.025] backdrop-blur-xl">
                <motion.div
                    className="absolute inset-0 rounded-full border border-cyan-300/12"
                    animate={{rotate: 360}}
                    transition={{duration: 30, repeat: Infinity, ease: "linear"}}
                />

                <div className="flex h-full flex-col items-center justify-center text-center">
                    <p className="text-[8px] font-black uppercase tracking-[0.26em] text-cyan-300">
                        {t.sources}
                    </p>

                    <h3 className="mt-2 text-3xl font-black tracking-[-0.07em] text-white">
                        {onlineCount}/3
                    </h3>

                    <div className="mt-3 space-y-1 text-[9px] uppercase tracking-[0.13em] text-slate-500">
                        <p>{t.sourceEpic}: {epic ? t.sourceOnline : t.sourceSync}</p>
                        <p>{t.sourceMars}: {marsMedia ? t.sourceOnline : t.sourceSync}</p>
                        <p>{t.sourceDonki}: {donki ? t.sourceOnline : t.sourceSync}</p>
                    </div>
                </div>
            </div>
            <LiveSignalNode
                href="/earth"
                icon={Orbit}
                tone="cyan"
                className="left-[5%] top-[12%] h-[225px] w-[225px]"
                label={t.earthSignal ?? "EPIC Earth feed"}
                title={t.earth}
                value={epic?.caption ?? t.earthFallback}
                meta={epic?.date ?? "NASA DSCOVR"}
            />

            <LiveSignalNode
                href="/mars"
                icon={Radar}
                tone="violet"
                className="left-[38%] bottom-[6%] h-[205px] w-[205px]"
                label={t.marsSignal ?? t.nasaLibrary}
                title={marsMedia?.title ?? t.marsFallbackTitle}
                value={marsMedia?.description ?? t.marsFallbackText}
                meta={marsMedia?.dateCreated ?? "NASA Library"}
            />

            <LiveSignalNode
                href="/space-weather"
                icon={SunMedium}
                tone="orange"
                className="right-[5%] top-[14%] h-[230px] w-[230px]"
                label={t.solarSignal ?? t.donkiStream}
                title={`${donki?.cmeEvents ?? 0} CME`}
                value={`${t.solarFlares}: ${donki?.solarFlares ?? 0} · ${t.geomagneticStorms}: ${donki?.geomagneticStorms ?? 0}`}
                meta={donki?.latestEventDate?.slice(0, 16) ?? t.latestEvent}
            />
        </motion.section>
    );
};