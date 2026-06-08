"use client";

import Link from "next/link";
import {ArrowRight, Orbit} from "lucide-react";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

const EXAMPLES: Record<string, string[]> = {
    transit: ["TRAPPIST-1 e", "Kepler-452 b", "TOI-700 d"],
    radialVelocity: ["51 Peg b", "Gliese 581 c", "HD 209458 b"],
    imaging: ["HR 8799 b", "Beta Pic b", "2M1207 b"],
    microlensing: ["OGLE-2005-BLG-390L b", "OGLE-2016-BLG-1195L b"],
    timing: ["Kepler-19 c", "Kepler-88 c"],
    astrometry: ["VB 10 b"],
    other: ["Kepler-22 b", "K2-18 b", "WASP-12 b"],
};

const getKey = (method: string) => {
    const normalized = method.toLowerCase();

    if (normalized.includes("transit")) return "transit";
    if (normalized.includes("radial")) return "radialVelocity";
    if (normalized.includes("imaging")) return "imaging";
    if (normalized.includes("microlensing")) return "microlensing";
    if (normalized.includes("timing")) return "timing";
    if (normalized.includes("astrometry")) return "astrometry";

    return "other";
};

type Props = {
    method: string;
    t: ExoplanetsLocale["methods"];
};

export const ExoplanetMethodExamples = ({method, t}: Props) => {
    const examples = EXAMPLES[getKey(method)] ?? EXAMPLES.other;

    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
            <div className="absolute inset-0 opacity-20" style={{background: "var(--hero-bg)"}} />

            <div className="relative z-10">
                <h2 className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase tracking-[-0.05em] text-transparent">
                    {t.knownExamples}
                </h2>

                <div className="mt-5 grid gap-3 md:grid-cols-3">
                    {examples.map((planet) => (
                        <Link
                            key={planet}
                            href={`/exoplanets/catalog/${encodeURIComponent(planet)}`}
                            className="group rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 transition hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
                        >
                            <Orbit className="h-4 w-4 text-[var(--color-accent)]" />

                            <p className="mt-3 text-lg font-black uppercase tracking-[-0.04em] text-[var(--color-text)]">
                                {planet}
                            </p>

                            <p className="mt-2 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-accent)]">
                                {t.openPlanetCatalog}
                                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};