"use client";

import {motion} from "framer-motion";
import {AlertTriangle, Orbit, RadioTower, Zap} from "lucide-react";
import type {IssPosition, NasaLiveDonki, NasaLiveNeo} from "@/src/types/nasaLive";

type Props = {
    neo: NasaLiveNeo | null;
    donki: NasaLiveDonki | null;
    iss: IssPosition | null;
};

export const LiveTelemetryDeck = ({neo, donki, iss}: Props) => {
    return (
        <div className="grid gap-6">
            <TelemetryPanel
                icon={Orbit}
                label="NEO radar"
                value={neo ? `${neo.totalToday} objects` : "syncing"}
                text={neo ? `${neo.closestName} · ${neo.closestDistanceKm.toLocaleString()} km from Earth` : "Loading NASA asteroid feed"}
                delay={0.08}
            />

            <TelemetryPanel
                icon={Zap}
                label="Solar weather"
                value={donki ? `${donki.cmeEvents} CME` : "syncing"}
                text={donki ? `${donki.solarFlares} solar flares · ${donki.geomagneticStorms} geomagnetic storms` : "Loading DONKI solar activity"}
                delay={0.16}
            />

            <div className="grid gap-6 sm:grid-cols-2">
                <TelemetryPanel
                    icon={AlertTriangle}
                    label="NEO velocity"
                    value={neo ? Math.round(neo.closestVelocityKmh).toLocaleString() : "—"}
                    text="km/h relative velocity"
                    delay={0.24}
                    compact
                />

                <TelemetryPanel
                    icon={RadioTower}
                    label="ISS orbit"
                    value={iss ? `${Math.round(iss.altitudeKm)} km` : "—"}
                    text={iss ? `${Math.round(iss.velocityKmh)} km/h · ${iss.visibility}` : "Loading telemetry"}
                    delay={0.32}
                    compact
                />
            </div>
        </div>
    );
};

type PanelProps = {
    icon: typeof Orbit;
    label: string;
    value: string;
    text: string;
    delay: number;
    compact?: boolean;
};

const TelemetryPanel = ({icon: Icon, label, value, text, delay, compact}: PanelProps) => {
    return (
        <motion.article
            initial={{opacity: 0, x: 30}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true, margin: "-100px"}}
            transition={{duration: 0.55, delay}}
            className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 shadow-[0_22px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl ${
                compact ? "min-h-[230px]" : "min-h-[220px]"
            }`}
        >
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-300/10 blur-3xl" />

            <div className="relative z-10">
                <div className="mb-7 grid h-14 w-14 place-items-center rounded-2xl border border-cyan-300/15 bg-cyan-300/8">
                    <Icon className="h-6 w-6 text-cyan-300" />
                </div>

                <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-400">{label}</p>

                <h3 className="mt-3 text-4xl font-black tracking-[-0.06em] text-white">
                    {value}
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-400">{text}</p>
            </div>
        </motion.article>
    );
};