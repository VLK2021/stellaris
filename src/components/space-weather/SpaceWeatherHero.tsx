"use client";

import {motion} from "framer-motion";
import {Database, RadioTower, Satellite, Sun} from "lucide-react";

import type {SpaceWeatherLocale} from "@/src/types/space-weather/spaceWeatherUi.types";

type Props = {
    locale: SpaceWeatherLocale;
};

export const SpaceWeatherHero = ({locale}: Props) => {
    return (
        <div className="relative min-h-[430px] overflow-hidden p-5 sm:p-7 lg:p-9">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_46%,rgba(234,88,12,0.35),transparent_34%),radial-gradient(circle_at_86%_42%,rgba(56,189,248,0.22),transparent_36%)]" />

            <div className="absolute left-[-210px] top-[-40px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_42%_50%,rgba(251,146,60,1),rgba(234,88,12,0.7)_28%,rgba(190,24,93,0.18)_52%,transparent_72%)] shadow-[0_0_120px_rgba(234,88,12,0.35)]" />

            <motion.div
                className="absolute left-[70px] top-[145px] h-[2px] w-[500px] rotate-[-16deg] bg-gradient-to-r from-[var(--color-warning)] via-[var(--color-error)] to-transparent blur-[1px]"
                animate={{x: [0, 28, 0], opacity: [0.25, 0.85, 0.25]}}
                transition={{duration: 4, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="absolute right-[8%] top-[72px] hidden h-[280px] w-[280px] rounded-full border border-[var(--color-accent)]/25 lg:block" />
            <div className="absolute right-[11%] top-[108px] hidden h-[205px] w-[205px] rounded-full border border-[var(--color-accent)]/15 lg:block" />

            <motion.div
                className="absolute right-[8.5%] top-[198px] hidden h-[2px] w-[360px] rotate-[18deg] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent blur-[1px] lg:block"
                animate={{x: [-42, 42], opacity: [0, 0.65, 0]}}
                transition={{duration: 5.5, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="absolute right-[16.2%] top-[180px] hidden h-16 w-16 rounded-full bg-[radial-gradient(circle,var(--color-earth),rgba(56,189,248,0.22)_58%,transparent_76%)] shadow-[0_0_70px_rgba(56,189,248,0.45)] lg:block" />

            <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center pt-10 text-center">
                <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)] backdrop-blur-xl">
                    <RadioTower className="h-3.5 w-3.5" />
                    {locale.badge}
                </p>

                <h1 className="mt-5 text-4xl font-black uppercase tracking-[-0.04em] text-[var(--color-text)] sm:text-5xl lg:text-[58px] lg:leading-[0.92]">
                    <span>Space </span>
                    <span className="bg-gradient-to-r from-[var(--color-warning)] via-[var(--color-accent)] to-[var(--color-plasma)] bg-clip-text text-transparent">
                        Weather
                    </span>
                    <span> Center</span>
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">
                    {locale.text}
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <MiniSignal icon={Sun} label="Solar Activity" />
                    <MiniSignal icon={Satellite} label="DONKI Network" />
                    <MiniSignal icon={Database} label="NASA Data" />
                </div>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)] backdrop-blur-xl">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-success)] shadow-[0_0_18px_var(--color-success)]" />
                    Live data · UTC timeline
                </div>
            </div>
        </div>
    );
};

const MiniSignal = ({
                        icon: Icon,
                        label,
                    }: {
    icon: typeof Sun;
    label: string;
}) => (
    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)] backdrop-blur-xl">
        <Icon className="h-3.5 w-3.5 text-[var(--color-accent)]" />
        {label}
    </div>
);