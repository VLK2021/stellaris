"use client";

import {useEffect} from "react";

import {useApodExplorer} from "@/src/hooks/apod/useApodExplorer";
import {useLanguage} from "@/src/context/LanguageContext";
import type {ApodExplorerLocale} from "@/src/types/apod/apod.types";

import {ApodBackground} from "./ApodBackground";
import {ApodControls} from "./ApodControls";
import {ApodGrid} from "./ApodGrid";
import {ApodHero} from "./ApodHero";
import {ApodLoadingState} from "./ApodLoadingState";

export const ApodPageClient = () => {
    const {locale} = useLanguage();
    const t = locale.apod as ApodExplorerLocale;

    const {
        explorer,
        state,
        loadApod,
        visibleItems,
        featured,
    } = useApodExplorer();

    useEffect(() => {
        loadApod();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#020611] px-3 py-8 text-white sm:px-5 lg:px-8">
            <ApodBackground />

            <div className="relative z-10 mx-auto max-w-[1580px]">
                <ApodHero item={featured} locale={t} />

                <ApodControls
                    locale={t}
                    defaultValues={explorer}
                    onLoad={loadApod}
                    loading={state.loading}
                />

                {state.loading ? (
                    <ApodLoadingState locale={t} />
                ) : (
                    <ApodGrid
                        locale={t}
                        items={visibleItems}
                        error={state.error}
                    />
                )}
            </div>
        </main>
    );
};