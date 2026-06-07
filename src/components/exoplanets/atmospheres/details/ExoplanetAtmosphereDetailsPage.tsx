"use client";

import Link from "next/link";
import {useEffect, useMemo, useState} from "react";
import {motion} from "framer-motion";
import {ArrowRight, Gauge, Loader2, Orbit, Ruler, Sparkles, Thermometer, Waves, Weight} from "lucide-react";

import {useLanguage} from "@/src/context/LanguageContext";
import type {AtmosphereDetailsApiResponse, AtmosphereItem} from "@/src/types/exoplanets/atmospheres.types";
import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

import {
    formatAtmosphereValue,
    getAtmosphereCandidateLabel,
    getAtmosphereClassLabel,
    getAtmosphereGradient,
    getAtmosphereScore,
} from "@/src/helpers/exoplanets/atmospheres.helpers";
import {BackButton} from "@/src/common";

export const ExoplanetAtmosphereDetailsPage = ({planet}: {planet: string}) => {
    const {locale} = useLanguage();
    const t = (locale.exoplanets as ExoplanetsLocale).atmospheres;
    const planetName = useMemo(() => decodeURIComponent(planet), [planet]);

    const [data, setData] = useState<AtmosphereItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/exoplanets/atmospheres/${encodeURIComponent(planetName)}`);
                const json = (await response.json()) as AtmosphereDetailsApiResponse;

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

    const score = getAtmosphereScore(data.atmosphereScore);

    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
            <div className="pointer-events-none fixed inset-0 opacity-95" style={{background: "var(--body-bg)"}} />
            <div className="pointer-events-none fixed inset-0 opacity-25 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:38px_38px]" />

            <div className="relative z-10 mx-auto grid max-w-[1500px] gap-5 px-4 py-6 sm:px-6 lg:px-8">
                <BackButton label={t.backToAtmospheres} />

                <motion.section
                    initial={{opacity: 0, y: 16}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.35}}
                    className="relative overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)]"
                >
                    <div className="absolute inset-0 opacity-55" style={{background: getAtmosphereGradient(data.atmosphereClass)}} />
                    <div className="absolute inset-0 opacity-20" style={{background: "var(--hero-bg)"}} />

                    <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_320px]">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                                {getAtmosphereClassLabel(data.atmosphereClass, t)}
                            </p>

                            <h1 className="mt-4 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-4xl font-black uppercase tracking-[-0.06em] text-transparent sm:text-5xl">
                                {data.pl_name ?? t.unknown}
                            </h1>

                            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-text-muted)]">
                                {t.detailsDescription}
                            </p>
                        </div>

                        <div className="rounded-[1.6rem] border border-[var(--color-border)] bg-[rgba(5,12,28,.68)] p-5">
                            <Waves className="h-6 w-6 text-[var(--color-accent)]" />

                            <p className="mt-4 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                                {t.atmosphereScore}
                            </p>

                            <div className="mt-2 flex items-end justify-between">
                                <span className="text-6xl font-black tracking-[-0.08em]">{score}</span>
                                <span className="pb-2 text-sm font-black text-[var(--color-text-muted)]">/100</span>
                            </div>

                            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[var(--color-glass)]">
                                <div className="h-full rounded-full bg-[var(--color-accent)]" style={{width: `${score}%`}} />
                            </div>
                        </div>
                    </div>
                </motion.section>

                <section className="grid gap-5 xl:grid-cols-3">
                    <Panel title={t.planetParameters}>
                        <Metric icon={Thermometer} label={t.equilibriumTemp} value={formatAtmosphereValue(data.pl_eqt, " K", 1)} />
                        <Metric icon={Ruler} label={t.radius} value={formatAtmosphereValue(data.pl_rade, " R⊕")} />
                        <Metric icon={Weight} label={t.mass} value={formatAtmosphereValue(data.pl_bmasse, " M⊕")} />
                        <Metric icon={Gauge} label={t.density} value={formatAtmosphereValue(data.pl_dens, " g/cm³")} />
                    </Panel>

                    <Panel title={t.atmosphereProfile}>
                        <Metric icon={Waves} label={t.atmosphereClass} value={getAtmosphereClassLabel(data.atmosphereClass, t)} />
                        <Metric icon={Sparkles} label={t.candidateType} value={getAtmosphereCandidateLabel(data.candidateType, t)} />
                        <Metric icon={Orbit} label={t.orbit} value={formatAtmosphereValue(data.pl_orbper, " d")} />
                        <Metric icon={Thermometer} label={t.insolation} value={formatAtmosphereValue(data.pl_insol, " S⊕")} />
                    </Panel>

                    <Panel title={t.stellarContext}>
                        <Metric icon={Sparkles} label={t.hostName} value={data.hostname ?? t.unknown} />
                        <Metric icon={Thermometer} label={t.stellarTemperature} value={formatAtmosphereValue(data.st_teff, " K")} />
                        <Metric icon={Ruler} label={t.stellarRadius} value={formatAtmosphereValue(data.st_rad, " R☉")} />
                        <Metric icon={Weight} label={t.stellarMass} value={formatAtmosphereValue(data.st_mass, " M☉")} />
                    </Panel>
                </section>

                <Link
                    href={`/exoplanets/catalog/${encodeURIComponent(data.pl_name ?? "")}`}
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-accent)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--color-accent)] transition hover:bg-[var(--color-accent)] hover:text-black"
                >
                    {t.openPlanetCatalog}
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </main>
    );
};

const Panel = ({title, children}: {title: string; children: React.ReactNode}) => (
    <article className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
        <div className="absolute inset-0 opacity-20" style={{background: "var(--hero-bg)"}} />

        <div className="relative z-10">
            <h2 className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase tracking-[-0.05em] text-transparent">
                {title}
            </h2>

            <div className="mt-5 grid gap-3">{children}</div>
        </div>
    </article>
);

const Metric = ({icon: Icon, label, value}: {icon: typeof Thermometer; label: string; value: string | number}) => (
    <div className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-3 transition hover:border-[var(--color-accent)]">
        <Icon className="h-4 w-4 text-[var(--color-accent)]" />
        <p className="mt-2 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">{label}</p>
        <p className="mt-1 truncate text-sm font-black text-[var(--color-text)]">{value}</p>
    </div>
);