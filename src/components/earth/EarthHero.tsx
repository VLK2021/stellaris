"use client";

import {motion} from "framer-motion";
import {Activity, Camera, Globe2, Layers3} from "lucide-react";

import type {EarthTab} from "@/src/types/earth/earthUi.types";
import type {EarthOverview} from "@/src/types/earth/earth.types";

import {EarthFloatingStat} from "./EarthFloatingStat";
import {EarthTabButton} from "./EarthTabButton";

type Props = {
    data: EarthOverview;
    activeTab: EarthTab;
    setActiveTab: (tab: EarthTab) => void;
    t: {
        badge: string;
        title: string;
        subtitle: string;
        overview: string;
        events: string;
        epic: string;
        layers: string;
        activeEvents: string;
        epicImages: string;
        satelliteLayers: string;
    };
};

export const EarthHero = ({data, activeTab, setActiveTab, t}: Props) => {
    return (
        <section className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-7">
            <motion.div
                className="absolute left-[-28%] top-[44%] h-[2px] w-[78%] rotate-[-13deg] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent blur-[1px]"
                animate={{x: ["0%", "170%"], opacity: [0, 0.8, 0]}}
                transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_48%,rgba(34,197,94,0.2),transparent_28%)]" />

            <div className="relative z-10 grid min-h-[460px] gap-6 xl:grid-cols-[1fr_520px] xl:items-center">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                        <Globe2 className="h-3.5 w-3.5" />
                        {t.badge}
                    </div>

                    <h1 className="mt-6 max-w-4xl text-4xl font-black uppercase tracking-[-0.06em] text-[var(--color-text)] sm:text-5xl lg:text-6xl">
                        {t.title}
                    </h1>

                    <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
                        {t.subtitle}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <EarthTabButton active={activeTab === "overview"} onClick={() => setActiveTab("overview")}>
                            {t.overview}
                        </EarthTabButton>
                        <EarthTabButton active={activeTab === "events"} onClick={() => setActiveTab("events")}>
                            {t.events}
                        </EarthTabButton>
                        <EarthTabButton active={activeTab === "epic"} onClick={() => setActiveTab("epic")}>
                            {t.epic}
                        </EarthTabButton>
                        <EarthTabButton active={activeTab === "layers"} onClick={() => setActiveTab("layers")}>
                            {t.layers}
                        </EarthTabButton>
                    </div>
                </div>

                <div className="relative mx-auto h-[360px] w-full max-w-[460px]">
                    <motion.div className="absolute inset-0 rounded-full border border-[var(--color-accent)]/25" animate={{rotate: 360}} transition={{duration: 36, repeat: Infinity, ease: "linear"}} />
                    <motion.div className="absolute inset-10 rounded-full border border-emerald-400/25" animate={{rotate: -360}} transition={{duration: 26, repeat: Infinity, ease: "linear"}} />
                    <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.95),rgba(14,165,233,0.25)_58%,transparent_74%)] shadow-[0_0_110px_rgba(34,197,94,0.32)]" />

                    <EarthFloatingStat className="left-0 top-7" icon={Activity} label={t.activeEvents} value={data.stats.activeEvents} />
                    <EarthFloatingStat className="right-0 top-20" icon={Camera} label={t.epicImages} value={data.stats.epicImages} />
                    <EarthFloatingStat className="bottom-8 left-8" icon={Layers3} label={t.satelliteLayers} value={data.stats.layers} />
                </div>
            </div>
        </section>
    );
};