"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {ArrowRight} from "lucide-react";

import type {NasaAsset} from "@/src/types/nasa";
import {useLanguage} from "@/src/context";
import {HeroOrbitVisual} from "./HeroOrbitVisual";
import {SpaceSignalsPanel} from "./SpaceSignalsPanel";


type Props = {
    assets: NasaAsset[];
};

export const HeroSection = ({assets}: Props) => {
    const {locale} = useLanguage();

    return (
        <section className="relative overflow-hidden px-4 pb-6 pt-5 sm:px-6 sm:pt-7 lg:px-10 lg:pb-8 lg:pt-8">
            <div
                className="pointer-events-none absolute inset-0 overflow-hidden"
                style={{background: "var(--hero-bg)"}}
            >
                <motion.div
                    className="absolute inset-0 opacity-30"
                    animate={{backgroundPosition: ["0px 0px", "180px 130px"]}}
                    transition={{duration: 34, repeat: Infinity, ease: "linear"}}
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, var(--star-color) 1px, transparent 1px)",
                        backgroundSize: "44px 44px",
                    }}
                />

                <div className="absolute -bottom-[18%] -left-[14%] h-[420px] w-[900px] rounded-[100%] border border-[var(--color-border)] bg-[radial-gradient(circle_at_50%_28%,rgba(219,234,254,0.58),rgba(59,130,246,0.28)_30%,rgba(15,23,42,0.16)_50%,transparent_72%)] shadow-[var(--shadow-glow)] sm:h-[500px] lg:h-[560px]" />

                <div className="absolute right-[-8%] top-[18%] h-[560px] w-[300px] rounded-full bg-[radial-gradient(circle,var(--color-accent-soft),transparent_70%)] blur-2xl" />

                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-background)] to-transparent" />
            </div>

            <div className="relative grid min-h-[calc(100vh-120px)] items-center gap-7 lg:grid-cols-[0.82fr_1.08fr_0.86fr] lg:gap-7">
                <motion.div
                    initial={{opacity: 0, y: 24}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.65}}
                    className="z-10 max-w-xl lg:-translate-y-4"
                >
                    <div className="mb-4 inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-accent)] backdrop-blur-xl">
                        {locale.home.heroBadge}
                    </div>

                    <h1 className="max-w-[760px] text-[2.45rem] font-black leading-[1.04] tracking-[-0.055em] sm:text-5xl md:text-[3.35rem] xl:text-[4.25rem]">
                        <span className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-success)] bg-clip-text text-transparent">
                            {locale.home.heroTitle}
                        </span>
                    </h1>

                    <p className="mt-5 max-w-md text-[15px] leading-7 text-[var(--color-text-muted)] sm:mt-6 sm:text-base">
                        {locale.home.heroText}
                    </p>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/explore"
                            className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-success)] px-6 py-4 text-sm font-bold text-white shadow-[var(--shadow-glow)] transition hover:scale-[1.02]"
                        >
                            {locale.home.primaryAction}
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href="/live"
                            className="inline-flex items-center justify-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-glass)] px-6 py-4 text-sm font-bold text-[var(--color-text)] backdrop-blur-xl transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-accent)]"
                        >
                            <span className="h-2 w-2 rounded-full bg-[var(--color-success)] shadow-[0_0_16px_var(--color-success)]" />
                            {locale.spaceExperience.missionFeed}
                        </Link>
                    </div>
                </motion.div>

                <div className="z-10 lg:-translate-y-6">
                    <HeroOrbitVisual assets={assets} />
                </div>

                <div className="z-10 lg:-translate-y-5">
                    <SpaceSignalsPanel assets={assets} />
                </div>
            </div>
        </section>
    );
};