"use client";

import {motion} from "framer-motion";
import type {IssPosition, NasaLiveDonki, NasaLiveNeo} from "@/src/types/nasaLive";

type Props = {
    locale: {
        telemetry: {
            neoTitle: string;
            neoSubtitle: string;
            velocityTitle: string;
            velocitySubtitle: string;
            diameterTitle: string;
            diameterSubtitle: string;
            solarTitle: string;
            solarSubtitle: string;
            commandCore: string;
            nearObjects: string;
            safe: string;
        };
    };
    neo: NasaLiveNeo | null;
    donki: NasaLiveDonki | null;
    iss: IssPosition | null;
};

export const LiveTelemetryDeck = ({locale, neo, donki}: Props) => {
    const t = locale.telemetry;

    return (
        <motion.section
            initial={{opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.7}}
            className="relative min-h-[580px]"
        >
            {/* subtle background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_60%)]" />

            {/* energy beams */}
            <motion.div
                animate={{opacity: [0.3, 1, 0.3]}}
                transition={{duration: 2.5, repeat: Infinity}}
                className="absolute left-[50%] top-[32%] h-[2px] w-[140px] rotate-[-42deg] bg-gradient-to-r from-cyan-400/0 via-cyan-300 to-cyan-400/0"
            />

            <motion.div
                animate={{opacity: [1, 0.3, 1]}}
                transition={{duration: 2.8, repeat: Infinity}}
                className="absolute left-[51%] top-[34%] h-[2px] w-[150px] rotate-[38deg] bg-gradient-to-r from-cyan-400/0 via-cyan-300 to-cyan-400/0"
            />

            <motion.div
                animate={{opacity: [0.4, 1, 0.4]}}
                transition={{duration: 2.2, repeat: Infinity}}
                className="absolute left-[34%] top-[62%] h-[2px] w-[150px] rotate-[38deg] bg-gradient-to-r from-cyan-400/0 via-cyan-300 to-cyan-400/0"
            />

            <motion.div
                animate={{opacity: [1, 0.4, 1]}}
                transition={{duration: 2.4, repeat: Infinity}}
                className="absolute left-[49%] top-[64%] h-[2px] w-[150px] rotate-[-38deg] bg-gradient-to-r from-cyan-400/0 via-cyan-300 to-cyan-400/0"
            />

            {/* center */}
            <div className="absolute left-1/2 top-1/2 z-20 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full">
                <div className="absolute inset-0 rounded-full border border-cyan-400/20" />
                <div className="absolute inset-[18px] rounded-full border border-cyan-400/15" />
                <div className="absolute inset-[36px] rounded-full border border-cyan-400/10" />

                <motion.div
                    animate={{rotate: 360}}
                    transition={{duration: 24, repeat: Infinity, ease: "linear"}}
                    className="absolute inset-0 rounded-full"
                >
                    <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
                </motion.div>

                <div className="absolute inset-[58px] grid place-items-center rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.12),rgba(2,6,17,0.95))] backdrop-blur-xl">
                    <div className="text-center">
                        <p className="text-[11px] font-black uppercase tracking-[0.32em] text-cyan-300">
                            {t.commandCore}
                        </p>

                        <h3 className="mt-3 text-7xl font-black text-white">
                            {neo?.totalToday ?? 0}
                        </h3>

                        <p className="mt-3 text-sm uppercase tracking-[0.22em] text-slate-400">
                            {t.nearObjects}
                        </p>
                    </div>
                </div>
            </div>

            {/* top left */}
            <CircleNode
                className="left-[8%] top-[6%] h-[160px] w-[160px]"
                title={t.neoTitle}
                value={neo?.closestName ?? "—"}
                subtitle={`${neo ? (neo.closestDistanceKm / 1000000).toFixed(1) : "0"}M km`}
                glow="cyan"
            />

            {/* top right */}
            <CircleNode
                className="right-[4%] top-[6%] h-[145px] w-[145px]"
                title={t.velocityTitle}
                value={neo ? `${Math.round(neo.closestVelocityKmh).toLocaleString()}` : "—"}
                subtitle={t.velocitySubtitle}
                glow="blue"
            />

            {/* bottom left */}
            <CircleNode
                className="left-[8%] bottom-[7%] h-[175px] w-[175px]"
                title={t.diameterTitle}
                value={neo ? `${Math.round(neo.estimatedDiameterMeters)}m` : "—"}
                subtitle={t.diameterSubtitle}
                glow="purple"
            />

            {/* bottom right */}
            <CircleNode
                className="right-[6%] bottom-[9%] h-[155px] w-[155px]"
                title={t.solarTitle}
                value={neo?.isHazardous ? "RISK" : t.safe}
                subtitle={`${donki?.cmeEvents ?? 0} CME`}
                glow="green"
            />
        </motion.section>
    );
};

type CircleNodeProps = {
    className: string;
    title: string;
    value: string;
    subtitle: string;
    glow: "cyan" | "blue" | "purple" | "green";
};

const glowMap = {
    cyan: "rgba(34,211,238,0.22)",
    blue: "rgba(59,130,246,0.2)",
    purple: "rgba(168,85,247,0.22)",
    green: "rgba(16,185,129,0.2)",
};

const CircleNode = ({className, title, value, subtitle, glow}: CircleNodeProps) => (
    <motion.div
        whileHover={{scale: 1.05}}
        className={`absolute ${className} rounded-full border border-white/10 backdrop-blur-2xl`}
        style={{
            background: `radial-gradient(circle, ${glowMap[glow]}, rgba(2,6,17,0.88))`,
        }}
    >
        <div className="flex h-full flex-col items-center justify-center px-5 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">
                {title}
            </p>

            <h4 className="mt-4 text-2xl font-black text-white">
                {value}
            </h4>

            <p className="mt-3 text-sm text-slate-400">
                {subtitle}
            </p>
        </div>
    </motion.div>
);