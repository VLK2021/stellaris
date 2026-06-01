"use client";

import {useState} from "react";

import {useLanguage} from "@/src/context/LanguageContext";
import {useEarthExplorer} from "@/src/hooks/earth/useEarthExplorer";

import type {EarthLocale, EarthTab} from "@/src/types/earth/earthUi.types";

import {EarthBackground} from "./EarthBackground";
import {EarthHero} from "./EarthHero";
import {EarthLoading} from "./EarthLoading";
import {EarthTabsContent} from "./EarthTabsContent";

export const EarthPageClient = () => {
    const {locale} = useLanguage();
    const t = locale.earth as EarthLocale;

    const [activeTab, setActiveTab] = useState<EarthTab>("overview");
    const {data, loading, error} = useEarthExplorer();

    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
            <EarthBackground />

            <div className="relative z-10 mx-auto w-full max-w-[1680px] px-4 py-6 sm:px-6 lg:px-8">
                {loading && <EarthLoading />}

                {!loading && error && (
                    <div className="rounded-[1.5rem] border border-[var(--color-error)]/30 bg-[var(--color-error)]/10 p-5 text-sm text-[var(--color-error)]">
                        {error}
                    </div>
                )}

                {!loading && data && (
                    <div className="space-y-6">
                        <EarthHero
                            data={data}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
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