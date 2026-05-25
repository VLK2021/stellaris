"use client";

import Image from "next/image";
import Link from "next/link";
import {motion} from "framer-motion";
import {ArrowRight} from "lucide-react";

import type {NasaAsset} from "@/src/types/nasa";
import {getAssetByKey} from "@/src/helpers/nasa.helpers";
import {useLanguage} from "@/src/context";
import {HeroOrbitVisual} from "./HeroOrbitVisual";
import {SpaceSignalsPanel} from "./SpaceSignalsPanel";

type Props = {
    assets: NasaAsset[];
};

export const HeroSection = ({assets}: Props) => {
    const {locale} = useLanguage();
    const background = getAssetByKey(assets, "earth");

    return (
        <section className="relative isolate overflow-hidden px-4 pb-6 pt-5 sm:px-6 sm:pt-7 lg:px-10 lg:pb-8 lg:pt-8">
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#020617]">
                {background && (
                    <Image
                        src={background.imageUrl}
                        alt={background.title}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center opacity-80"
                    />
                )}

                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.78)_0%,rgba(2,6,23,0.34)_45%,rgba(2,6,23,0.72)_100%)]" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_24%,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(16,185,129,0.12),transparent_32%),radial-gradient(circle_at_70%_82%,rgba(59,130,246,0.14),transparent_34%)]" />

                <motion.div
                    className="absolute inset-0 opacity-18"
                    animate={{backgroundPosition: ["0px 0px", "180px 130px"]}}
                    transition={{duration: 34, repeat: Infinity, ease: "linear"}}
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, rgba(248,250,252,0.55) 1px, transparent 1px)",
                        backgroundSize: "44px 44px",
                    }}
                />

                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--color-background)] to-transparent" />
            </div>

            <div className="relative z-10 grid min-h-[calc(100vh-120px)] items-center gap-7 lg:grid-cols-[0.82fr_1.08fr_0.86fr] lg:gap-7">
                <motion.div
                    initial={{opacity: 0, y: 24}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.65}}
                    className="relative z-20 max-w-xl lg:-translate-y-4"
                >
                    <div className="mb-4 inline-flex rounded-full border border-white/18 bg-slate-950/42 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-200 backdrop-blur-xl">
                        {locale.home.heroBadge}
                    </div>

                    <h1 className="max-w-[760px] text-[2.45rem] font-black leading-[1.04] tracking-[-0.055em] sm:text-5xl md:text-[3.35rem] xl:text-[4.25rem]">
                        <span className="bg-gradient-to-r from-white via-cyan-200 to-emerald-300 bg-clip-text text-transparent drop-shadow-[0_8px_40px_rgba(0,0,0,0.45)]">
                            {locale.home.heroTitle}
                        </span>
                    </h1>

                    <p className="mt-5 max-w-md text-[15px] leading-7 text-slate-200 sm:mt-6 sm:text-base">
                        {locale.home.heroText}
                    </p>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/explore"
                            className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 px-6 py-4 text-sm font-bold text-white shadow-[0_0_42px_rgba(56,189,248,0.35)] transition hover:scale-[1.02]"
                        >
                            {locale.home.primaryAction}
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href="/live"
                            className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/16 bg-slate-950/46 px-6 py-4 text-sm font-bold text-white backdrop-blur-xl transition hover:border-cyan-300/40 hover:text-cyan-100"
                        >
                            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_#34d399]" />
                            {locale.spaceExperience.missionFeed}
                        </Link>
                    </div>
                </motion.div>

                <div className="relative z-20 lg:-translate-y-6">
                    <HeroOrbitVisual assets={assets} />
                </div>

                <div className="relative z-20 lg:-translate-y-5">
                    <SpaceSignalsPanel assets={assets} />
                </div>
            </div>
        </section>
    );
};