"use client";

import {motion} from "framer-motion";
import {Activity, CloudSun, Earth, Orbit, Radar, Rocket} from "lucide-react";

const orbitCards = [
    {label: "Earth", value: "EPIC", icon: Earth},
    {label: "Mars", value: "Rover feed", icon: Orbit},
    {label: "Asteroids", value: "NeoWs", icon: Radar},
    {label: "Solar", value: "DONKI", icon: CloudSun},
];

export const HeroOrbitVisual = () => {
    return (
        <motion.div
            initial={{opacity: 0, scale: 0.92}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.8, ease: "easeOut", delay: 0.15}}
            className="relative mx-auto grid aspect-square w-full max-w-[640px] place-items-center"
        >
            <div className="absolute inset-0 rounded-full border border-[rgba(56,189,248,0.14)]" />

            <motion.div
                className="absolute inset-[10%] rounded-full border border-dashed border-[rgba(56,189,248,0.22)]"
                animate={{rotate: 360}}
                transition={{duration: 42, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute inset-[22%] rounded-full border border-[rgba(139,92,246,0.22)]"
                animate={{rotate: -360}}
                transition={{duration: 52, repeat: Infinity, ease: "linear"}}
            />

            <div className="relative grid h-[52%] w-[52%] place-items-center rounded-full border border-[rgba(56,189,248,0.28)] bg-[radial-gradient(circle_at_35%_28%,rgba(56,189,248,0.45),rgba(8,18,34,0.92)_42%,rgba(2,6,23,1)_72%)] shadow-[0_0_120px_rgba(56,189,248,0.28)]">
                <motion.div
                    className="absolute inset-[-18px] rounded-full border border-[rgba(56,189,248,0.14)]"
                    animate={{scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5]}}
                    transition={{duration: 4, repeat: Infinity}}
                />

                <Rocket className="relative h-16 w-16 text-[var(--color-accent)] drop-shadow-[0_0_24px_rgba(56,189,248,0.8)]" />

                <div className="absolute bottom-10 flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[rgba(2,6,23,0.68)] px-4 py-2 text-xs text-[var(--color-text-muted)] backdrop-blur-xl">
                    <Activity className="h-4 w-4 text-[var(--color-success)]" />
                    Signal active
                </div>
            </div>

            {orbitCards.map((item, index) => {
                const Icon = item.icon;
                const positions = [
                    "left-[2%] top-[22%]",
                    "right-[1%] top-[28%]",
                    "bottom-[18%] left-[8%]",
                    "bottom-[12%] right-[10%]",
                ];

                return (
                    <motion.div
                        key={item.label}
                        initial={{opacity: 0, y: 18}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3 + index * 0.1}}
                        className={`absolute ${positions[index]} hidden min-w-[150px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.045)] p-4 backdrop-blur-2xl sm:block`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(56,189,248,0.25)] bg-[rgba(56,189,248,0.08)] text-[var(--color-accent)]">
                                <Icon className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                                    {item.label}
                                </div>
                                <div className="mt-1 text-sm font-bold text-[var(--color-text)]">
                                    {item.value}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
};