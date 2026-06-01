"use client";

import {motion} from "framer-motion";
import {Activity, Camera, Globe2, Layers3, Satellite} from "lucide-react";

import type {EarthOverview} from "@/src/types/earth/earth.types";
import type {EarthTab, EarthLocale} from "@/src/types/earth/earthUi.types";

import {EarthFloatingStat} from "./EarthFloatingStat";
import {EarthTabButton} from "./EarthTabButton";

type Props = {
    data: EarthOverview;
    activeTab: EarthTab;
    setActiveTab: (tab: EarthTab) => void;
    t: EarthLocale;
};

export const EarthHero = ({data, activeTab, setActiveTab, t}: Props) => {
    return (
        <section className="relative min-h-[620px] overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-[linear-gradient(135deg,var(--color-card),rgba(15,23,42,0.22))] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_63%_46%,rgba(34,197,94,0.24),transparent_28%),radial-gradient(circle_at_28%_82%,rgba(14,165,233,0.16),transparent_34%)]" />

            <motion.div
                className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-accent)]/20"
                animate={{rotate: 360}}
                transition={{duration: 42, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute left-1/2 top-1/2 h-[370px] w-[370px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/20"
                animate={{rotate: -360}}
                transition={{duration: 30, repeat: Infinity, ease: "linear"}}
            />

            <div className="relative z-10 grid min-h-[560px] gap-8 xl:grid-cols-[1fr_560px] xl:items-center">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                        <Satellite className="h-3.5 w-3.5" />
                        {t.badge}
                    </div>

                    <h1 className="mt-7 max-w-5xl text-4xl font-black uppercase tracking-[-0.07em] text-[var(--color-text)] sm:text-6xl lg:text-7xl">
                        {t.title}
                    </h1>

                    <p className="mt-6 max-w-3xl text-sm leading-8 text-[var(--color-text-muted)] sm:text-base">
                        {t.subtitle}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <EarthTabButton active={activeTab === "overview"} onClick={() => setActiveTab("overview")}>{t.overview}</EarthTabButton>
                        <EarthTabButton active={activeTab === "events"} onClick={() => setActiveTab("events")}>{t.events}</EarthTabButton>
                        <EarthTabButton active={activeTab === "epic"} onClick={() => setActiveTab("epic")}>{t.epic}</EarthTabButton>
                        <EarthTabButton active={activeTab === "layers"} onClick={() => setActiveTab("layers")}>{t.layers}</EarthTabButton>
                    </div>
                </div>

                <div className="relative mx-auto h-[430px] w-full max-w-[520px]">
                    <motion.div
                        className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.8),rgba(14,165,233,0.35)_34%,rgba(15,23,42,0.25)_62%,transparent_74%)] shadow-[0_0_120px_rgba(34,197,94,0.32)]"
                        animate={{scale: [1, 1.035, 1]}}
                        transition={{duration: 3, repeat: Infinity, ease: "easeInOut"}}
                    />

                    <div className="absolute left-1/2 top-1/2 grid h-44 w-44 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-card)]/40 backdrop-blur-xl">
                        <Globe2 className="h-20 w-20 text-emerald-300" />
                    </div>

                    <EarthFloatingStat className="left-0 top-8" icon={Activity} label={t.activeEvents} value={data.stats.activeEvents} />
                    <EarthFloatingStat className="right-0 top-24" icon={Camera} label={t.epicImages} value={data.stats.epicImages} />
                    <EarthFloatingStat className="bottom-10 left-12" icon={Layers3} label={t.satelliteLayers} value={data.stats.layers} />
                </div>
            </div>
        </section>
    );
};