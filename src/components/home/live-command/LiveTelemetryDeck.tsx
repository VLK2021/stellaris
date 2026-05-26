"use client";

import {motion} from "framer-motion";
import {AlertTriangle, Orbit, RadioTower, Zap} from "lucide-react";
import type {IssPosition, NasaLiveDonki, NasaLiveNeo} from "@/src/types/nasaLive";

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
            <TelemetryPanel
                icon={Orbit}
                label={t.neo}
                value={neo ? `${neo.totalToday} ${t.objects}` : t.syncing}
                text={neo ? `${neo.closestName} · ${neo.closestDistanceKm.toLocaleString()} ${t.kmFromEarth}` : t.asteroidFeed}
                delay={0.08}
            />

            <TelemetryPanel
                icon={Zap}
                label={t.solar}
                value={donki ? `${donki.cmeEvents} CME` : t.syncing}
                text={donki ? `${donki.solarFlares} ${t.flares} · ${donki.geomagneticStorms} ${t.storms}` : t.solarFeed}
                delay={0.16}
            />

            <div className="grid gap-5 sm:grid-cols-2">
                <TelemetryPanel
                    icon={AlertTriangle}
                    label={t.velocity}
                    value={neo ? Math.round(neo.closestVelocityKmh).toLocaleString() : "—"}
                    text={t.kmhRelative}
                    delay={0.24}
                    compact
                />

                <TelemetryPanel
                    icon={RadioTower}
                    label={t.iss}
                    value={iss ? `${Math.round(iss.altitudeKm)} km` : "—"}
                    text={iss ? `${Math.round(iss.velocityKmh)} km/h · ${iss.visibility}` : t.loadingTelemetry}
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

const TelemetryPanel = ({icon: Icon, label, value, text, delay, compact}: PanelProps) => (
    <motion.article
        initial={{opacity: 0, x: 24}}
        whileInView={{opacity: 1, x: 0}}
        viewport={{once: true, margin: "-100px"}}
        transition={{duration: 0.5, delay}}
        className={`relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.052] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-2xl ${
            compact ? "min-h-[185px]" : "min-h-[175px]"
        }`}
    >
        <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative z-10">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-cyan-300/15 bg-cyan-300/8">
                <Icon className="h-5 w-5 text-cyan-300" />
            </div>

            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-slate-400">{label}</p>

            <h3 className="mt-2 text-3xl font-black tracking-[-0.055em] text-white">
                {value}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
        </div>
    </motion.article>
);