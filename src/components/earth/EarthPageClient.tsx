"use client";

import {useState} from "react";

import {useLanguage} from "@/src/context/LanguageContext";
import {useEarthExplorer} from "@/src/hooks/earth/useEarthExplorer";

import type {EarthLocale, EarthTab} from "@/src/types/earth/earthUi.types";

import {EarthBackground} from "./EarthBackground";
import {EarthHero} from "./EarthHero";
import {EarthLoading} from "./EarthLoading";
import {EarthTabsContent} from "./EarthTabsContent";

const earthTypography =
    "[&_h1]:bg-gradient-to-r [&_h1]:from-[var(--color-text)] [&_h1]:via-[var(--color-accent)] [&_h1]:to-[var(--color-brand-secondary)] [&_h1]:bg-clip-text [&_h1]:text-transparent " +
    "[&_h2]:bg-gradient-to-r [&_h2]:from-[var(--color-text)] [&_h2]:via-[var(--color-accent)] [&_h2]:to-[var(--color-brand-secondary)] [&_h2]:bg-clip-text [&_h2]:text-transparent " +
    "[&_h3]:bg-gradient-to-r [&_h3]:from-[var(--color-text)] [&_h3]:via-[var(--color-accent)] [&_h3]:to-[var(--color-earth)] [&_h3]:bg-clip-text [&_h3]:text-transparent " +
    "[&_.earth-label]:bg-gradient-to-r [&_.earth-label]:from-[var(--color-accent)] [&_.earth-label]:to-[var(--color-brand-secondary)] [&_.earth-label]:bg-clip-text [&_.earth-label]:text-transparent " +
    "[&_.earth-muted]:bg-gradient-to-r [&_.earth-muted]:from-[var(--color-text-muted)] [&_.earth-muted]:to-[var(--color-text-soft)] [&_.earth-muted]:bg-clip-text [&_.earth-muted]:text-transparent";

export const EarthPageClient = () => {
    const {locale} = useLanguage();
    const t = locale.earth as EarthLocale;

    const [activeTab, setActiveTab] = useState<EarthTab>("overview");
    const {data, loading, error} = useEarthExplorer();

    return (
        <main className={`relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)] ${earthTypography}`}>
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