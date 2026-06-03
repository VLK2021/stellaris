"use client";

import Link from "next/link";
import type {ReactNode} from "react";
import {useEffect, useMemo, useState} from "react";
import {motion} from "framer-motion";
import {
    Activity,
    ArrowLeft,
    Calendar,
    Database,
    Loader2,
    Orbit,
    Radio,
    Thermometer,
} from "lucide-react";

import {useLanguage} from "@/src/context/LanguageContext";
import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

type ExoplanetDetails = {
    pl_name: string | null;
    hostname: string | null;
    sy_snum: number | null;
    sy_pnum: number | null;
    sy_mnum: number | null;
    discoverymethod: string | null;
    disc_year: number | null;
    disc_facility: string | null;
    disc_telescope: string | null;
    disc_instrument: string | null;
    pl_orbper: number | null;
    pl_orbsmax: number | null;
    pl_rade: number | null;
    pl_radj: number | null;
    pl_bmasse: number | null;
    pl_bmassj: number | null;
    pl_dens: number | null;
    pl_eqt: number | null;
    pl_insol: number | null;
    pl_orbeccen: number | null;
    pl_orbincl: number | null;
    pl_trandep: number | null;
    pl_trandur: number | null;
    sy_dist: number | null;
    st_spectype: string | null;
    st_teff: number | null;
    st_rad: number | null;
    st_mass: number | null;
    st_age: number | null;
};

type ApiResponse = {
    success: boolean;
    data?: ExoplanetDetails;
    message?: string;
};

const format = (value: number | null, suffix = "", digits = 2) => {
    if (value === null || !Number.isFinite(value)) return "—";
    return `${Number(value.toFixed(digits))}${suffix}`;
};

const getPlanetSize = (radius: number | null) => {
    if (!radius) return 210;
    if (radius < 1) return 150;
    if (radius < 2) return 185;
    if (radius < 5) return 230;
    if (radius < 10) return 270;
    return 310;
};

const getPlanetGradient = (temperature: number | null) => {
    if (!temperature) {
        return "radial-gradient(circle at 30% 25%, var(--color-glass-strong), var(--color-earth), var(--color-card-deep))";
    }

    if (temperature < 180) {
        return "radial-gradient(circle at 30% 25%, #e0f2fe, #38bdf8 42%, #1e3a8a)";
    }

    if (temperature < 320) {
        return "radial-gradient(circle at 30% 25%, #dcfce7, #38bdf8 45%, #155eef)";
    }

    if (temperature < 700) {
        return "radial-gradient(circle at 30% 25%, #fde68a, #ea580c 48%, #7c2d12)";
    }

    return "radial-gradient(circle at 30% 25%, #fecaca, #ec4899 45%, #450a0a)";
};

export const ExoplanetDetailsPage = ({planet}: {planet: string}) => {
    const {locale} = useLanguage();
    const t = (locale.exoplanets as ExoplanetsLocale).details;

    const [data, setData] = useState<ExoplanetDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const planetName = useMemo(() => decodeURIComponent(planet), [planet]);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/exoplanets/catalog/${encodeURIComponent(planetName)}`);
                const json = (await response.json()) as ApiResponse;

                if (!response.ok || !json.success || !json.data) {
                    throw new Error(json.message ?? t.loadingError);
                }

                setData(json.data);
            } catch (error) {
                setError(error instanceof Error ? error.message : t.loadingError);
            } finally {
                setLoading(false);
            }
        };

        void load();
    }, [planetName, t.loadingError]);

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

    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
            <div className="pointer-events-none fixed inset-0 opacity-90" style={{background: "var(--body-bg)"}} />
            <div className="pointer-events-none fixed inset-0 opacity-30 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:36px_36px]" />

            <div className="relative z-10 mx-auto grid max-w-[1500px] gap-5 px-4 py-6 sm:px-6 lg:px-8">
                <Link
                    href="/exoplanets/catalog"
                    className="w-fit rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--color-accent)] backdrop-blur-xl"
                >
                    <ArrowLeft className="mr-2 inline h-4 w-4" />
                    {t.back}
                </Link>

                <Hero data={data} t={t} />

                <section className="grid gap-5 lg:grid-cols-2">
                    <Panel title={t.physicalParameters}>
                        <Info label={t.radiusEarth} value={format(data.pl_rade, " R⊕")} />
                        <Info label={t.radiusJupiter} value={format(data.pl_radj, " RJ")} />
                        <Info label={t.massEarth} value={format(data.pl_bmasse, " M⊕")} />
                        <Info label={t.massJupiter} value={format(data.pl_bmassj, " MJ")} />
                        <Info label={t.density} value={format(data.pl_dens, " g/cm³")} />
                        <Info label={t.insolation} value={format(data.pl_insol, " S⊕")} />
                    </Panel>

                    <Panel title={t.orbitalParameters}>
                        <Info label={t.orbitPeriod} value={format(data.pl_orbper, " d")} />
                        <Info label={t.semiMajorAxis} value={format(data.pl_orbsmax, " AU")} />
                        <Info label={t.eccentricity} value={format(data.pl_orbeccen)} />
                        <Info label={t.inclination} value={format(data.pl_orbincl, "°")} />
                        <Info label={t.transitDepth} value={format(data.pl_trandep, " %")} />
                        <Info label={t.transitDuration} value={format(data.pl_trandur, " h")} />
                    </Panel>

                    <Panel title={t.hostStar}>
                        <Info label={t.hostStar} value={data.hostname ?? "—"} />
                        <Info label={t.spectralType} value={data.st_spectype ?? "—"} />
                        <Info label={t.starTemperature} value={format(data.st_teff, " K")} />
                        <Info label={t.starRadius} value={format(data.st_rad, " R☉")} />
                        <Info label={t.starMass} value={format(data.st_mass, " M☉")} />
                        <Info label={t.starAge} value={format(data.st_age, " Gyr")} />
                    </Panel>

                    <Panel title={t.discoveryAndSystem}>
                        <Info label={t.facility} value={data.disc_facility ?? "—"} />
                        <Info label={t.telescope} value={data.disc_telescope ?? "—"} />
                        <Info label={t.instrument} value={data.disc_instrument ?? "—"} />
                        <Info label={t.distance} value={format(data.sy_dist, " pc")} />
                        <Info label={t.starsInSystem} value={data.sy_snum ?? "—"} />
                        <Info label={t.planetsInSystem} value={data.sy_pnum ?? "—"} />
                    </Panel>
                </section>
            </div>
        </main>
    );
};

const Hero = ({data, t}: {data: ExoplanetDetails; t: ExoplanetsLocale["details"]}) => {
    const size = getPlanetSize(data.pl_rade);
    const gradient = getPlanetGradient(data.pl_eqt);

    return (
        <section className="relative overflow-hidden rounded-[2.4rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)] backdrop-blur-2xl lg:p-8">
            <motion.div
                className="absolute inset-0"
                style={{background: "var(--hero-bg)"}}
                animate={{opacity: [0.55, 0.95, 0.55], scale: [1, 1.03, 1]}}
                transition={{duration: 9, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:32px_32px]" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_440px]">
                <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                        {t.eyebrow}
                    </p>

                    <h1 className="mt-4 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-4xl font-black uppercase tracking-[-0.06em] text-transparent sm:text-5xl">
                        {data.pl_name ?? t.unknown}
                    </h1>

                    <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-text-muted)]">
                        {t.confirmed} {t.orbiting}{" "}
                        <span className="font-bold text-[var(--color-text)]">
                            {data.hostname ?? t.unknown}
                        </span>
                        . {t.dataSource}
                    </p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <Stat icon={Calendar} label={t.discoveryYear} value={data.disc_year ?? "—"} />
                        <Stat icon={Radio} label={t.method} value={data.discoverymethod ?? "—"} />
                        <Stat icon={Orbit} label={t.orbitPeriod} value={format(data.pl_orbper, " d")} />
                        <Stat icon={Thermometer} label={t.equilibriumTemp} value={format(data.pl_eqt, " K", 1)} />
                    </div>
                </div>

                <div className="relative grid min-h-[380px] place-items-center overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-glass)] backdrop-blur-xl">
                    <motion.div
                        className="absolute h-[360px] w-[360px] rounded-full border border-[var(--color-accent)]/30"
                        animate={{rotate: 360}}
                        transition={{duration: 44, repeat: Infinity, ease: "linear"}}
                    />

                    <motion.div
                        className="absolute h-[255px] w-[255px] rounded-full border border-[var(--color-brand-secondary)]/30"
                        animate={{rotate: -360}}
                        transition={{duration: 31, repeat: Infinity, ease: "linear"}}
                    />

                    <motion.div
                        className="rounded-full"
                        style={{
                            width: size,
                            height: size,
                            background: gradient,
                        }}
                        animate={{
                            scale: [1, 1.045, 1],
                            boxShadow: [
                                "0 0 50px rgba(56,189,248,.18)",
                                "0 0 110px rgba(56,189,248,.38)",
                                "0 0 50px rgba(56,189,248,.18)",
                            ],
                        }}
                        transition={{duration: 4, repeat: Infinity, ease: "easeInOut"}}
                    />

                    <p className="absolute bottom-5 left-5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                        {t.generated}
                    </p>
                </div>
            </div>
        </section>
    );
};

const Stat = ({
                  icon: Icon,
                  label,
                  value,
              }: {
    icon: typeof Database;
    label: string;
    value: string | number;
}) => (
    <div className="rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl">
        <Icon className="h-4 w-4 text-[var(--color-accent)]" />
        <p className="mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">{label}</p>
        <p className="mt-1 text-sm font-black text-[var(--color-text)]">{value}</p>
    </div>
);

const Panel = ({title, children}: {title: string; children: ReactNode}) => (
    <motion.article
        initial={{opacity: 0, y: 18}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.2}}
        className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl"
    >
        <h2 className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase tracking-[-0.05em] text-transparent">
            {title}
        </h2>

        <div className="mt-5 grid gap-3">{children}</div>
    </motion.article>
);

const Info = ({label, value}: {label: string; value: string | number}) => (
    <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]/60 pb-2 text-sm">
        <span className="text-[var(--color-text-muted)]">{label}</span>
        <span className="text-right font-black text-[var(--color-text)]">{value}</span>
    </div>
);