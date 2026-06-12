"use client";

import {motion} from "framer-motion";

import type {MissionCatalogItem} from "@/src/constants/missions";

import {MissionControlHero} from "./MissionControlHero";
import {MissionExplorer} from "./MissionExplorer";

type Props = {
    missions: MissionCatalogItem[];
    stats: {
        total: number;
        crewed: number;
        robotic: number;
        telescope: number;
        station: number;
    };
};

export const MissionsPage = ({missions, stats}: Props) => {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--body-bg)] text-[var(--color-text)]">
            <div className="pointer-events-none fixed inset-0">
                <div
                    className="absolute inset-0"
                    style={{background: "var(--hero-bg)"}}
                />

                <motion.div
                    animate={{
                        x: ["-8%", "6%", "-8%"],
                        y: ["0%", "8%", "0%"],
                        opacity: [0.55, 0.9, 0.55],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute left-[-18rem] top-[6rem] h-[42rem] w-[42rem] rounded-full bg-[var(--color-accent-soft)] blur-3xl"
                />

                <motion.div
                    animate={{
                        x: ["8%", "-6%", "8%"],
                        y: ["4%", "-6%", "4%"],
                        opacity: [0.45, 0.85, 0.45],
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute right-[-18rem] top-[8rem] h-[44rem] w-[44rem] rounded-full bg-[var(--color-glass)] blur-3xl"
                />

                <motion.div
                    animate={{
                        scale: [1, 1.12, 1],
                        opacity: [0.45, 0.75, 0.45],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-[-22rem] left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[var(--color-accent-soft)] blur-3xl"
                />

                <div className="absolute inset-0 bg-[linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] bg-[size:58px_58px] opacity-30" />

                <motion.div
                    animate={{backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]}}
                    transition={{
                        duration: 26,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,var(--color-accent-soft),transparent_24%),radial-gradient(circle_at_80%_30%,var(--color-glass),transparent_26%),radial-gradient(circle_at_50%_90%,var(--color-card),transparent_30%)] bg-[length:140%_140%]"
                />
            </div>

            <div className="pointer-events-none fixed inset-0 z-[1]">
                {Array.from({length: 18}).map((_, index) => (
                    <motion.span
                        key={index}
                        animate={{
                            y: ["0vh", "100vh"],
                            opacity: [0, 0.8, 0],
                        }}
                        transition={{
                            duration: 12 + index,
                            repeat: Infinity,
                            delay: index * 0.7,
                            ease: "linear",
                        }}
                        className="absolute h-1 w-1 rounded-full bg-[var(--color-accent)]"
                        style={{
                            left: `${(index * 17) % 100}%`,
                            top: `${(index * 23) % 80}%`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 mx-auto flex max-w-[1540px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                <MissionControlHero stats={stats} />

                <MissionExplorer
                    missions={missions}
                    stats={stats}
                />
            </div>
        </main>
    );
};