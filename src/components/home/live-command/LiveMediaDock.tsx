"use client";

import {motion} from "framer-motion";
import type {IssPosition, NasaLiveEpic, NasaLiveMediaItem} from "@/src/types/nasaLive";

type Props = {
    epic: NasaLiveEpic | null;
    marsMedia: NasaLiveMediaItem | null;
    iss: IssPosition | null;
};

export const LiveMediaDock = ({epic, marsMedia, iss}: Props) => {
    return (
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.15fr_1fr]">
            <VisualDockCard
                title="Earth observation"
                text={epic?.caption ?? "Latest NASA EPIC Earth observation frame."}
                imageUrl={epic?.imageUrl}
                meta={epic?.date}
                href={epic?.imageUrl}
                delay={0.08}
            />

            <VisualDockCard
                title={marsMedia?.title ?? "Mars media intelligence"}
                text={marsMedia?.description ?? "NASA Image Library Mars media feed."}
                imageUrl={marsMedia?.imageUrl}
                meta="NASA Image Library"
                href={marsMedia?.imageUrl ?? undefined}
                delay={0.16}
            />

            <motion.article
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: "-100px"}}
                transition={{duration: 0.55, delay: 0.24}}
                className="relative min-h-[330px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 shadow-[0_22px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(34,211,238,0.2),transparent_34%)]" />

                <motion.div
                    className="absolute left-1/2 top-14 h-36 w-36 -translate-x-1/2 rounded-full border border-cyan-300/25"
                    animate={{rotate: 360}}
                    transition={{duration: 18, repeat: Infinity, ease: "linear"}}
                >
                    <div className="absolute -top-1 left-1/2 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_28px_rgba(34,211,238,0.9)]" />
                </motion.div>

                <div className="absolute left-1/2 top-[92px] h-16 w-16 -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-300 to-emerald-400 shadow-[0_0_55px_rgba(34,211,238,0.42)]" />

                <div className="relative z-10 mt-44">
                    <h3 className="text-3xl font-black tracking-[-0.055em] text-white">
                        ISS orbital telemetry
                    </h3>

                    <div className="mt-5 grid grid-cols-2 gap-4 text-sm text-slate-400">
                        <span>Lat: {iss?.latitude.toFixed(2) ?? "—"}</span>
                        <span>Lon: {iss?.longitude.toFixed(2) ?? "—"}</span>
                        <span>Alt: {iss ? Math.round(iss.altitudeKm) : "—"} km</span>
                        <span>Speed: {iss ? Math.round(iss.velocityKmh) : "—"} km/h</span>
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
    delay: number;
};

const VisualDockCard = ({title, text, imageUrl, meta, href, delay}: CardProps) => (
    <motion.article
        initial={{opacity: 0, y: 30}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, margin: "-100px"}}
        transition={{duration: 0.55, delay}}
        className="group relative min-h-[330px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 shadow-[0_22px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
    >
        {imageUrl && (
            <img
                src={imageUrl}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover opacity-45 transition duration-700 group-hover:scale-105 group-hover:opacity-60"
            />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-[#020611]/75 to-transparent" />

        <div className="relative z-10 flex h-full flex-col justify-end">
            {meta && (
                <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-cyan-300">
                    {meta}
                </p>
            )}

            <h3 className="text-3xl font-black tracking-[-0.055em] text-white">{title}</h3>

            <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-300">{text}</p>

            {href && (
                <a href={href} target="_blank" className="mt-5 text-sm font-black text-cyan-300">
                    Open source →
                </a>
            )}
        </div>
    </motion.article>
);