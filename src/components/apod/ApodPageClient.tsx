"use client";

import {useEffect} from "react";

import {useLanguage} from "@/src/context/LanguageContext";
import {useApodExplorer} from "@/src/hooks/apod/useApodExplorer";
import type {ApodExplorerLocale} from "@/src/types/apod/apod.types";
import {Pagination} from "@/src/common/pagination";

import {ApodBackground} from "./ApodBackground";
import {ApodControls} from "./ApodControls";
import {ApodGrid} from "./ApodGrid";
import {ApodHero} from "./ApodHero";
import {ApodLoadingState} from "./ApodLoadingState";

export const ApodPageClient = () => {
    const {locale} = useLanguage();
    const t = locale.apod as ApodExplorerLocale;

    const {explorer, state, loadApod, visibleItems, featured} =
        useApodExplorer();

    useEffect(() => {
        loadApod();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePageChange = (page: number) => {
        loadApod(explorer, page);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)] px-3 py-6 text-[var(--color-text)] sm:px-5 sm:py-8 lg:px-8">
            <ApodBackground />

            <div className="relative z-10 mx-auto max-w-[1540px]">
                <ApodHero item={featured} locale={t} />

                <ApodControls
                    locale={t}
                    defaultValues={explorer}
                    onLoad={(values) => loadApod(values, 1)}
                    loading={state.loading}
                />

                {state.loading ? (
                    <ApodLoadingState locale={t} />
                ) : (
                    <>
                        <ApodGrid
                            locale={t}
                            items={visibleItems}
                            error={state.error}
                        />

                        {state.pagination && state.pagination.totalPages > 1 && (
                            <Pagination
                                currentPage={state.pagination.page}
                                totalPages={state.pagination.totalPages}
                                onPageChange={handlePageChange}
                                isLoading={state.loading}
                                showInfo
                            />
                        )}
                    </>
                )}
            </div>
        </main>
    );
};