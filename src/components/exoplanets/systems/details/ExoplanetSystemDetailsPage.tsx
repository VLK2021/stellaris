"use client";

import Link from "next/link";
import {useEffect, useMemo, useState} from "react";
import {motion} from "framer-motion";
import {ArrowLeft, Loader2} from "lucide-react";

import {useLanguage} from "@/src/context/LanguageContext";
import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

import {ExoplanetSystemHero} from "./ExoplanetSystemHero";
import {ExoplanetSystemPlanets} from "./ExoplanetSystemPlanets";
import {ExoplanetSystemStats} from "./ExoplanetSystemStats";

export type ExoplanetSystemDetails = {
    system: {
        hostname: string | null;
        sy_snum: number | null;
        sy_pnum: number | null;
        sy_mnum: number | null;
        sy_dist: number | null;
        st_spectype: string | null;
        st_teff: number | null;
        st_rad: number | null;
        st_mass: number | null;
        st_met: number | null;
        st_logg: number | null;
        st_age: number | null;
    };
    planets: {
        pl_name: string | null;
        pl_rade: number | null;
        pl_bmasse: number | null;
        pl_orbper: number | null;
        pl_eqt: number | null;
        discoverymethod: string | null;
        disc_year: number | null;
    }[];
};

type ApiResponse = {
    success: boolean;
    data?: ExoplanetSystemDetails;
    message?: string;
};

export const ExoplanetSystemDetailsPage = ({system}: {system: string}) => {
    const {locale} = useLanguage();
    const t = (locale.exoplanets as ExoplanetsLocale).systems;

    const systemName = useMemo(() => decodeURIComponent(system), [system]);

    const [data, setData] = useState<ExoplanetSystemDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `/api/exoplanets/systems/${encodeURIComponent(systemName)}`,
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
    }, [systemName, t.notFound]);

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
            <div className="pointer-events-none fixed inset-0 opacity-95" style={{background: "var(--body-bg)"}} />
            <div className="pointer-events-none fixed inset-0 opacity-25 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:38px_38px]" />

            <div className="relative z-10 mx-auto grid max-w-[1500px] gap-5 px-4 py-6 sm:px-6 lg:px-8">
                <Link
                    href="/exoplanets/systems"
                    className="w-fit rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--color-accent)] transition hover:border-[var(--color-accent)]"
                >
                    <ArrowLeft className="mr-2 inline h-4 w-4" />
                    {t.backToSystems}
                </Link>

                <motion.div
                    initial={{opacity: 0, y: 18}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.35}}
                    className="grid gap-5"
                >
                    <ExoplanetSystemHero data={data} t={t} />
                    <ExoplanetSystemStats data={data} t={t} />
                    <ExoplanetSystemPlanets data={data} t={t} />
                </motion.div>
            </div>
        </main>
    );
};