"use client";

import {useEffect} from "react";

import {Pagination} from "@/src/common/pagination";
import {useLanguage} from "@/src/context/LanguageContext";
import {useAsteroidsExplorer} from "@/src/hooks/asteroids/useAsteroidsExplorer";
import type {AsteroidsLocale} from "@/src/types/asteroids/asteroidsUi.types";

import {AsteroidsBackground} from "./AsteroidsBackground";
import {AsteroidsControls} from "./AsteroidsControls";
import {AsteroidsGrid} from "./AsteroidsGrid";
import {AsteroidsHero} from "./AsteroidsHero";
import {AsteroidsLoadingState} from "./AsteroidsLoadingState";
import {AsteroidsStats} from "./AsteroidsStats";

export const AsteroidsPageClient = () => {
    const {locale} = useLanguage();
    const t = locale.asteroids as AsteroidsLocale;

    const {
        explorer,
        state,
        visibleItems,
        loadAsteroids,
    } = useAsteroidsExplorer();

    useEffect(() => {
        loadAsteroids();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePageChange = (page: number) => {
        loadAsteroids(explorer, page);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)] px-3 py-6 text-[var(--color-text)] sm:px-5 sm:py-8 lg:px-8">
            <AsteroidsBackground />

            <div className="relative z-10 mx-auto max-w-[1540px]">
                <AsteroidsHero locale={t} />

                <AsteroidsControls
                    locale={t}
                    defaultValues={explorer}
                    loading={state.loading}
                    onLoad={(values) => loadAsteroids(values, 1)}
                />

                {state.stats && (
                    <AsteroidsStats
                        locale={t}
                        stats={state.stats}
                    />
                )}

                {state.loading ? (
                    <AsteroidsLoadingState />
                ) : (
                    <>
                        <AsteroidsGrid
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