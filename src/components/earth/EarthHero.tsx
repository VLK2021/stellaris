"use client";

import {motion} from "framer-motion";
import {Activity, Camera, Globe2, Layers3, Satellite} from "lucide-react";

import type {EarthOverview} from "@/src/types/earth/earth.types";
import type {EarthLocale, EarthTab} from "@/src/types/earth/earthUi.types";

import {EarthFloatingStat} from "./EarthFloatingStat";
import {EarthTabButton} from "./EarthTabButton";

type Props = {
    data: EarthOverview;
    activeTab: EarthTab;
    setActiveTab: (tab: EarthTab) => void;
    t: EarthLocale;
};

export const EarthHero = ({data, activeTab, setActiveTab, t}: Props) => {
    const heroImage = data.epicImages[0]?.imageUrl;

    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-6 lg:p-7">
            {heroImage && (
                <motion.img
                    src={heroImage}
                    alt="NASA EPIC Earth"
                    className="absolute right-[-8%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full object-cover opacity-30 blur-[1px]"
                    animate={{scale: [1, 1.04, 1], rotate: [0, 2, 0]}}
                    transition={{duration: 10, repeat: Infinity, ease: "easeInOut"}}
                />
            )}

            <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-card)_0%,rgba(15,23,42,0.74)_48%,rgba(15,23,42,0.25)_100%)]" />

            <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-center">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                        <Satellite className="h-3.5 w-3.5" />
                        {t.badge}
                    </div>

                    <h1 className="mt-5 max-w-4xl text-4xl font-black uppercase tracking-[-0.06em] text-[var(--color-text)] sm:text-5xl xl:text-6xl">
                        {t.title}
                    </h1>

                    <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
                        {t.subtitle}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <EarthTabButton active={activeTab === "overview"} onClick={() => setActiveTab("overview")}>{t.overview}</EarthTabButton>
                        <EarthTabButton active={activeTab === "events"} onClick={() => setActiveTab("events")}>{t.events}</EarthTabButton>
                        <EarthTabButton active={activeTab === "epic"} onClick={() => setActiveTab("epic")}>{t.epic}</EarthTabButton>
                        <EarthTabButton active={activeTab === "layers"} onClick={() => setActiveTab("layers")}>{t.layers}</EarthTabButton>
                    </div>
                </div>

                <div className="relative hidden h-[300px] lg:block">
                    <motion.div className="absolute inset-0 rounded-full border border-[var(--color-accent)]/25" animate={{rotate: 360}} transition={{duration: 34, repeat: Infinity, ease: "linear"}} />
                    <motion.div className="absolute inset-10 rounded-full border border-emerald-400/25" animate={{rotate: -360}} transition={{duration: 26, repeat: Infinity, ease: "linear"}} />

                    <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-accent-soft)] backdrop-blur-xl">
                        <Globe2 className="h-14 w-14 text-[var(--color-accent)]" />
                    </div>

                    <EarthFloatingStat className="left-0 top-3" icon={Activity} label={t.activeEvents} value={data.stats.activeEvents} onClick={() => setActiveTab("events")} />
                    <EarthFloatingStat className="right-0 top-20" icon={Camera} label={t.epicImages} value={data.stats.epicImages} onClick={() => setActiveTab("epic")} />
                    <EarthFloatingStat className="bottom-3 left-10" icon={Layers3} label={t.satelliteLayers} value={data.stats.layers} onClick={() => setActiveTab("layers")} />
                </div>
            </div>
        </section>
    );
};