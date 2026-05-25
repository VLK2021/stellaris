"use client";

import Image from "next/image";
import Link from "next/link";
import {motion} from "framer-motion";

import type {NasaAsset} from "@/src/types/nasa";
import {getAssetByKey} from "@/src/helpers/nasa.helpers";
import {useLanguage} from "@/src/context";

type VisualType =
    | "apod"
    | "earth"
    | "mars"
    | "asteroid"
    | "sun"
    | "exoplanet"
    | "media"
    | "satellite"
    | "data"
    | "learn"
    | "rocket"
    | "events"
    | "more";

type ModuleItem = {
    label: string;
    href: string;
    visual: VisualType;
    accent: string;
};

type Props = {
    assets: NasaAsset[];
};

const PlanetIcon = ({type}: {type: VisualType}) => {
    const base = "relative h-14 w-14 rounded-full";

    if (type === "earth") {
        return (
            <div className={`${base} bg-[radial-gradient(circle_at_32%_26%,#eff6ff,#60a5fa_20%,#2563eb_38%,#0f766e_58%,#020617_92%)] shadow-[0_0_32px_rgba(56,189,248,0.58)]`}>
                <div className="absolute left-3 top-3 h-4 w-6 rounded-full bg-emerald-300/70 blur-[1px]" />
                <div className="absolute bottom-2.5 right-2.5 h-5 w-3 rounded-full bg-emerald-400/60 blur-[1px]" />
                <div className="absolute inset-0 rounded-full bg-[linear-gradient(120deg,rgba(255,255,255,0.42),transparent_38%,rgba(0,0,0,0.45)_82%)]" />
            </div>
        );
    }

    if (type === "mars") {
        return (
            <div className={`${base} bg-[radial-gradient(circle_at_32%_26%,#fed7aa,#fb923c_36%,#c2410c_68%,#431407_100%)] shadow-[0_0_30px_rgba(239,106,58,0.54)]`}>
                <div className="absolute left-3 top-4 h-2 w-6 rounded-full bg-orange-950/35" />
                <div className="absolute bottom-3 right-3 h-2 w-5 rounded-full bg-orange-950/35" />
                <div className="absolute inset-0 rounded-full bg-[linear-gradient(120deg,rgba(255,255,255,0.36),transparent_38%,rgba(0,0,0,0.42)_82%)]" />
            </div>
        );
    }

    if (type === "sun") {
        return (
            <div className={`${base} bg-[radial-gradient(circle_at_35%_30%,#fff7ad,#fde68a_18%,#fb923c_45%,#ea580c_70%,#7c2d12_100%)] shadow-[0_0_42px_rgba(251,146,60,0.76)]`}>
                <motion.div
                    className="absolute inset-[-10px] rounded-full bg-orange-400/22 blur-xl"
                    animate={{scale: [1, 1.18, 1], opacity: [0.35, 0.82, 0.35]}}
                    transition={{duration: 3.6, repeat: Infinity, ease: "easeInOut"}}
                />
                <div className="absolute inset-0 rounded-full bg-[linear-gradient(120deg,rgba(255,255,255,0.34),transparent_36%,rgba(0,0,0,0.3)_82%)]" />
            </div>
        );
    }

    if (type === "asteroid") {
        return (
            <motion.div
                animate={{rotate: [0, 7, -5, 0]}}
                transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
                className="relative h-14 w-14"
            >
                <div className="absolute inset-2 rotate-12 rounded-[45%_55%_48%_52%] bg-[radial-gradient(circle_at_35%_25%,#f5d0a9,#a16207_48%,#3f2b12_88%)] shadow-[0_0_28px_rgba(245,158,11,0.38)]" />
                <div className="absolute left-5 top-5 h-2 w-2 rounded-full bg-black/35" />
                <div className="absolute bottom-4 right-4 h-1.5 w-1.5 rounded-full bg-black/30" />
            </motion.div>
        );
    }

    if (type === "exoplanet") {
        return (
            <div className={`${base} bg-[radial-gradient(circle_at_30%_24%,#bfdbfe,#2563eb_44%,#172554_88%)] shadow-[0_0_32px_rgba(96,165,250,0.5)]`}>
                <div className="absolute left-[-9px] top-[25px] h-2 w-[72px] -rotate-12 rounded-full bg-cyan-200/38 blur-[1px]" />
                <div className="absolute inset-0 rounded-full bg-[linear-gradient(120deg,rgba(255,255,255,0.38),transparent_38%,rgba(0,0,0,0.45)_82%)]" />
            </div>
        );
    }

    if (type === "rocket") {
        return (
            <motion.div
                animate={{y: [0, -4, 0]}}
                transition={{duration: 3.2, repeat: Infinity, ease: "easeInOut"}}
                className="relative h-14 w-14"
            >
                <div className="absolute left-[24px] top-1 h-9 w-4 rounded-full bg-[linear-gradient(180deg,#f8fafc,#818cf8)] shadow-[0_0_26px_rgba(129,140,248,0.58)]" />
                <div className="absolute left-[21px] top-8 h-3 w-2 rotate-45 bg-violet-400" />
                <div className="absolute right-[17px] top-8 h-3 w-2 -rotate-45 bg-violet-400" />
                <div className="absolute left-[26px] bottom-0 h-6 w-2 rounded-full bg-[radial-gradient(circle,#fef3c7,#fb923c_60%,transparent_72%)] blur-[1px]" />
            </motion.div>
        );
    }

    if (type === "satellite") {
        return (
            <motion.div
                animate={{rotate: [0, 5, -5, 0]}}
                transition={{duration: 5, repeat: Infinity, ease: "easeInOut"}}
                className="relative h-14 w-14"
            >
                <div className="absolute left-6 top-6 h-4 w-4 rounded-md border border-cyan-200/80 bg-slate-950 shadow-[0_0_18px_rgba(56,189,248,0.48)]" />
                <div className="absolute left-0 top-7 h-3 w-6 border border-cyan-300/70 bg-cyan-300/15" />
                <div className="absolute right-0 top-7 h-3 w-6 border border-cyan-300/70 bg-cyan-300/15" />
                <div className="absolute left-7 top-9 h-7 w-px rotate-[-35deg] bg-cyan-300/80" />
            </motion.div>
        );
    }

    if (type === "apod") {
        return (
            <div className={`${base} bg-[radial-gradient(circle_at_50%_50%,#f8fafc_0_3%,transparent_4%),conic-gradient(from_30deg,#020617,#312e81,#0891b2,#020617,#581c87,#020617)] shadow-[0_0_32px_rgba(56,189,248,0.48)]`}>
                <motion.div
                    className="absolute inset-[7px] rounded-full border border-cyan-200/35"
                    animate={{rotate: 360}}
                    transition={{duration: 18, repeat: Infinity, ease: "linear"}}
                />
                <div className="absolute inset-[17px] rounded-full border border-violet-200/30" />
            </div>
        );
    }

    const panel = "relative grid h-14 w-14 place-items-center rounded-2xl border border-cyan-200/20 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.26),rgba(15,23,42,0.95))] shadow-[0_0_26px_rgba(56,189,248,0.3)]";

    if (type === "media") {
        return (
            <div className={panel}>
                <div className="h-7 w-9 rounded-lg border-2 border-cyan-100" />
                <div className="absolute h-4 w-4 rounded-full border-2 border-cyan-100" />
            </div>
        );
    }

    if (type === "data") {
        return (
            <div className={panel}>
                <div className="h-9 w-9 rounded-[50%] border-2 border-cyan-100" />
                <div className="absolute top-[21px] h-3 w-9 rounded-[50%] border-2 border-cyan-100" />
            </div>
        );
    }

    if (type === "learn") {
        return (
            <div className={panel}>
                <div className="h-9 w-8 rounded-l-md border-l-2 border-y-2 border-cyan-100" />
                <div className="absolute right-4 h-9 w-8 rounded-r-md border-r-2 border-y-2 border-cyan-100" />
                <div className="absolute h-9 w-px bg-cyan-100/70" />
            </div>
        );
    }

    if (type === "events") {
        return (
            <div className={panel}>
                <div className="h-9 w-9 rounded-md border-2 border-cyan-100" />
                <div className="absolute top-[22px] h-0.5 w-9 bg-cyan-100" />
            </div>
        );
    }

    return (
        <div className="grid h-14 w-14 place-items-center rounded-full bg-slate-950/80 text-lg font-black text-white">
            ···
        </div>
    );
};

export const ModuleOrbitRail = ({assets}: Props) => {
    const {locale} = useLanguage();
    const background = getAssetByKey(assets, "earth");

    const modules: ModuleItem[] = [
        {label: "APOD", href: "/apod", visual: "apod", accent: "rgba(168,85,247,0.42)"},
        {label: locale.nav.earth, href: "/earth", visual: "earth", accent: "rgba(56,189,248,0.42)"},
        {label: locale.nav.mars, href: "/mars", visual: "mars", accent: "rgba(239,106,58,0.42)"},
        {label: locale.nav.asteroids, href: "/asteroids", visual: "asteroid", accent: "rgba(245,158,11,0.36)"},
        {label: locale.nav.spaceWeather, href: "/space-weather", visual: "sun", accent: "rgba(251,146,60,0.44)"},
        {label: locale.nav.exoplanets, href: "/exoplanets", visual: "exoplanet", accent: "rgba(96,165,250,0.38)"},
        {label: locale.nav.media, href: "/media", visual: "media", accent: "rgba(168,85,247,0.38)"},
        {label: locale.nav.technology, href: "/technology", visual: "satellite", accent: "rgba(56,189,248,0.34)"},
        {label: locale.nav.openData, href: "/datasets", visual: "data", accent: "rgba(56,189,248,0.34)"},
        {label: "Education", href: "/learn", visual: "learn", accent: "rgba(139,92,246,0.38)"},
        {label: locale.nav.missions, href: "/missions", visual: "rocket", accent: "rgba(129,140,248,0.4)"},
        {label: "Events", href: "/events", visual: "events", accent: "rgba(99,102,241,0.38)"},
        {label: "More", href: "/explore", visual: "more", accent: "rgba(56,189,248,0.32)"},
    ];

    return (
        <section className="relative isolate -mt-px overflow-hidden px-4 pb-8 pt-5 sm:px-6 lg:px-10">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[#020617]">
                {background && (
                    <Image
                        src={background.imageUrl}
                        alt={background.title}
                        fill
                        sizes="100vw"
                        className="object-cover object-center opacity-[0.18] blur-[1px]"
                    />
                )}

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.98)_0%,rgba(2,6,23,0.82)_38%,rgba(2,6,23,0.96)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(56,189,248,0.20),transparent_32%),radial-gradient(circle_at_82%_10%,rgba(16,185,129,0.13),transparent_30%)]" />
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-transparent via-[#020617]/35 to-transparent" />
            </div>

            <motion.div
                initial={{opacity: 0, y: 22}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: "-80px"}}
                transition={{duration: 0.55}}
                className="relative mx-auto max-w-[1800px]"
            >
                <div className="mb-5 flex items-center justify-between gap-4">
                    <h2 className="text-xl font-black tracking-[-0.04em] text-white sm:text-2xl">
                        {locale.spaceExperience.modulesTitle}
                    </h2>

                    <Link
                        href="/explore"
                        className="hidden items-center gap-2 rounded-full border border-white/10 bg-slate-950/32 px-3.5 py-1.5 text-xs font-bold text-slate-300 backdrop-blur-xl transition hover:border-cyan-300/30 hover:text-cyan-200 sm:flex"
                    >
                        {locale.spaceExperience.viewAll}
                        <span>→</span>
                    </Link>
                </div>

                <div
                    className="grid gap-2.5"
                    style={{
                        gridTemplateColumns: "repeat(13, minmax(0, 1fr))",
                    }}
                >
                    {modules.map((item, index) => (
                        <motion.div
                            key={item.href}
                            initial={{opacity: 0, y: 16}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: index * 0.025}}
                        >
                            <Link
                                href={item.href}
                                className="group flex min-w-0 flex-col items-center gap-2.5 rounded-2xl p-1.5 text-center transition hover:bg-white/[0.045]"
                            >
                                <motion.div
                                    whileHover={{y: -5, scale: 1.05}}
                                    transition={{type: "spring", stiffness: 260, damping: 18}}
                                >
                                    <div
                                        className="relative grid h-[86px] w-[86px] place-items-center rounded-full border border-white/12 bg-slate-950/42 shadow-[0_0_28px_rgba(56,189,248,0.18)] backdrop-blur-xl"
                                        style={{boxShadow: `0 0 34px ${item.accent}`}}
                                    >
                                        <motion.div
                                            className="absolute inset-[-7px] rounded-full border border-white/10"
                                            animate={{rotate: 360}}
                                            transition={{
                                                duration: 18 + index,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                        />

                                        <motion.div
                                            className="absolute inset-[-13px] rounded-full border border-dashed border-white/8 opacity-0 transition group-hover:opacity-100"
                                            animate={{rotate: -360}}
                                            transition={{
                                                duration: 30 + index,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                        />

                                        <PlanetIcon type={item.visual} />
                                    </div>
                                </motion.div>

                                <span className="line-clamp-2 min-h-[30px] text-[11px] font-bold leading-4 text-slate-100">
                                    {item.label}
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};