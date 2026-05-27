"use client";

import {motion} from "framer-motion";
import {Activity, AlertTriangle, Orbit, RadioTower, Zap} from "lucide-react";

import type {
    IssPosition,
    NasaLiveDonki,
    NasaLiveNeo,
} from "@/src/types/nasaLive";

type Props = {
    locale: {
        telemetry: {
            neo: string;
            solar: string;
            velocity: string;
            iss: string;
            objects: string;
            syncing: string;
            asteroidFeed: string;
            solarFeed: string;
            loadingTelemetry: string;
            kmFromEarth: string;
            kmhRelative: string;
            flares: string;
            storms: string;
        };
    };
    neo: NasaLiveNeo | null;
    donki: NasaLiveDonki | null;
    iss: IssPosition | null;
};

export const LiveTelemetryDeck = ({locale, neo, donki, iss}: Props) => {
    const t = locale.telemetry;

    return (
        <div className="grid gap-5">
            <motion.article
                initial={{opacity: 0, scale: 0.96, x: 24}}
                whileInView={{opacity: 1, scale: 1, x: 0}}
                viewport={{once: true, margin: "-100px"}}
                transition={{duration: 0.55}}
                className="relative min-h-[270px] overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-white/[0.052] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.34)] backdrop-blur-2xl"
            >
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-300/15 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,211,238,0.18),transparent_32%)]" />

                <div className="relative z-10 grid h-full gap-5 sm:grid-cols-[180px_1fr] sm:items-center">
                    <div className="relative mx-auto aspect-square w-[170px] rounded-full border border-cyan-300/20 bg-black/25">
                        <motion.div
                            className="absolute inset-5 rounded-full border border-cyan-300/25"
                            animate={{rotate: 360}}
                            transition={{duration: 14, repeat: Infinity, ease: "linear"}}
                        >
                            <div className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(34,211,238,0.9)]" />
                        </motion.div>

                        <motion.div
                            className="absolute inset-10 rounded-full border border-cyan-300/10"
                            animate={{rotate: -360}}
                            transition={{duration: 20, repeat: Infinity, ease: "linear"}}
                        />

                        <div className="absolute inset-0 grid place-items-center">
                            <div className="grid h-20 w-20 place-items-center rounded-full bg-cyan-300/10 shadow-[0_0_45px_rgba(34,211,238,0.22)]">
                                <Orbit className="h-9 w-9 text-cyan-300" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-cyan-300">
                            {t.neo}
                        </p>

                        <h3 className="mt-3 text-4xl font-black tracking-[-0.065em] text-white">
                            {neo ? `${neo.totalToday} ${t.objects}` : t.syncing}
                        </h3>

                        <p className="mt-4 text-sm leading-6 text-slate-300">
                            {neo
                                ? `${neo.closestName} · ${neo.closestDistanceKm.toLocaleString()} ${t.kmFromEarth}`
                                : t.asteroidFeed}
                        </p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <MiniStat
                                label={t.velocity}
                                value={
                                    neo
                                        ? Math.round(neo.closestVelocityKmh).toLocaleString()
                                        : "—"
                                }
                                accent="cyan"
                            />

                            <MiniStat
                                label="Hazard"
                                value={neo?.isHazardous ? "Potential" : "Clear"}
                                accent={neo?.isHazardous ? "red" : "emerald"}
                            />
                        </div>
                    </div>
                </div>
            </motion.article>

            <div className="grid gap-5 sm:grid-cols-[0.95fr_1.05fr]">
                <motion.article
                    initial={{opacity: 0, y: 24}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, margin: "-100px"}}
                    transition={{duration: 0.5, delay: 0.1}}
                    className="relative min-h-[240px] overflow-hidden rounded-[2rem] border border-orange-300/15 bg-white/[0.052] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
                >
                    <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-orange-400/20 blur-3xl" />
                    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(251,146,60,0.14),transparent_45%)]" />

                    <div className="relative z-10">
                        <div className="mb-5 flex items-center justify-between">
                            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-orange-300/20 bg-orange-300/10">
                                <Zap className="h-5 w-5 text-orange-300" />
                            </div>

                            <motion.div
                                className="h-3 w-3 rounded-full bg-orange-300 shadow-[0_0_20px_rgba(251,146,60,0.8)]"
                                animate={{scale: [1, 1.45, 1], opacity: [0.8, 1, 0.8]}}
                                transition={{duration: 1.8, repeat: Infinity}}
                            />
                        </div>

                        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-orange-300">
                            {t.solar}
                        </p>

                        <h3 className="mt-3 text-3xl font-black tracking-[-0.055em] text-white">
                            {donki ? `${donki.cmeEvents} CME` : t.syncing}
                        </h3>

                        <p className="mt-4 text-sm leading-6 text-slate-300">
                            {donki
                                ? `${donki.solarFlares} ${t.flares} · ${donki.geomagneticStorms} ${t.storms}`
                                : t.solarFeed}
                        </p>
                    </div>
                </motion.article>

                <motion.article
                    initial={{opacity: 0, y: 24}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, margin: "-100px"}}
                    transition={{duration: 0.5, delay: 0.18}}
                    className="relative min-h-[240px] overflow-hidden rounded-[2rem] border border-emerald-300/15 bg-white/[0.052] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
                >
                    <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/16 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.16),transparent_36%)]" />

                    <div className="relative z-10">
                        <div className="mb-5 flex items-center justify-between">
                            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10">
                                <RadioTower className="h-5 w-5 text-emerald-300" />
                            </div>

                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
                                <Activity className="h-3 w-3" />
                                ISS
                            </div>
                        </div>

                        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-emerald-300">
                            {t.iss}
                        </p>

                        <h3 className="mt-3 text-3xl font-black tracking-[-0.055em] text-white">
                            {iss ? `${Math.round(iss.altitudeKm)} km` : "—"}
                        </h3>

                        <p className="mt-4 text-sm leading-6 text-slate-300">
                            {iss
                                ? `${Math.round(iss.velocityKmh).toLocaleString()} km/h · ${iss.visibility}`
                                : t.loadingTelemetry}
                        </p>
                    </div>
                </motion.article>
            </div>
        </div>
    );
};

type MiniStatProps = {
    label: string;
    value: string;
    accent: "cyan" | "emerald" | "red";
};

const MiniStat = ({label, value, accent}: MiniStatProps) => {
    const accentClass = {
        cyan: "text-cyan-300 bg-cyan-300/10 border-cyan-300/15",
        emerald: "text-emerald-300 bg-emerald-300/10 border-emerald-300/15",
        red: "text-red-300 bg-red-300/10 border-red-300/15",
    }[accent];

    return (
        <div className={`rounded-2xl border px-4 py-3 ${accentClass}`}>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] opacity-75">
                {label}
            </p>
            <strong className="mt-1 block text-sm font-black text-white">
                {value}
            </strong>
        </div>
    );
};