"use client";

import {useEffect, useMemo, useState} from "react";
import {Loader2} from "lucide-react";

import {useLanguage} from "@/src/context/LanguageContext";
import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

import {ExoplanetSpaceScene} from "./ExoplanetSpaceScene";

export type ExoplanetDetails = {
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
            <main className="grid min-h-screen place-items-center bg-[var(--color-background)]">
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

    return <ExoplanetSpaceScene data={data} t={t} />;
};