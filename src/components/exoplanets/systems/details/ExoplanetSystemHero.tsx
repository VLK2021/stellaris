"use client";

import {Database, Orbit, Sparkles} from "lucide-react";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";
import type {ExoplanetSystemDetails} from "./ExoplanetSystemDetailsPage";

type Props = {
    data: ExoplanetSystemDetails;
    t: ExoplanetsLocale["systems"];
};

const SPACE_BACKGROUNDS = [
    "https://images-assets.nasa.gov/image/PIA14417/PIA14417~orig.jpg",
    "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001386/GSFC_20171208_Archive_e001386~medium.jpg",
    "https://images-assets.nasa.gov/image/PIA15256/PIA15256~orig.jpg",
    "https://images-assets.nasa.gov/image/PIA09178/PIA09178~orig.jpg",
];

const getStableIndex = (value: string) => {
    return value
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0) % SPACE_BACKGROUNDS.length;
};

const format = (value: number | null, suffix = "", digits = 2) => {
    if (value === null || !Number.isFinite(value)) return "—";
    return `${Number(value.toFixed(digits))}${suffix}`;
};

const getStarGradient = (temperature: number | null) => {
    if (!temperature) return "radial-gradient(circle at 35% 30%, #e0f2fe, #38bdf8, #0f172a)";
    if (temperature < 3700) return "radial-gradient(circle at 35% 30%, #fecaca, #ef4444, #450a0a)";
    if (temperature < 5200) return "radial-gradient(circle at 35% 30%, #fed7aa, #f97316, #7c2d12)";
    if (temperature < 6500) return "radial-gradient(circle at 35% 30%, #fef9c3, #facc15, #713f12)";
    return "radial-gradient(circle at 35% 30%, #e0f2fe, #38bdf8, #1e3a8a)";
};

export const ExoplanetSystemHero = ({data, t}: Props) => {
    const system = data.system;
    const hostname = system.hostname ?? t.unknown;
    const backgroundUrl = SPACE_BACKGROUNDS[getStableIndex(hostname)];
    const starGradient = getStarGradient(system.st_teff);

    return (
        <section className="relative min-h-[560px] overflow-hidden rounded-[2.4rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
            <div
                className="absolute inset-0 scale-105 bg-cover bg-center opacity-35"
                style={{backgroundImage: `url(${backgroundUrl})`}}
            />

            <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-background)_0%,rgba(3,7,18,.86)_42%,rgba(3,7,18,.55)_100%)]" />
            <div className="absolute inset-0 opacity-30" style={{background: "var(--hero-bg)"}} />
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:34px_34px]" />

            <div className="relative z-10 grid min-h-[560px] gap-8 p-6 lg:grid-cols-[1fr_460px] lg:p-10">
                <div className="flex flex-col justify-center">
                    <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[var(--color-accent)]">
                        {t.overview}
                    </p>

                    <h1 className="mt-5 max-w-4xl bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-transparent sm:text-6xl lg:text-7xl">
                        {hostname}
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-text-muted)]">
                        {t.source}
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                        <HeroMetric icon={Sparkles} label={t.detectedPlanets} value={data.planets.length} />
                        <HeroMetric icon={Orbit} label={t.detectedStars} value={system.sy_snum ?? "—"} />
                        <HeroMetric icon={Database} label={t.distance} value={format(system.sy_dist, " pc")} />
                    </div>
                </div>

                <div className="relative grid min-h-[360px] place-items-center overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[rgba(5,12,28,.62)]">
                    <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:30px_30px]" />

                    {[300, 245, 190, 145].map((size) => (
                        <div
                            key={size}
                            className="absolute rounded-full border border-[var(--color-accent)]/20"
                            style={{width: size, height: size}}
                        />
                    ))}

                    <div
                        className="relative z-10 h-[118px] w-[118px] rounded-full shadow-[var(--shadow-glow)]"
                        style={{background: starGradient}}
                    />

                    {data.planets.slice(0, 8).map((planet, index) => {
                        const angle = (360 / Math.max(data.planets.length, 1)) * index - 90;
                        const radius = 82 + index * 14;
                        const x = Math.cos((angle * Math.PI) / 180) * radius;
                        const y = Math.sin((angle * Math.PI) / 180) * radius;

                        return (
                            <div
                                key={`${planet.pl_name}-${index}`}
                                className="absolute h-3 w-3 rounded-full bg-[var(--color-accent)] shadow-[var(--shadow-glow)]"
                                style={{
                                    transform: `translate(${x}px, ${y}px)`,
                                }}
                                title={planet.pl_name ?? undefined}
                            />
                        );
                    })}

                    <div className="absolute bottom-5 left-5 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                        <Orbit className="h-4 w-4" />
                        {t.systemArchitecture}
                    </div>
                </div>
            </div>
        </section>
    );
};

const HeroMetric = ({
                        icon: Icon,
                        label,
                        value,
                    }: {
    icon: typeof Sparkles;
    label: string;
    value: string | number;
}) => (
    <div className="rounded-[1.2rem] border border-[var(--color-border)] bg-[rgba(5,12,28,.72)] p-4">
        <Icon className="h-4 w-4 text-[var(--color-accent)]" />

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {label}
        </p>

        <p className="mt-1 text-xl font-black text-[var(--color-text)]">
            {value}
        </p>
    </div>
);