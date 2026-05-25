"use client";

import {motion} from "framer-motion";
import {Earth, Orbit, Satellite, SunMedium} from "lucide-react";

const orbitItems = [
    {
        label: "Earth",
        shortLabel: "Earth",
        subLabel: "EPIC",
        icon: Earth,
        orbitClass: "inset-[20%]",
        duration: 28,
        delay: 0,
        colorVar: "var(--color-earth)",
    },
    {
        label: "Mars",
        shortLabel: "Mars",
        subLabel: "Rover",
        icon: Orbit,
        orbitClass: "inset-[7%]",
        duration: 42,
        delay: -12,
        colorVar: "var(--color-mars)",
    },
    {
        label: "ISS",
        shortLabel: "ISS",
        subLabel: "LEO",
        icon: Satellite,
        orbitClass: "inset-[31%]",
        duration: 16,
        delay: -5,
        colorVar: "var(--color-text)",
    },
];

export const HeroOrbitVisual = () => {
    return (
        <motion.div
            initial={{opacity: 0, scale: 0.94}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.75, ease: "easeOut", delay: 0.15}}
            className="relative mx-auto grid aspect-square w-full max-w-[330px] place-items-center sm:max-w-[460px] lg:max-w-[560px]"
        >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,var(--color-accent-soft),transparent_64%)]" />

            <div className="absolute inset-[7%] rounded-full border border-[var(--color-mars)]/30" />
            <div className="absolute inset-[20%] rounded-full border border-[var(--color-earth)]/30" />
            <div className="absolute inset-[31%] rounded-full border border-dashed border-[var(--color-border-strong)]" />

            <div className="relative grid h-[28%] w-[28%] place-items-center rounded-full border border-[var(--color-sun)]/40 bg-[radial-gradient(circle_at_35%_28%,var(--color-sun),rgba(251,191,36,0.46)_35%,var(--color-background)_76%)] shadow-[0_0_80px_rgba(251,146,60,0.32)] sm:shadow-[0_0_120px_rgba(251,146,60,0.38)]">
                <motion.div
                    className="absolute inset-[-14px] rounded-full border border-[var(--color-sun)]/20 sm:inset-[-22px]"
                    animate={{scale: [1, 1.08, 1], opacity: [0.45, 1, 0.45]}}
                    transition={{duration: 4.2, repeat: Infinity}}
                />

                <motion.div
                    animate={{rotate: 360}}
                    transition={{duration: 18, repeat: Infinity, ease: "linear"}}
                >
                    <SunMedium className="h-8 w-8 text-[var(--color-sun)] drop-shadow-[0_0_26px_rgba(251,146,60,0.85)] sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
                </motion.div>

                <div className="absolute -bottom-7 hidden whitespace-nowrap rounded-full border border-[var(--color-border)] bg-[var(--color-glass-strong)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)] backdrop-blur-xl sm:block">
                    NASA Data Core
                </div>
            </div>

            {orbitItems.map((item) => {
                const Icon = item.icon;

                return (
                    <motion.div
                        key={item.label}
                        className={`absolute ${item.orbitClass} rounded-full`}
                        animate={{rotate: 360}}
                        transition={{
                            duration: item.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: item.delay,
                        }}
                    >
                        <motion.div
                            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                            animate={{rotate: -360}}
                            transition={{
                                duration: item.duration,
                                repeat: Infinity,
                                ease: "linear",
                                delay: item.delay,
                            }}
                        >
                            <div className="flex min-w-[72px] items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-glass-strong)] px-2 py-1.5 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:min-w-[102px] sm:gap-2 sm:px-3 sm:py-2">
                                <div
                                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full border sm:h-9 sm:w-9"
                                    style={{
                                        borderColor: item.colorVar,
                                        color: item.colorVar,
                                        boxShadow: `0 0 16px ${item.colorVar}`,
                                    }}
                                >
                                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </div>

                                <div className="leading-none">
                                    <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-text)] sm:text-xs sm:tracking-[0.16em]">
                                        {item.shortLabel}
                                    </div>
                                    <div className="mt-0.5 text-[9px] text-[var(--color-text-muted)] sm:mt-1 sm:text-[10px]">
                                        {item.subLabel}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
};