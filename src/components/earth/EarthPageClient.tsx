"use client";

import {useState} from "react";

import {useLanguage} from "@/src/context/LanguageContext";
import {useEarthExplorer} from "@/src/hooks/earth/useEarthExplorer";

import type {EarthTab, EarthLocale} from "@/src/types/earth/earthUi.types";

import {EarthBackground} from "./EarthBackground";
import {EarthHero} from "./EarthHero";
import {EarthLoading} from "./EarthLoading";
import {EarthStatsGrid} from "./EarthStatsGrid";
import {EarthTabsContent} from "./EarthTabsContent";

export const EarthPageClient = () => {
    const {locale} = useLanguage();
    const t = locale.earth as EarthLocale;

    const [activeTab, setActiveTab] = useState<EarthTab>("overview");

    const {data, loading, error} = useEarthExplorer();

    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)] px-3 py-6 text-[var(--color-text)] sm:px-5 sm:py-8 lg:px-8">
            <EarthBackground />

            <div className="relative z-10 mx-auto max-w-[1540px]">
                {loading && <EarthLoading />}

                {!loading && error && (
                    <div className="rounded-[1.5rem] border border-[var(--color-error)]/30 bg-[var(--color-error)]/10 p-5 text-sm text-[var(--color-error)]">
                        {error}
                    </div>
                )}

                {!loading && data && (
                    <div className="grid gap-5">
                        <EarthHero
                            data={data}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            t={t}
                        />

                        <EarthStatsGrid
                            data={data}
                            t={t}
                        />

                        <EarthTabsContent
                            activeTab={activeTab}
                            data={data}
                            t={t}
                        />
                    </div>
                )}
            </div>
        </main>
    );
};