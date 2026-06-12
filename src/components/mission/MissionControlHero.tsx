"use client";

import {motion} from "framer-motion";
import {
    Activity,
    Database,
    Orbit,
    Radar,
    Rocket,
    Satellite,
    Sparkles,
    Telescope,
} from "lucide-react";

import {useLanguage} from "@/src/context";

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
        <section className="relative overflow-hidden rounded-[2.8rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl md:p-7">
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    animate={{
                        opacity: [0.55, 0.95, 0.55],
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,var(--color-accent-soft),transparent_30%),radial-gradient(circle_at_92%_10%,var(--color-glass),transparent_34%),radial-gradient(circle_at_52%_110%,var(--color-card-deep),transparent_32%)] bg-[length:140%_140%]"
                />

                <motion.div
                    animate={{rotate: 360}}
                    transition={{
                        duration: 90,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute right-[-9rem] top-[-11rem] h-[28rem] w-[28rem] rounded-full border border-dashed border-[var(--color-border)]"
                />

                <motion.div
                    animate={{rotate: -360}}
                    transition={{
                        duration: 70,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute right-[2rem] top-[2rem] h-52 w-52 rounded-full border border-dashed border-[var(--color-border-strong)]"
                />
            </div>

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

                    <motion.h1
                        initial={{opacity: 0, y: 18}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.55, delay: 0.05}}
                        className="mt-5 max-w-5xl bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-4xl font-black uppercase leading-[0.9] tracking-[-0.075em] text-transparent sm:text-5xl md:text-7xl"
                    >
                        {t.heroTitle}
                    </motion.h1>

                    <motion.p
                        initial={{opacity: 0, y: 18}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.55, delay: 0.1}}
                        className="mt-5 max-w-3xl text-sm leading-7 text-[var(--color-text-muted)] md:text-base"
                    >
                        {t.heroText}
                    </motion.p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                        {statItems.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{opacity: 0, y: 16}}
                                animate={{opacity: 1, y: 0}}
                                whileHover={{y: -6, scale: 1.015}}
                                transition={{
                                    duration: 0.45,
                                    delay: 0.12 + index * 0.04,
                                }}
                                className="group relative overflow-hidden rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-soft)] via-transparent to-[var(--color-glass)] opacity-0 transition group-hover:opacity-100" />

                                <div className="relative z-10">
                                    <item.icon className="h-5 w-5 text-[var(--color-accent)]" />

                                    <p className="mt-3 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--color-text-muted)]">
                                        {item.label}
                                    </p>

                                    <p className="mt-1 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-3xl font-black tracking-[-0.06em] text-transparent">
                                        {item.value}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="relative min-h-[330px] overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-5 backdrop-blur-xl">
                    <motion.div
                        animate={{
                            opacity: [0.45, 0.85, 0.45],
                            scale: [1, 1.04, 1],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-accent-soft),transparent_28%),radial-gradient(circle_at_80%_15%,var(--color-glass),transparent_30%)]"
                    />

                    <motion.div
                        animate={{rotate: 360}}
                        transition={{
                            duration: 34,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[var(--color-border-strong)]"
                    />

                    <motion.div
                        animate={{rotate: -360}}
                        transition={{
                            duration: 46,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[var(--color-border)]"
                    />

                    <motion.div
                        animate={{
                            scale: [1, 1.08, 1],
                            opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--color-accent)] bg-[var(--color-accent-soft)] shadow-[var(--shadow-glow)]"
                    >
                        <Activity className="h-9 w-9 text-[var(--color-accent)]" />
                    </motion.div>

                    <RadarNode className="left-5 top-5" label={t.wiki} value="Summary" />
                    <RadarNode className="right-5 top-12" label="NASA" value={t.nasaMedia} />
                    <RadarNode className="bottom-5 left-7" label="Data" value={t.normalized} />
                    <RadarNode className="bottom-10 right-8" label="Signal" value={t.online} />

                    <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass-strong)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)] backdrop-blur-xl">
                        <Sparkles className="h-4 w-4" />
                        {t.pipeline}
                    </div>
                </div>
            </div>
        </section>
    );
};

const RadarNode = ({
                       className,
                       label,
                       value,
                   }: {
    className: string;
    label: string;
    value: string;
}) => (
    <motion.div
        animate={{y: [0, -7, 0]}}
        transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
        }}
        className={`absolute rounded-2xl border border-[var(--color-border)] bg-[var(--color-glass-strong)] px-4 py-3 backdrop-blur-xl ${className}`}
    >
        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            {label}
        </p>

        <p className="mt-1 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-sm font-black text-transparent">
            {value}
        </p>
    </motion.div>
);