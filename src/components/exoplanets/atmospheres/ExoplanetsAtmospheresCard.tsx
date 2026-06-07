"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {ArrowRight, Gauge, Orbit, Ruler, Sparkles, Thermometer, Waves, Weight} from "lucide-react";

import type {AtmosphereItem} from "@/src/types/exoplanets/atmospheres.types";
import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

import {
    formatAtmosphereValue,
    getAtmosphereCandidateLabel,
    getAtmosphereClassLabel,
    getAtmosphereGradient,
    getAtmosphereScore,
} from "@/src/helpers/exoplanets/atmospheres.helpers";

type Props = {
    item: AtmosphereItem;
    index: number;
    t: ExoplanetsLocale["atmospheres"];
};

export const ExoplanetsAtmospheresCard = ({item, index, t}: Props) => {
    const planetName = item.pl_name ?? t.unknown;
    const score = getAtmosphereScore(item.atmosphereScore);
    const href = `/exoplanets/atmospheres/${encodeURIComponent(item.pl_name ?? "")}`;

    return (
        <motion.article
            initial={{opacity: 0, y: 14}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.3, delay: Math.min(index * 0.025, 0.15)}}
            className="group relative min-h-[320px] overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] transition duration-300 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
        >
            <div className="pointer-events-none absolute inset-0 opacity-45" style={{background: getAtmosphereGradient(item.atmosphereClass)}} />
            <div className="pointer-events-none absolute inset-0 opacity-18" style={{background: "var(--hero-bg)"}} />
            <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:28px_28px]" />

            <div className="relative z-10 grid min-h-[320px] gap-4 p-5 lg:grid-cols-[1fr_210px]">
                <div className="flex min-w-0 flex-col">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                        {getAtmosphereClassLabel(item.atmosphereClass, t)}
                    </p>

                    <h2 className="mt-3 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase leading-[0.95] tracking-[-0.06em] text-transparent">
                        {planetName}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                        {t.hostName}:{" "}
                        <span className="font-bold text-[var(--color-text)]">
                            {item.hostname ?? t.unknown}
                        </span>
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                        <AtmosphereMini icon={Thermometer} label={t.equilibriumTemp} value={formatAtmosphereValue(item.pl_eqt, " K", 1)} />
                        <AtmosphereMini icon={Ruler} label={t.radius} value={formatAtmosphereValue(item.pl_rade, " R⊕")} />
                        <AtmosphereMini icon={Weight} label={t.mass} value={formatAtmosphereValue(item.pl_bmasse, " M⊕")} />
                        <AtmosphereMini icon={Gauge} label={t.density} value={formatAtmosphereValue(item.pl_dens, " g/cm³")} />
                    </div>

                    <Link
                        href={href}
                        className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-accent)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--color-accent)] transition hover:bg-[var(--color-accent)] hover:text-black"
                    >
                        {t.details}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4">
                    <div>
                        <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-accent)]">
                            <Waves className="h-5 w-5" />
                        </div>

                        <p className="mt-4 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                            {t.atmosphereScore}
                        </p>

                        <div className="mt-2 flex items-end justify-between gap-3">
                            <span className="text-4xl font-black tracking-[-0.08em] text-[var(--color-text)]">
                                {score}
                            </span>

                            <span className="pb-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                                / 100
                            </span>
                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--color-card)]">
                            <div className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-500" style={{width: `${score}%`}} />
                        </div>
                    </div>

                    <div className="mt-5 grid gap-2">
                        <AtmosphereLine icon={Sparkles} label={t.candidateType} value={getAtmosphereCandidateLabel(item.candidateType, t)} />
                        <AtmosphereLine icon={Orbit} label={t.orbit} value={formatAtmosphereValue(item.pl_orbper, " d")} />
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

const AtmosphereMini = ({
                            icon: Icon,
                            label,
                            value,
                        }: {
    icon: typeof Thermometer;
    label: string;
    value: string;
}) => (
    <div className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-3">
        <Icon className="h-4 w-4 text-[var(--color-accent)]" />
        <p className="mt-2 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">{label}</p>
        <p className="mt-1 truncate text-xs font-black text-[var(--color-text)]">{value}</p>
    </div>
);

const AtmosphereLine = ({
                            icon: Icon,
                            label,
                            value,
                        }: {
    icon: typeof Sparkles;
    label: string;
    value: string;
}) => (
    <div className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]/50 px-3 py-2">
        <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" />
        <p className="min-w-0 truncate text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
            {label}: <span className="text-[var(--color-text)]">{value}</span>
        </p>
    </div>
);