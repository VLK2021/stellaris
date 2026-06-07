"use client";

import Link from "next/link";
import {useEffect, useMemo, useState} from "react";
import {motion} from "framer-motion";
import {ArrowRight, Loader2} from "lucide-react";

import {useLanguage} from "@/src/context/LanguageContext";
import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";
import type {HabitableWorldDetails} from "@/src/types/exoplanets/habitable.types";

import {HabitableDetailsHero} from "./HabitableDetailsHero";
import {HabitableScorePanel} from "./HabitableScorePanel";
import {HabitableDetailsPanels} from "./HabitableDetailsPanels";
import {BackButton} from "@/src/common";

type ApiResponse = {
    success: boolean;
    data?: HabitableWorldDetails;
    message?: string;
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

    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
            <div className="pointer-events-none fixed inset-0 opacity-95" style={{background: "var(--body-bg)"}} />
            <div className="pointer-events-none fixed inset-0 opacity-25 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:38px_38px]" />

            <div className="relative z-10 mx-auto grid max-w-[1500px] gap-5 px-4 py-6 sm:px-6 lg:px-8">
                <BackButton label={t.backToHabitable} />

                <motion.div
                    initial={{opacity: 0, y: 18}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.35}}
                    className="grid gap-5"
                >
                    <HabitableDetailsHero data={data} t={t} />
                    <HabitableScorePanel data={data} t={t} />
                    <HabitableDetailsPanels data={data} t={t} />

                    <Link
                        href={`/exoplanets/catalog/${encodeURIComponent(data.pl_name ?? "")}`}
                        className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-accent)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--color-accent)] transition hover:bg-[var(--color-accent)] hover:text-black"
                    >
                        {t.open}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </motion.div>
            </div>
        </main>
    );
};