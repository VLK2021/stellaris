"use client";

import {motion} from "framer-motion";
import {Earth, Orbit, Satellite, SunMedium} from "lucide-react";

const orbitItems = [
    {
        label: "Earth",
        subLabel: "EPIC imagery",
        icon: Earth,
        orbitClass: "inset-[18%]",
        duration: 28,
        delay: 0,
        color: "rgba(56,189,248,0.95)",
    },
    {
        label: "Mars",
        subLabel: "Rover data",
        icon: Orbit,
        orbitClass: "inset-[6%]",
        duration: 42,
        delay: -12,
        color: "rgba(239,106,58,0.95)",
    },
    {
        label: "ISS",
        subLabel: "Low Earth orbit",
        icon: Satellite,
        orbitClass: "inset-[28%]",
        duration: 16,
        delay: -5,
        color: "rgba(248,250,252,0.95)",
    },
];

export const HeroOrbitVisual = () => {
    return (
        <motion.div
            initial={{opacity: 0, scale: 0.94}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.75, ease: "easeOut", delay: 0.15}}
            className="relative mx-auto grid aspect-square w-full max-w-[520px] place-items-center sm:max-w-[580px]"
        >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.10),transparent_64%)]" />

            <div className="absolute inset-[6%] rounded-full border border-[rgba(239,106,58,0.22)]" />
            <div className="absolute inset-[18%] rounded-full border border-[rgba(56,189,248,0.22)]" />
            <div className="absolute inset-[28%] rounded-full border border-dashed border-[rgba(248,250,252,0.20)]" />

            <div className="relative grid h-[30%] w-[30%] place-items-center rounded-full border border-[rgba(251,146,60,0.35)] bg-[radial-gradient(circle_at_35%_28%,rgba(251,146,60,0.92),rgba(251,191,36,0.42)_35%,rgba(2,6,23,0.96)_72%)] shadow-[0_0_120px_rgba(251,146,60,0.34)]">
                <motion.div
                    className="absolute inset-[-22px] rounded-full border border-[rgba(251,146,60,0.14)]"
                    animate={{scale: [1, 1.08, 1], opacity: [0.45, 1, 0.45]}}
                    transition={{duration: 4.2, repeat: Infinity}}
                />

                <motion.div
                    animate={{rotate: 360}}
                    transition={{duration: 18, repeat: Infinity, ease: "linear"}}
                >
                    <SunMedium className="h-12 w-12 text-[var(--color-sun)] drop-shadow-[0_0_26px_rgba(251,146,60,0.85)]" />
                </motion.div>

                <div className="absolute -bottom-7 whitespace-nowrap rounded-full border border-[var(--color-border)] bg-[rgba(2,6,23,0.78)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)] backdrop-blur-xl">
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
                            <div className="flex min-w-[112px] items-center gap-2 rounded-full border border-[var(--color-border)] bg-[rgba(5,11,22,0.82)] px-3 py-2 shadow-[0_0_32px_rgba(56,189,248,0.13)] backdrop-blur-xl">
                                <div
                                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border"
                                    style={{
                                        borderColor: item.color,
                                        color: item.color,
                                        boxShadow: `0 0 20px ${item.color}`,
                                    }}
                                >
                                    <Icon className="h-4 w-4" />
                                </div>

                                <div className="leading-none">
                                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-text)]">
                                        {item.label}
                                    </div>
                                    <div className="mt-1 text-[10px] text-[var(--color-text-muted)]">
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