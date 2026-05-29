"use client";

import Link from "next/link";
import {ArrowLeft} from "lucide-react";

import {useLanguage} from "@/src/context/LanguageContext";
import {useAsteroidDetails} from "@/src/hooks/asteroids/useAsteroidDetails";
import type {AsteroidsLocale} from "@/src/types/asteroids/asteroidsUi.types";

import {AsteroidsBackground} from "../AsteroidsBackground";
import {AsteroidDetailsHero} from "./AsteroidDetailsHero";
import {AsteroidDetailsLoadingState} from "./AsteroidDetailsLoadingState";
import {AsteroidMetricsPanel} from "./AsteroidMetricsPanel";
import {AsteroidRiskPanel} from "./AsteroidRiskPanel";
import {AsteroidOrbitPanel} from "./AsteroidOrbitPanel";
import {AsteroidApproachesPanel} from "./AsteroidApproachesPanel";

type Props = {
    id: string;
};

export const AsteroidDetailsPageClient = ({id}: Props) => {
    const {locale} = useLanguage();
    const t = locale.asteroids as AsteroidsLocale;

    const {data, loading, error} = useAsteroidDetails(id);

    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)] px-3 py-6 text-[var(--color-text)] sm:px-5 sm:py-8 lg:px-8">
            <AsteroidsBackground />

            <div className="relative z-10 mx-auto max-w-[1540px]">
                <Link
                    href="/asteroids"
                    className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-xs font-black text-[var(--color-text-muted)] transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-accent)]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {t.back}
                </Link>

                {loading && <AsteroidDetailsLoadingState />}

                {error && (
                    <div className="rounded-[1.5rem] border border-[var(--color-error)]/30 bg-[var(--color-error)]/10 p-5 text-sm text-[var(--color-error)]">
                        {error}
                    </div>
                )}

                {data && (
                    <div className="grid gap-5">
                        <AsteroidDetailsHero locale={t} details={data} />

                        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                            <AsteroidMetricsPanel locale={t} asteroid={data.asteroid} />
                            <AsteroidRiskPanel locale={t} details={data} />
                        </div>

                        <AsteroidOrbitPanel locale={t} details={data} />
                        <AsteroidApproachesPanel locale={t} asteroid={data.asteroid} />
                    </div>
                )}
            </div>
        </main>
    );
};