"use client";

import {useEffect, useMemo, useState} from "react";
import {motion} from "framer-motion";
import {Loader2} from "lucide-react";

import {useLanguage} from "@/src/context/LanguageContext";
import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";
import type {
    MethodDetailsApiResponse,
    MethodDetailsData,
} from "@/src/types/exoplanets/methodDetails.types";

import {ExoplanetMethodExamples} from "./ExoplanetMethodExamples";
import {ExoplanetMethodHero} from "./ExoplanetMethodHero";
import {ExoplanetMethodProsCons} from "./ExoplanetMethodProsCons";
import {ExoplanetMethodStats} from "./ExoplanetMethodStats";
import {BackButton} from "@/src/common";

export const ExoplanetMethodDetailsPage = ({method}: {method: string}) => {
    const {locale} = useLanguage();
    const t = (locale.exoplanets as ExoplanetsLocale).methods;
    const methodName = useMemo(() => decodeURIComponent(method), [method]);

    const [data, setData] = useState<MethodDetailsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `/api/exoplanets/methods/${encodeURIComponent(methodName)}`,
                );

                const json = (await response.json()) as MethodDetailsApiResponse;

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
    }, [methodName, t.notFound]);

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
            <div className="pointer-events-none fixed inset-0 opacity-20 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:38px_38px]" />

            <div className="relative z-10 mx-auto grid max-w-[1500px] gap-5 px-4 py-6 sm:px-6 lg:px-8">
                <BackButton label={t.backToMethods} />

                <motion.div
                    initial={{opacity: 0, y: 16}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.35}}
                    className="grid gap-5"
                >
                    <ExoplanetMethodHero data={data} t={t} />
                    <ExoplanetMethodStats data={data} t={t} />
                    <ExoplanetMethodProsCons method={data.method} t={t} />
                    <ExoplanetMethodExamples method={data.method} t={t} />
                </motion.div>
            </div>
        </main>
    );
};