"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {ArrowRight, Orbit, Radar, SunMedium} from "lucide-react";

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
        <section className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <FeatureEarthCard
                href="/earth"
                image={epic?.imageUrl ?? null}
                title={t.earth}
                description={epic?.caption ?? t.earthFallback}
                meta={epic?.date ?? "NASA DSCOVR"}
                action={t.openSource}
            />

            <div className="grid gap-5">
                <CompactSignalCard
                    href="/mars"
                    image={marsMedia?.imageUrl ?? null}
                    icon={Radar}
                    badge={t.nasaLibrary}
                    title={marsMedia?.title ?? t.marsFallbackTitle}
                    description={marsMedia?.description ?? t.marsFallbackText}
                    action={t.openSource}
                    accent="cyan"
                />

                <SolarCompactCard
                    href="/space-weather"
                    title={t.donkiStream}
                    donki={donki}
                    labels={t}
                />
            </div>
        </section>
    );
};

type FeatureEarthCardProps = {
    href: string;
    image: string | null;
    title: string;
    description: string;
    meta: string;
    action: string;
};

const FeatureEarthCard = ({
                              href,
                              image,
                              title,
                              description,
                              meta,
                              action,
                          }: FeatureEarthCardProps) => (
    <Link href={href} className="group block">
        <motion.article
            initial={{opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            whileHover={{y: -5}}
            viewport={{once: true, margin: "-100px"}}
            transition={{duration: 0.65}}
            className="relative min-h-[360px] overflow-hidden rounded-[2.2rem] border border-cyan-300/10 bg-white/[0.025] backdrop-blur-xl"
        >
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-700 group-hover:scale-105"
                />
            )}

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,17,0.92),rgba(2,6,17,0.64),rgba(2,6,17,0.18)),radial-gradient(circle_at_82%_35%,rgba(34,211,238,0.18),transparent_30%)]" />

            <div className="absolute right-[-100px] top-[-120px] h-[340px] w-[340px] rounded-full border border-cyan-300/10" />
            <div className="absolute right-[40px] top-[60px] h-[130px] w-[130px] rounded-full border border-cyan-300/10" />

            <div className="relative z-10 flex min-h-[360px] flex-col justify-between p-7">
                <div>
                    <div className="mb-8 inline-flex items-center gap-3 rounded-2xl border border-cyan-300/15 bg-cyan-300/8 px-4 py-3">
                        <Orbit className="h-5 w-5 text-cyan-300" />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">
                                EPIC EARTH
                            </p>
                            <p className="mt-1 text-xs text-slate-400">{meta}</p>
                        </div>
                    </div>

                    <h3 className="max-w-xl text-4xl font-black leading-[0.95] tracking-[-0.065em] text-white">
                        {title}
                    </h3>

                    <p className="mt-5 line-clamp-3 max-w-xl text-base leading-8 text-slate-300">
                        {description}
                    </p>
                </div>

                <ActionLabel action={action} />
            </div>
        </motion.article>
    </Link>
);

type CompactSignalCardProps = {
    href: string;
    image: string | null;
    icon: typeof Radar;
    badge: string;
    title: string;
    description: string;
    action: string;
    accent: "cyan";
};

const CompactSignalCard = ({
                               href,
                               image,
                               icon: Icon,
                               badge,
                               title,
                               description,
                               action,
                           }: CompactSignalCardProps) => (
    <Link href={href} className="group block">
        <motion.article
            initial={{opacity: 0, x: 18}}
            whileInView={{opacity: 1, x: 0}}
            whileHover={{x: -4}}
            viewport={{once: true, margin: "-100px"}}
            transition={{duration: 0.6}}
            className="relative min-h-[170px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] backdrop-blur-xl"
        >
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 h-full w-full object-cover opacity-35 transition duration-700 group-hover:scale-105"
                />
            )}

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,17,0.94),rgba(2,6,17,0.65)),radial-gradient(circle_at_82%_20%,rgba(34,211,238,0.16),transparent_30%)]" />

            <div className="relative z-10 flex min-h-[170px] items-center gap-5 p-5">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-cyan-300/15 bg-cyan-300/8">
                    <Icon className="h-7 w-7 text-cyan-300" />
                </div>

                <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.26em] text-cyan-300">
                        {badge}
                    </p>

                    <h3 className="mt-2 line-clamp-1 text-2xl font-black tracking-[-0.045em] text-white">
                        {title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
                        {description}
                    </p>

                    <ActionLabel action={action} small />
                </div>
            </div>
        </motion.article>
    </Link>
);

type SolarCompactCardProps = {
    href: string;
    title: string;
    donki: NasaLiveDonki | null;
    labels: Props["locale"]["dock"];
};

const SolarCompactCard = ({href, title, donki, labels}: SolarCompactCardProps) => (
    <Link href={href} className="group block">
        <motion.article
            initial={{opacity: 0, x: 18}}
            whileInView={{opacity: 1, x: 0}}
            whileHover={{x: -4}}
            viewport={{once: true, margin: "-100px"}}
            transition={{duration: 0.6, delay: 0.08}}
            className="relative min-h-[170px] overflow-hidden rounded-[2rem] border border-orange-300/10 bg-orange-300/[0.035] p-5 backdrop-blur-xl"
        >
            <div className="absolute right-[-40px] top-[-60px] h-[170px] w-[170px] rounded-full bg-orange-300/12 blur-3xl" />

            <div className="relative z-10 flex min-h-[130px] items-center gap-5">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-orange-300/15 bg-orange-300/8">
                    <SunMedium className="h-7 w-7 text-orange-300" />
                </div>

                <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.26em] text-orange-300">
                        {title}
                    </p>

                    <h3 className="mt-2 text-3xl font-black tracking-[-0.06em] text-white">
                        {donki?.cmeEvents ?? 0} CME
                    </h3>

                    <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-400">
                        <span>{labels.solarFlares}: <b className="text-white">{donki?.solarFlares ?? 0}</b></span>
                        <span>{labels.geomagneticStorms}: <b className="text-white">{donki?.geomagneticStorms ?? 0}</b></span>
                    </div>

                    <ActionLabel action={labels.openSource} small orange />
                </div>
            </div>
        </motion.article>
    </Link>
);

const ActionLabel = ({
                         action,
                         small,
                         orange,
                     }: {
    action: string;
    small?: boolean;
    orange?: boolean;
}) => (
    <div className={`mt-5 flex items-center gap-3 ${orange ? "text-orange-300" : "text-cyan-300"}`}>
        <span className={`${small ? "text-xs" : "text-sm"} font-black uppercase tracking-[0.18em]`}>
            {action}
        </span>
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
    </div>
);