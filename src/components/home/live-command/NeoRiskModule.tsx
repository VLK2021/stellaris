"use client";

import {motion} from "framer-motion";
import {AlertTriangle, Gauge} from "lucide-react";

import type {NasaLiveNeo} from "@/src/types/nasaLive";

type Props = {
    neo: NasaLiveNeo | null;
    locale: {
        velocity: string;
        kmhRelative: string;
        diameter?: string;
        hazard?: string;
        clear?: string;
        potential?: string;
    };
};

export const NeoRiskModule = ({neo, locale}: Props) => {
    const isHazardous = Boolean(neo?.isHazardous);

    return (
        <motion.article
            initial={{opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: "-100px"}}
            transition={{duration: 0.6, delay: 0.12}}
            className="relative min-h-[230px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_18px_65px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
        >
            <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-violet-400/14 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.14),transparent_48%)]" />

            <div className="relative z-10 grid gap-4 sm:grid-cols-3">
                <Metric
                    icon={Gauge}
                    label={locale.velocity}
                    value={neo ? Math.round(neo.closestVelocityKmh).toLocaleString() : "—"}
                    text={locale.kmhRelative}
                />

                <Metric
                    icon={OrbitIcon}
                    label={locale.diameter ?? "Estimated size"}
                    value={neo ? `${Math.round(neo.estimatedDiameterMeters)} m` : "—"}
                    text="NASA estimate"
                />

                <Metric
                    icon={AlertTriangle}
                    label={locale.hazard ?? "Hazard status"}
                    value={isHazardous ? locale.potential ?? "Potential" : locale.clear ?? "Clear"}
                    text={isHazardous ? "PHA flag" : "No PHA flag"}
                    danger={isHazardous}
                />
            </div>
        </motion.article>
    );
};

const OrbitIcon = Gauge;

type MetricProps = {
    icon: typeof Gauge;
    label: string;
    value: string;
    text: string;
    danger?: boolean;
};

const Metric = ({icon: Icon, label, value, text, danger}: MetricProps) => (
    <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/24 p-4">
        <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-white/8">
            <Icon className={danger ? "h-5 w-5 text-red-300" : "h-5 w-5 text-cyan-300"} />
        </div>

        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
            {label}
        </p>

        <strong className="mt-2 block text-2xl font-black tracking-[-0.05em] text-white">
            {value}
        </strong>

        <p className="mt-2 text-xs font-bold text-slate-500">
            {text}
        </p>
    </div>
);