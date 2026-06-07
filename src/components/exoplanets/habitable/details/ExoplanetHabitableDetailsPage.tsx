"use client";

import Link from "next/link";
import {useEffect, useMemo, useState} from "react";
import {motion} from "framer-motion";
import {
    ArrowRight,
    Earth,
    Loader2,
    Orbit,
    Ruler,
    Sparkles,
    Thermometer,
    Timer,
    Weight,
} from "lucide-react";

import {useLanguage} from "@/src/context/LanguageContext";
import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";
import {BackButton} from "@/src/common";

export type HabitableWorldDetails = {
    pl_name: string | null;
    hostname: string | null;
    sy_dist: number | null;
    disc_year: number | null;
    discoverymethod: string | null;
    pl_rade: number | null;
    pl_bmasse: number | null;
    pl_orbper: number | null;
    pl_eqt: number | null;
    st_teff: number | null;
    st_rad: number | null;
    st_mass: number | null;
    st_age: number | null;
    st_spectype: string | null;
    habitabilityScore: number;
    habitabilityZone: string;
};

type ApiResponse = {
    success: boolean;
    data?: HabitableWorldDetails;
    message?: string;
};

const SPACE_BACKGROUNDS = [
    "https://images-assets.nasa.gov/image/PIA14417/PIA14417~orig.jpg",
    "https://images-assets.nasa.gov/image/PIA15256/PIA15256~orig.jpg",
    "https://images-assets.nasa.gov/image/PIA09178/PIA09178~orig.jpg",
];

const getStableIndex = (value: string) => {
    return (
        value.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
        SPACE_BACKGROUNDS.length
    );
};

const format = (value: number | null, suffix = "", digits = 2) => {
    if (value === null || !Number.isFinite(value)) return "—";
    return `${Number(value.toFixed(digits))}${suffix}`;
};

const getPlanetGradient = (temperature: number | null) => {
    if (!temperature) return "radial-gradient(circle at 35% 30%, #bfdbfe, #2563eb, #0f172a)";
    if (temperature > 330) return "radial-gradient(circle at 35% 30%, #fed7aa, #f97316, #7c2d12)";
    if (temperature >= 180) return "radial-gradient(circle at 35% 30%, #bbf7d0, #10b981, #064e3b)";
    return "radial-gradient(circle at 35% 30%, #dbeafe, #3b82f6, #172554)";
};

const getZoneLabel = (zone: string, t: ExoplanetsLocale["habitable"]) => {
    if (zone === "temperate") return t.temperateZone;
    if (zone === "hot") return t.hotZone;
    if (zone === "cold") return t.coldZone;
    return t.unknownZone;
};

const getCandidateLabel = (score: number, t: ExoplanetsLocale["habitable"]) => {
    if (score >= 75) return t.strongCandidate;
    if (score >= 55) return t.moderateCandidate;
    return t.weakCandidate;
};

export const ExoplanetHabitableDetailsPage = ({planet}: {planet: string}) => {
    const {locale} = useLanguage();
    const t = (locale.exoplanets as ExoplanetsLocale).habitable;

    const planetName = useMemo(() => decodeURIComponent(planet), [planet]);

    const [data, setData] = useState<HabitableWorldDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `/api/exoplanets/habitable/${encodeURIComponent(planetName)}`,
                );

                const json = (await response.json()) as ApiResponse;

                if (!response.ok || !json.success || !json.data) {
                    throw new Error(json.message ?? t.notFound);
                }

                setData(json.data);
            } catch (error) {
                setError(error instanceof Error ? error.message : t.notFound);
            } finally {
                setLoading(false);
            }
        };

        void load();
    }, [planetName, t.notFound]);

    if (loading) {
        return (
            <main className="grid min-h-screen place-items-center bg-[var(--color-background)] text-[var(--color-text)]">
                <Loader2 className="h-10 w-10 animate-spin text-[var(--color-accent)]" />
            </main>
        );
    }

    if (error || !data) {
        return (
            <main className="grid min-h-screen place-items-center bg-[var(--color-background)] p-6 text-[var(--color-text)]">
                <div className="rounded-[2rem] border border-[var(--color-error)]/40 bg-[var(--color-error)]/10 p-6 text-[var(--color-error)]">
                    {error ?? t.notFound}
                </div>
            </main>
        );
    }

    const backgroundUrl = SPACE_BACKGROUNDS[getStableIndex(data.pl_name ?? planetName)];
    const score = Math.max(0, Math.min(100, data.habitabilityScore));

    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
            <div className="pointer-events-none fixed inset-0 opacity-95" style={{background: "var(--body-bg)"}} />
            <div className="pointer-events-none fixed inset-0 opacity-25 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:38px_38px]" />

            <div className="relative z-10 mx-auto grid max-w-[1500px] gap-5 px-4 py-6 sm:px-6 lg:px-8">
                <BackButton label={t.backToHabitable} />

                <motion.section
                    initial={{opacity: 0, y: 18}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.35}}
                    className="relative min-h-[500px] overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]"
                >
                    <div
                        className="absolute inset-0 scale-105 bg-cover bg-center opacity-35"
                        style={{backgroundImage: `url(${backgroundUrl})`}}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-background)_0%,rgba(3,7,18,.86)_44%,rgba(3,7,18,.55)_100%)]" />
                    <div className="absolute inset-0 opacity-30" style={{background: "var(--hero-bg)"}} />

                    <div className="relative z-10 grid min-h-[500px] gap-7 p-5 lg:grid-cols-[1fr_410px] lg:p-8">
                        <div className="flex flex-col justify-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                                {t.habitabilityProfile}
                            </p>

                            <h1 className="mt-4 max-w-4xl bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-transparent sm:text-5xl lg:text-6xl">
                                {data.pl_name ?? t.unknownWorld}
                            </h1>

                            <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">
                                {t.dataSource}
                            </p>

                            <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                <HeroMetric icon={Earth} label={t.habitabilityScore} value={`${score}/100`} />
                                <HeroMetric icon={Thermometer} label={t.habitabilityZone} value={getZoneLabel(data.habitabilityZone, t)} />
                                <HeroMetric icon={Sparkles} label={t.hostStar} value={data.hostname ?? "—"} />
                            </div>
                        </div>

                        <div className="relative grid min-h-[320px] place-items-center overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[rgba(5,12,28,.62)]">
                            <div className="absolute h-[270px] w-[270px] rounded-full border border-[var(--color-accent)]/20" />
                            <div className="absolute h-[210px] w-[210px] rounded-full border border-[var(--color-brand-secondary)]/20" />
                            <div className="absolute h-[150px] w-[150px] rounded-full border border-[var(--color-border)]/50" />

                            <div
                                className="relative z-10 h-[110px] w-[110px] rounded-full shadow-[var(--shadow-glow)] transition duration-500 hover:scale-105"
                                style={{background: getPlanetGradient(data.pl_eqt)}}
                            />

                            <div className="absolute bottom-5 left-5 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                                <Earth className="h-4 w-4" />
                                {getCandidateLabel(score, t)}
                            </div>
                        </div>
                    </div>
                </motion.section>

                <section className="grid gap-5 xl:grid-cols-3">
                    <Panel title={t.planetaryParameters}>
                        <Metric icon={Ruler} label={t.radius} value={format(data.pl_rade, " R⊕")} />
                        <Metric icon={Weight} label={t.mass} value={format(data.pl_bmasse, " M⊕")} />
                        <Metric icon={Thermometer} label={t.equilibriumTemp} value={format(data.pl_eqt, " K", 1)} />
                        <Metric icon={Orbit} label={t.orbitalPeriod} value={format(data.pl_orbper, " d")} />
                    </Panel>

                    <Panel title={t.stellarContext}>
                        <Metric icon={Sparkles} label={t.hostStar} value={data.hostname ?? "—"} />
                        <Metric icon={Thermometer} label={t.stellarTemperature} value={format(data.st_teff, " K")} />
                        <Metric icon={Ruler} label={t.stellarRadius} value={format(data.st_rad, " R☉")} />
                        <Metric icon={Weight} label={t.stellarMass} value={format(data.st_mass, " M☉")} />
                    </Panel>

                    <Panel title={t.discoveryContext}>
                        <Metric icon={Timer} label={t.discoveryYear} value={data.disc_year ?? "—"} />
                        <Metric icon={Sparkles} label={t.discoveryMethod} value={data.discoverymethod ?? "—"} />
                        <Metric icon={Ruler} label={t.distance} value={format(data.sy_dist, " pc")} />
                        <Metric icon={Earth} label={t.habitabilityZone} value={getZoneLabel(data.habitabilityZone, t)} />
                    </Panel>
                </section>
            </div>
        </main>
    );
};

const HeroMetric = ({
                        icon: Icon,
                        label,
                        value,
                    }: {
    icon: typeof Earth;
    label: string;
    value: string | number;
}) => (
    <div className="rounded-[1rem] border border-[var(--color-border)] bg-[rgba(5,12,28,.72)] p-3">
        <Icon className="h-4 w-4 text-[var(--color-accent)]" />
        <p className="mt-2 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            {label}
        </p>
        <p className="mt-1 truncate text-base font-black text-[var(--color-text)]">
            {value}
        </p>
    </div>
);

const Panel = ({
                   title,
                   children,
               }: {
    title: string;
    children: React.ReactNode;
}) => (
    <article className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
        <div className="pointer-events-none absolute inset-0 opacity-25" style={{background: "var(--hero-bg)"}} />
        <div className="relative z-10">
            <h2 className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase tracking-[-0.05em] text-transparent">
                {title}
            </h2>

            <div className="mt-5 grid gap-3">
                {children}
            </div>
        </div>
    </article>
);

const Metric = ({
                    icon: Icon,
                    label,
                    value,
                }: {
    icon: typeof Earth;
    label: string;
    value: string | number;
}) => (
    <div className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-3 transition hover:border-[var(--color-accent)]">
        <Icon className="h-4 w-4 text-[var(--color-accent)]" />
        <p className="mt-2 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            {label}
        </p>
        <p className="mt-1 truncate text-sm font-black text-[var(--color-text)]">
            {value}
        </p>
    </div>
);