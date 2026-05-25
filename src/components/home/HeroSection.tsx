"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {ArrowRight} from "lucide-react";

import {useLanguage} from "@/src/context";
import {HeroOrbitVisual} from "./HeroOrbitVisual";
import {SpaceSignalsPanel} from "./SpaceSignalsPanel";

export const HeroSection = () => {
    const {locale} = useLanguage();

    return (
        <section className="relative overflow-hidden sm:px-6 lg:px-10">
            <div className="pointer-events-none absolute inset-0" style={{background: "var(--hero-bg)"}}>
                <motion.div
                    className="absolute inset-0 opacity-35"
                    animate={{backgroundPosition: ["0px 0px", "180px 130px"]}}
                    transition={{duration: 34, repeat: Infinity, ease: "linear"}}
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, var(--star-color) 1px, transparent 1px)",
                        backgroundSize: "44px 44px",
                    }}
                />

                <div className="absolute bottom-[-16%] left-[-8%] h-[360px] w-[760px] rounded-[100%] border border-[var(--color-border-strong)] bg-[radial-gradient(circle_at_50%_35%,rgba(59,130,246,0.38),rgba(15,23,42,0.12)_42%,transparent_70%)] shadow-[0_0_90px_rgba(56,189,248,0.28)] sm:h-[460px] lg:h-[520px]" />
                <div className="absolute right-[-10%] top-[16%] h-[520px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.22),transparent_64%)] blur-2xl" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-background)] to-transparent" />
            </div>

            <div className="relative grid min-h-[calc(100vh-100px)] items-center gap-8 lg:grid-cols-[0.9fr_1.05fr_0.78fr]">
                <motion.div
                    initial={{opacity: 0, y: 24}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.65}}
                    className="max-w-xl"
                >
                    <h1 className="text-5xl font-black leading-[1.02] tracking-[-0.06em] text-[var(--color-text)] sm:text-6xl xl:text-7xl">
                        Explore.
                        <br />
                        Discover.
                        <br />
                        <span className="bg-gradient-to-r from-[var(--color-nebula)] via-[var(--color-accent)] to-[var(--color-earth)] bg-clip-text text-transparent">
                            Understand.
                        </span>
                    </h1>

                    <p className="mt-7 max-w-md text-base leading-8 text-[var(--color-text-muted)]">
                        {locale.home.heroText}
                    </p>

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/explore"
                            className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[var(--color-nebula)] to-[var(--color-accent)] px-6 py-4 text-sm font-bold text-white shadow-[var(--shadow-glow)] transition hover:scale-[1.02]"
                        >
                            {locale.home.primaryAction}
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href="/live"
                            className="inline-flex items-center justify-center gap-3 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-glass)] px-6 py-4 text-sm font-bold text-[var(--color-text)] backdrop-blur-xl transition hover:text-[var(--color-accent)]"
                        >
                            <span className="h-2 w-2 rounded-full bg-[var(--color-success)] shadow-[0_0_16px_var(--color-success)]" />
                            {locale.spaceExperience.missionFeed}
                        </Link>
                    </div>
                </motion.div>

                <HeroOrbitVisual />

                <SpaceSignalsPanel />
            </div>
        </section>
    );
};