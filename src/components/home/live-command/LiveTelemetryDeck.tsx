"use client";

import {motion} from "framer-motion";
import type {NasaLiveDonki, NasaLiveNeo} from "@/src/types/nasaLive";

type Props = {
    locale: {
        telemetry: {
            syncing: string;
        };
    };
    neo: NasaLiveNeo | null;
    donki: NasaLiveDonki | null;
};

const formatDistance = (value: number) => {
    if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(1)}M km`;
    }

    return `${Math.round(value).toLocaleString()} km`;
};

const formatVelocity = (value: number) => {
    return `${Math.round(value).toLocaleString()} km/h`;
};

export const LiveTelemetryDeck = ({neo, donki}: Props) => {
    return (
        <motion.section
            initial={{opacity: 0, x: 30}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true, margin: "-100px"}}
            transition={{duration: 0.7}}
            className="relative min-h-[640px]"
        >
            {/* background atmosphere */}
            <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.12),transparent_22%),radial-gradient(circle_at_20%_85%,rgba(168,85,247,0.08),transparent_20%),radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.04),transparent_45%)]" />

                <motion.div
                    className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/6"
                    animate={{rotate: 360}}
                    transition={{duration: 90, repeat: Infinity, ease: "linear"}}
                />
            </div>

            {/* energy beams */}
            <EnergyBeam className="left-[31%] top-[31%] rotate-[220deg]" />
            <EnergyBeam className="right-[31%] top-[31%] rotate-[-40deg]" />
            <EnergyBeam className="left-[31%] bottom-[31%] rotate-[140deg]" />
            <EnergyBeam className="right-[31%] bottom-[31%] rotate-[40deg]" />

            {/* nodes */}
            <HudNode
                className="left-8 top-10"
                title="Closest"
                value={neo?.closestName ?? "SYNC"}
                subtitle={
                    neo
                        ? formatDistance(neo.closestDistanceKm)
                        : "NASA feed"
                }
                accent="cyan"
            />

            <HudNode
                className="right-8 top-10"
                title="Velocity"
                value={
                    neo
                        ? formatVelocity(neo.closestVelocityKmh)
                        : "SYNC"
                }
                subtitle="orbital speed"
                accent="cyan"
            />

            <HudNode
                className="left-8 bottom-10"
                title="Diameter"
                value={
                    neo
                        ? `${Math.round(neo.estimatedDiameterMeters)}m`
                        : "SYNC"
                }
                subtitle="estimated size"
                accent="violet"
            />

            <HudNode
                className="right-8 bottom-10"
                title="Threat"
                value={neo?.isHazardous ? "WATCH" : "SAFE"}
                subtitle={
                    donki
                        ? `${donki.cmeEvents} CME`
                        : "solar sync"
                }
                accent={neo?.isHazardous ? "red" : "green"}
            />

            {/* center core */}
            <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                    className="relative flex h-[280px] w-[280px] items-center justify-center rounded-full"
                    animate={{rotate: 360}}
                    transition={{duration: 60, repeat: Infinity, ease: "linear"}}
                >
                    <div className="absolute inset-0 rounded-full border border-cyan-300/12" />
                    <div className="absolute inset-5 rounded-full border border-cyan-300/10" />
                    <div className="absolute inset-10 rounded-full border border-cyan-300/10" />
                    <div className="absolute inset-16 rounded-full border border-cyan-300/10" />

                    <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{rotate: 360}}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        <div className="absolute left-1/2 top-0 h-14 w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyan-300 to-transparent" />
                    </motion.div>

                    <motion.div
                        className="absolute inset-12 rounded-full border border-cyan-300/10"
                        animate={{scale: [1, 1.06, 1]}}
                        transition={{duration: 2.8, repeat: Infinity}}
                    />

                    <div className="absolute inset-[74px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.14),rgba(3,10,20,0.95))] backdrop-blur-xl" />

                    <div className="relative z-20 text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-cyan-300">
                            NEO COMMAND CORE
                        </p>

                        <h3 className="mt-5 text-7xl font-black tracking-[-0.08em] text-white">
                            {neo?.totalToday ?? "—"}
                        </h3>

                        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-slate-400">
                            near earth objects
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

type BeamProps = {
    className: string;
};

const EnergyBeam = ({className}: BeamProps) => {
    return (
        <div
            className={`absolute z-10 h-[2px] w-[170px] origin-left overflow-hidden bg-white/5 ${className}`}
        >
            <motion.div
                className="h-full w-20 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
                animate={{
                    x: [-80, 180],
                }}
                transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </div>
    );
};

type NodeProps = {
    className: string;
    title: string;
    value: string;
    subtitle: string;
    accent: "cyan" | "green" | "red" | "violet";
};

const accentMap = {
    cyan: "rgba(34,211,238,0.22)",
    green: "rgba(16,185,129,0.22)",
    red: "rgba(248,113,113,0.22)",
    violet: "rgba(168,85,247,0.22)",
};

const dotMap = {
    cyan: "bg-cyan-300",
    green: "bg-emerald-400",
    red: "bg-red-400",
    violet: "bg-violet-400",
};

const HudNode = ({
                     className,
                     title,
                     value,
                     subtitle,
                     accent,
                 }: NodeProps) => {
    return (
        <motion.div
            initial={{opacity: 0, scale: 0.9}}
            whileInView={{opacity: 1, scale: 1}}
            viewport={{once: true}}
            transition={{duration: 0.45}}
            className={`absolute z-20 flex h-[170px] w-[170px] flex-col items-center justify-center rounded-full border border-white/8 backdrop-blur-2xl ${className}`}
            style={{
                background: `radial-gradient(circle, ${accentMap[accent]}, rgba(4,10,22,0.82))`,
            }}
        >
            <div className={`mb-3 h-3 w-3 rounded-full ${dotMap[accent]}`} />

            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">
                {title}
            </p>

            <h4 className="mt-3 px-3 text-center text-2xl font-black tracking-[-0.05em] text-white">
                {value}
            </h4>

            <p className="mt-2 px-4 text-center text-xs leading-5 text-slate-400">
                {subtitle}
            </p>
        </motion.div>
    );
};