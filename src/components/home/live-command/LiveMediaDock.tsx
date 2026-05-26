"use client";

import {motion} from "framer-motion";
import {Zap} from "lucide-react";

import type {
    NasaLiveDonki,
    NasaLiveEpic,
    NasaLiveMediaItem,
} from "@/src/types/nasaLive";

type Props = {
    locale: {
        dock: {
            earth: string;
            earthFallback: string;
            marsFallbackTitle: string;
            marsFallbackText: string;
            nasaLibrary: string;
            openSource: string;
            donkiStream: string;
            solarFlares: string;
            geomagneticStorms: string;
            latestEvent: string;
        };
    };
    epic: NasaLiveEpic | null;
    marsMedia: NasaLiveMediaItem | null;
    donki: NasaLiveDonki | null;
};

export const LiveMediaDock = ({locale, epic, marsMedia, donki}: Props) => {
    const t = locale.dock;

    return (
        <div className="mt-5 grid gap-5 lg:grid-cols-[0.95fr_1.1fr_0.9fr]">
            <VisualDockCard
                title={t.earth}
                text={epic?.caption ?? t.earthFallback}
                imageUrl={epic?.imageUrl}
                meta={epic?.date}
                href={epic?.imageUrl}
                openText={t.openSource}
                delay={0.08}
            />

            <VisualDockCard
                title={marsMedia?.title ?? t.marsFallbackTitle}
                text={marsMedia?.description ?? t.marsFallbackText}
                imageUrl={marsMedia?.imageUrl}
                meta={t.nasaLibrary}
                href={marsMedia?.imageUrl ?? undefined}
                openText={t.openSource}
                delay={0.16}
            />

            <motion.article
                initial={{opacity: 0, y: 24}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: "-100px"}}
                transition={{duration: 0.5, delay: 0.24}}
                className="relative min-h-[270px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
            >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange-400/20 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(251,146,60,0.16),transparent_34%)]" />

                <div className="relative z-10">
                    <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-orange-300/20 bg-orange-300/10">
                        <Zap className="h-5 w-5 text-orange-300" />
                    </div>

                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-orange-300">
                        {t.donkiStream}
                    </p>

                    <h3 className="mt-3 text-3xl font-black tracking-[-0.055em] text-white">
                        {donki ? `${donki.cmeEvents} CME` : "—"}
                    </h3>

                    <div className="mt-5 space-y-3 text-sm text-slate-300">
                        <div className="flex justify-between border-b border-white/10 pb-2">
                            <span>{t.solarFlares}</span>
                            <strong className="text-white">
                                {donki?.solarFlares ?? "—"}
                            </strong>
                        </div>

                        <div className="flex justify-between border-b border-white/10 pb-2">
                            <span>{t.geomagneticStorms}</span>
                            <strong className="text-white">
                                {donki?.geomagneticStorms ?? "—"}
                            </strong>
                        </div>

                        <div className="flex justify-between gap-4">
                            <span>{t.latestEvent}</span>
                            <strong className="text-right text-cyan-300">
                                {donki?.latestEventDate ?? "—"}
                            </strong>
                        </div>
                    </div>
                </div>
            </motion.article>
        </div>
    );
};

type CardProps = {
    title: string;
    text: string;
    imageUrl?: string | null;
    meta?: string;
    href?: string;
    openText: string;
    delay: number;
};

const VisualDockCard = ({
                            title,
                            text,
                            imageUrl,
                            meta,
                            href,
                            openText,
                            delay,
                        }: CardProps) => (
    <motion.article
        initial={{opacity: 0, y: 24}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, margin: "-100px"}}
        transition={{duration: 0.5, delay}}
        className="group relative min-h-[270px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
    >
        {imageUrl && (
            <img
                src={imageUrl}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover opacity-42 transition duration-700 group-hover:scale-105 group-hover:opacity-55"
            />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-[#020611]/75 to-transparent" />

        <div className="relative z-10 flex h-full flex-col justify-end">
            {meta && (
                <p className="mb-3 text-[11px] font-black uppercase tracking-[0.24em] text-cyan-300">
                    {meta}
                </p>
            )}

            <h3 className="text-2xl font-black tracking-[-0.05em] text-white">
                {title}
            </h3>

            <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">
                {text}
            </p>

            {href && (
                <a
                    href={href}
                    target="_blank"
                    className="mt-4 text-sm font-black text-cyan-300"
                >
                    {openText} →
                </a>
            )}
        </div>
    </motion.article>
);