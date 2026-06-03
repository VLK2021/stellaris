"use client";

import Link from "next/link";
import type {ReactNode} from "react";
import {useEffect, useMemo, useState} from "react";
import {motion} from "framer-motion";
import {
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
    if (!radius) return 230;
    if (radius < 1) return 160;
    if (radius < 2) return 190;
    if (radius < 5) return 240;
    if (radius < 10) return 290;
    return 330;
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
            <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
                <SpaceBackground />
                <Loader2 className="relative z-10 h-10 w-10 animate-spin text-[var(--color-accent)]" />
            </main>
        );
    }

    if (error || !data) {
        return (
            <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[var(--color-background)] p-6 text-[var(--color-text)]">
                <SpaceBackground />
                <div className="relative z-10 rounded-[2rem] border border-[var(--color-error)]/40 bg-[var(--color-error)]/10 p-6 text-[var(--color-error)] backdrop-blur-xl">
                    {error ?? t.notFound}
                </div>
            </main>
        );
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
            <SpaceBackground />

            <div className="relative z-10 mx-auto grid max-w-[1500px] gap-5 px-4 py-6 sm:px-6 lg:px-8">
                <Link
                    href="/exoplanets/catalog"
                    className="group w-fit rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--color-accent)] shadow-[var(--shadow-soft)] backdrop-blur-xl transition hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
                >
                    <ArrowLeft className="mr-2 inline h-4 w-4 transition group-hover:-translate-x-1" />
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

const SpaceBackground = () => (
    <>
        <div className="pointer-events-none fixed inset-0 opacity-95" style={{background: "var(--body-bg)"}} />

        <motion.div
            className="pointer-events-none fixed inset-0"
            style={{
                background:
                    "radial-gradient(circle at 18% 20%, var(--color-accent-soft), transparent 32%), radial-gradient(circle at 84% 16%, rgba(139, 92, 246, .16), transparent 34%), radial-gradient(circle at 48% 105%, rgba(236, 72, 153, .12), transparent 36%)",
            }}
            animate={{
                scale: [1, 1.04, 1],
                opacity: [0.55, 0.95, 0.55],
            }}
            transition={{duration: 12, repeat: Infinity, ease: "easeInOut"}}
        />

        <motion.div
            className="pointer-events-none fixed inset-0 opacity-30 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:34px_34px]"
            animate={{x: [0, -18, 0], y: [0, 12, 0]}}
            transition={{duration: 16, repeat: Infinity, ease: "easeInOut"}}
        />

        <div className="pointer-events-none fixed inset-0 opacity-[0.12] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:88px_88px]" />
    </>
);

const Hero = ({data, t}: {data: ExoplanetDetails; t: ExoplanetsLocale["details"]}) => {
    const size = getPlanetSize(data.pl_rade);
    const gradient = getPlanetGradient(data.pl_eqt);

    return (
        <section className="relative overflow-hidden rounded-[2.5rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl lg:p-8">
            <motion.div
                className="absolute inset-0"
                style={{background: "var(--hero-bg)"}}
                animate={{opacity: [0.45, 0.85, 0.45], scale: [1, 1.035, 1]}}
                transition={{duration: 10, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:30px_30px]" />

            <motion.div
                className="absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full border border-[var(--color-accent)]/20"
                animate={{rotate: 360}}
                transition={{duration: 70, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute -right-10 top-20 h-[340px] w-[340px] rounded-full border border-[var(--color-brand-secondary)]/20"
                animate={{rotate: -360}}
                transition={{duration: 52, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                animate={{x: ["-30%", "30%", "-30%"], opacity: [0.15, 0.75, 0.15]}}
                transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_460px]">
                <div className="flex flex-col justify-center">
                    <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[var(--color-accent)]">
                        {t.eyebrow}
                    </p>

                    <h1 className="mt-4 max-w-4xl bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-4xl font-black uppercase leading-[0.95] tracking-[-0.06em] text-transparent sm:text-5xl">
                        {data.pl_name ?? t.unknown}
                    </h1>

                    <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--color-text-muted)]">
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

                <div className="relative grid min-h-[420px] place-items-center overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] backdrop-blur-xl">
                    <div className="absolute inset-0 opacity-30" style={{background: "var(--hero-bg)"}} />

                    <motion.div
                        className="absolute h-[390px] w-[390px] rounded-full border border-[var(--color-accent)]/30"
                        animate={{rotate: 360}}
                        transition={{duration: 44, repeat: Infinity, ease: "linear"}}
                    />

                    <motion.div
                        className="absolute h-[285px] w-[285px] rounded-full border border-[var(--color-brand-secondary)]/30"
                        animate={{rotate: -360}}
                        transition={{duration: 31, repeat: Infinity, ease: "linear"}}
                    />

                    <motion.div
                        className="absolute h-[185px] w-[185px] rounded-full border border-[var(--color-border)]"
                        animate={{rotate: 360}}
                        transition={{duration: 22, repeat: Infinity, ease: "linear"}}
                    />

                    <motion.div
                        className="relative z-10 rounded-full"
                        style={{
                            width: size,
                            height: size,
                            background: gradient,
                        }}
                        animate={{
                            scale: [1, 1.045, 1],
                            boxShadow: [
                                "0 0 50px rgba(56,189,248,.18)",
                                "0 0 120px rgba(56,189,248,.42)",
                                "0 0 50px rgba(56,189,248,.18)",
                            ],
                        }}
                        transition={{duration: 4, repeat: Infinity, ease: "easeInOut"}}
                    />

                    <motion.div
                        className="absolute left-1/2 top-1/2 h-px w-[120%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                        animate={{rotate: 360, opacity: [0.08, 0.38, 0.08]}}
                        transition={{duration: 9, repeat: Infinity, ease: "linear"}}
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
    <motion.div
        whileHover={{y: -3, scale: 1.02}}
        className="relative overflow-hidden rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl"
    >
        <div className="absolute inset-0 opacity-0 transition group-hover:opacity-40" style={{background: "var(--hero-bg)"}} />
        <Icon className="relative z-10 h-4 w-4 text-[var(--color-accent)]" />
        <p className="relative z-10 mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">{label}</p>
        <p className="relative z-10 mt-1 text-sm font-black text-[var(--color-text)]">{value}</p>
    </motion.div>
);

const Panel = ({title, children}: {title: string; children: ReactNode}) => (
    <motion.article
        initial={{opacity: 0, y: 18}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.2}}
        className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl"
    >
        <div className="absolute inset-0 opacity-20" style={{background: "var(--hero-bg)"}} />

        <motion.div
            className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
            animate={{x: ["-100%", "100%"]}}
            transition={{duration: 4, repeat: Infinity, ease: "linear"}}
        />

        <div className="relative z-10">
            <h2 className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase tracking-[-0.05em] text-transparent">
                {title}
            </h2>

            <div className="mt-5 grid gap-3">{children}</div>
        </div>
    </motion.article>
);

const Info = ({label, value}: {label: string; value: string | number}) => (
    <div className="flex items-center justify-between gap-4 rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-3 text-sm backdrop-blur-xl">
        <span className="text-[var(--color-text-muted)]">{label}</span>
        <span className="text-right font-black text-[var(--color-text)]">{value}</span>
    </div>
);