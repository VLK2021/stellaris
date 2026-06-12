"use client";

import {motion} from "framer-motion";
import {
    Database,
    Orbit,
    Radar,
    Rocket,
    Satellite,
    Telescope,
} from "lucide-react";

import {useLanguage} from "@/src/context";

import {MissionGradientTitle} from "./MissionGradientTitle";
import {MissionRadarPanel} from "./MissionRadarPanel";
import {MissionStatCard} from "./MissionStatCard";

type Props = {
    stats: {
        total: number;
        crewed: number;
        robotic: number;
        telescope: number;
        station: number;
    };
};

export const MissionControlHero = ({stats}: Props) => {
    const {locale} = useLanguage();
    const t = locale.missions;

    const statItems = [
        {label: t.totalArchive, value: stats.total, icon: Database},
        {label: t.crewed, value: stats.crewed, icon: Rocket},
        {label: t.robotic, value: stats.robotic, icon: Satellite},
        {label: t.telescopes, value: stats.telescope, icon: Telescope},
        {label: t.stations, value: stats.station, icon: Orbit},
    ];

    return (
        <section className="relative overflow-hidden rounded-[2.8rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl md:p-7">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--color-glass-strong)] via-transparent to-[var(--color-accent-soft)] opacity-80" />

            <div className="relative z-10 grid gap-8 xl:grid-cols-[1fr_520px]">
                <div>
                    <motion.p
                        initial={{opacity: 0, y: 14}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.45}}
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)] backdrop-blur-xl"
                    >
                        <Radar className="h-4 w-4" />
                        {t.heroBadge}
                    </motion.p>

                    <motion.div
                        initial={{opacity: 0, y: 18}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.55, delay: 0.05}}
                    >
                        <MissionGradientTitle className="mt-5 max-w-5xl text-4xl leading-[0.9] sm:text-5xl md:text-7xl">
                            {t.heroTitle}
                        </MissionGradientTitle>
                    </motion.div>

                    <motion.p
                        initial={{opacity: 0, y: 18}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.55, delay: 0.1}}
                        className="mt-5 max-w-3xl text-sm leading-7 text-[var(--color-text-muted)] md:text-base"
                    >
                        {t.heroText}
                    </motion.p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                        {statItems.map((item) => (
                            <MissionStatCard
                                key={item.label}
                                icon={item.icon}
                                label={item.label}
                                value={item.value}
                            />
                        ))}
                    </div>
                </div>

                <MissionRadarPanel
                    wiki={t.wiki}
                    nasaMedia={t.nasaMedia}
                    normalized={t.normalized}
                    online={t.online}
                    pipeline={t.pipeline}
                    sourceLabels={t.sourceLabels}
                />
            </div>
        </section>
    );
};