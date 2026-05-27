"use client";

import Link from "next/link";
import {motion} from "framer-motion";

import type {IssPosition, NasaLiveDonki, NasaLiveNeo} from "@/src/types/nasaLive";

type Props = {
    locale: {
        telemetry: {
            syncing?: string;
            neoTitle?: string;
            neoSubtitle?: string;
            velocityTitle?: string;
            velocitySubtitle?: string;
            diameterTitle?: string;
            diameterSubtitle?: string;
            solarTitle?: string;
            solarSubtitle?: string;
            commandCore?: string;
            nearObjects?: string;
            safe?: string;
        };
    };
    neo: NasaLiveNeo | null;
    donki: NasaLiveDonki | null;
    iss: IssPosition | null;
};

const formatDistance = (value: number) => {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M km`;
    return `${Math.round(value).toLocaleString()} km`;
};

const formatVelocity = (value: number) => `${Math.round(value).toLocaleString()} km/h`;

export const LiveTelemetryDeck = ({locale, neo, donki}: Props) => {
    const t = locale.telemetry;

    return (
        <motion.section
            initial={{opacity: 0, x: 26, scale: 0.98}}
            whileInView={{opacity: 1, x: 0, scale: 1}}
            viewport={{once: true, margin: "-100px"}}
            transition={{duration: 0.7}}
            className="relative min-h-[540px] overflow-hidden rounded-[2rem]"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(34,211,238,0.1),transparent_46%),radial-gradient(circle_at_80%_18%,rgba(34,211,238,0.08),transparent_28%),radial-gradient(circle_at_20%_82%,rgba(168,85,247,0.08),transparent_28%)]" />

            <div className="absolute inset-0 opacity-55">
                <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/5" />
                <div className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/7" />
                <div className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10" />
            </div>

            <EnergyBeam className="left-[34%] top-[29%] rotate-[-34deg]" />
            <EnergyBeam className="left-[55%] top-[31%] rotate-[34deg]" reverse />
            <EnergyBeam className="left-[32%] top-[66%] rotate-[35deg]" reverse />
            <EnergyBeam className="left-[55%] top-[67%] rotate-[-35deg]" />

            <Link
                href="/asteroids"
                className="absolute left-1/2 top-1/2 z-20 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full outline-none"
            >
                <motion.div
                    whileHover={{scale: 1.035}}
                    className="relative h-full w-full rounded-full"
                >
                    <motion.div
                        className="absolute inset-0 rounded-full border border-cyan-300/18"
                        animate={{rotate: 360}}
                        transition={{duration: 28, repeat: Infinity, ease: "linear"}}
                    >
                        <span className="absolute left-1/2 top-[-5px] h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.9)]" />
                    </motion.div>

                    <motion.div
                        className="absolute inset-7 rounded-full border border-cyan-300/12"
                        animate={{rotate: -360}}
                        transition={{duration: 36, repeat: Infinity, ease: "linear"}}
                    />

                    <motion.div
                        className="absolute inset-14 rounded-full border border-cyan-300/10"
                        animate={{scale: [1, 1.08, 1]}}
                        transition={{duration: 3.2, repeat: Infinity}}
                    />

                    <div className="absolute inset-[62px] grid place-items-center rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.14),rgba(2,6,17,0.95))] shadow-[0_0_70px_rgba(34,211,238,0.12)] backdrop-blur-xl">
                        <div className="text-center">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-cyan-300">
                                {t.commandCore ?? "NEO command core"}
                            </p>

                            <h3 className="mt-3 text-6xl font-black leading-none tracking-[-0.08em] text-white">
                                {neo?.totalToday ?? "—"}
                            </h3>

                            <p className="mt-3 text-[10px] uppercase tracking-[0.24em] text-slate-400">
                                {t.nearObjects ?? "near earth objects"}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </Link>

            <CircleNode
                href="/asteroids"
                className="left-[5%] top-[6%] h-[174px] w-[174px]"
                title={t.neoTitle ?? "Closest object"}
                value={neo?.closestName ?? t.syncing ?? "Syncing"}
                subtitle={neo ? formatDistance(neo.closestDistanceKm) : "NASA NeoWs"}
                glow="cyan"
            />

            <CircleNode
                href="/asteroids"
                className="right-[4%] top-[8%] h-[158px] w-[158px]"
                title={t.velocityTitle ?? "Velocity"}
                value={neo ? formatVelocity(neo.closestVelocityKmh) : "—"}
                subtitle={t.velocitySubtitle ?? "orbital speed"}
                glow="blue"
            />

            <CircleNode
                href="/asteroids"
                className="left-[6%] bottom-[6%] h-[188px] w-[188px]"
                title={t.diameterTitle ?? "Diameter"}
                value={neo ? `${Math.round(neo.estimatedDiameterMeters)}m` : "—"}
                subtitle={t.diameterSubtitle ?? "estimated size"}
                glow="purple"
            />

            <CircleNode
                href="/space-weather"
                className="right-[6%] bottom-[8%] h-[168px] w-[168px]"
                title={t.solarTitle ?? "Solar activity"}
                value={neo?.isHazardous ? "RISK" : t.safe ?? "SAFE"}
                subtitle={donki ? `${donki.cmeEvents} CME · ${donki.solarFlares} FLR` : "DONKI"}
                glow={neo?.isHazardous ? "red" : "green"}
            />
        </motion.section>
    );
};

type EnergyBeamProps = {
    className: string;
    reverse?: boolean;
};

const EnergyBeam = ({className, reverse}: EnergyBeamProps) => (
    <div className={`absolute z-10 h-[2px] w-[178px] origin-left overflow-hidden bg-cyan-300/10 ${className}`}>
        <motion.div
            className="h-full w-24 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
            animate={{x: reverse ? [180, -90] : [-90, 180]}}
            transition={{duration: 1.65, repeat: Infinity, ease: "linear"}}
        />
    </div>
);

type CircleNodeProps = {
    href: string;
    className: string;
    title: string;
    value: string;
    subtitle: string;
    glow: "cyan" | "blue" | "purple" | "green" | "red";
};

const glowMap = {
    cyan: "rgba(34,211,238,0.2)",
    blue: "rgba(59,130,246,0.18)",
    purple: "rgba(168,85,247,0.2)",
    green: "rgba(16,185,129,0.18)",
    red: "rgba(248,113,113,0.2)",
};

const dotMap = {
    cyan: "bg-cyan-300",
    blue: "bg-blue-300",
    purple: "bg-violet-400",
    green: "bg-emerald-400",
    red: "bg-red-400",
};

const CircleNode = ({href, className, title, value, subtitle, glow}: CircleNodeProps) => (
    <Link href={href} className={`absolute z-20 rounded-full outline-none ${className}`}>
        <motion.div
            initial={{opacity: 0, scale: 0.92}}
            whileInView={{opacity: 1, scale: 1}}
            whileHover={{scale: 1.045}}
            viewport={{once: true}}
            transition={{duration: 0.5}}
            className="h-full w-full rounded-full border border-white/10 shadow-[0_18px_65px_rgba(0,0,0,0.26)] backdrop-blur-2xl"
            style={{
                background: `radial-gradient(circle, ${glowMap[glow]}, rgba(2,6,17,0.86))`,
            }}
        >
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <span className={`mb-3 h-3 w-3 rounded-full ${dotMap[glow]} shadow-[0_0_18px_rgba(34,211,238,0.55)]`} />

                <p className="text-[8px] font-black uppercase leading-tight tracking-[0.24em] text-slate-400">
                    {title}
                </p>

                <h4 className="mt-3 max-w-[125px] break-words text-center text-xl font-black leading-[1.05] tracking-[-0.045em] text-white">
                    {value}
                </h4>

                <p className="mt-2 max-w-[120px] text-center text-[11px] leading-4 text-slate-400">
                    {subtitle}
                </p>
            </div>
        </motion.div>
    </Link>
);