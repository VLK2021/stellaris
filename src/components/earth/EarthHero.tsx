"use client";

import {motion} from "framer-motion";
import {Activity, Camera, Database, Layers3, Satellite} from "lucide-react";

import type {EarthOverview} from "@/src/types/earth/earth.types";
import type {EarthLocale, EarthTab} from "@/src/types/earth/earthUi.types";

type Props = {
    data: EarthOverview;
    activeTab: EarthTab;
    setActiveTab: (tab: EarthTab) => void;
    t: EarthLocale;
};

export const EarthHero = ({data, activeTab, setActiveTab, t}: Props) => {
    const image = data.epicImages[0]?.imageUrl;

    return (
        <section className="relative min-h-[520px] overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
            {image && (
                <motion.img
                    src={image}
                    alt="NASA EPIC Earth"
                    className="absolute right-[-120px] top-[-110px] h-[720px] w-[720px] rounded-full object-cover opacity-45"
                    animate={{scale: [1, 1.035, 1], rotate: [0, 1.5, 0]}}
                    transition={{duration: 12, repeat: Infinity, ease: "easeInOut"}}
                />
            )}

            <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-card)_0%,rgba(10,18,32,0.92)_42%,rgba(10,18,32,0.42)_100%)]" />

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />

            <div className="relative z-10 flex min-h-[520px] flex-col justify-between p-6 sm:p-8 lg:p-10">
                <div className="max-w-4xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                        <Satellite className="h-3.5 w-3.5" />
                        {t.badge}
                    </div>

                    <h1 className="mt-6 max-w-5xl text-4xl font-black uppercase tracking-[-0.07em] sm:text-6xl xl:text-7xl">
                        {t.title}
                    </h1>

                    <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
                        {t.subtitle}
                    </p>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-5">
                    <div className="flex flex-wrap gap-3">
                        <HeroTab active={activeTab === "overview"} onClick={() => setActiveTab("overview")} label={t.overview} />
                        <HeroTab active={activeTab === "events"} onClick={() => setActiveTab("events")} label={t.events} />
                        <HeroTab active={activeTab === "epic"} onClick={() => setActiveTab("epic")} label={t.epic} />
                        <HeroTab active={activeTab === "layers"} onClick={() => setActiveTab("layers")} label={t.layers} />
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <HeroMetric icon={Activity} label={t.activeEvents} value={data.stats.activeEvents} onClick={() => setActiveTab("events")} />
                        <HeroMetric icon={Camera} label={t.epicImages} value={data.stats.epicImages} onClick={() => setActiveTab("epic")} />
                        <HeroMetric icon={Layers3} label={t.satelliteLayers} value={data.stats.layers} onClick={() => setActiveTab("layers")} />
                        <HeroMetric icon={Database} label={t.closedEvents} value={data.stats.closedEvents} onClick={() => setActiveTab("events")} />
                    </div>
                </div>
            </div>
        </section>
    );
};

const HeroTab = ({
                     active,
                     label,
                     onClick,
                 }: {
    active: boolean;
    label: string;
    onClick: () => void;
}) => (
    <button
        type="button"
        onClick={onClick}
        className={`rounded-full px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.18em] transition ${
            active
                ? "bg-[var(--color-accent)] text-white shadow-[var(--shadow-glow)]"
                : "border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]"
        }`}
    >
        {label}
    </button>
);

const HeroMetric = ({
                        icon: Icon,
                        label,
                        value,
                        onClick,
                    }: {
    icon: typeof Activity;
    label: string;
    value: number;
    onClick: () => void;
}) => (
    <button
        type="button"
        onClick={onClick}
        className="min-w-[150px] rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 text-left backdrop-blur-xl transition hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
    >
        <Icon className="h-4 w-4 text-[var(--color-accent)]" />
        <p className="mt-3 text-3xl font-black">{value}</p>
        <p className="mt-1 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {label}
        </p>
    </button>
);