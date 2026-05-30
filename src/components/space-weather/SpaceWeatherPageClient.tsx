"use client";

import {useEffect} from "react";

import {Pagination} from "@/src/common/pagination";
import {useLanguage} from "@/src/context/LanguageContext";
import {useSpaceWeatherExplorer} from "@/src/hooks/space-weather/useSpaceWeatherExplorer";
import type {SpaceWeatherLocale} from "@/src/types/space-weather/spaceWeatherUi.types";

import {SpaceWeatherBackground} from "./SpaceWeatherBackground";
import {SpaceWeatherControls} from "./SpaceWeatherControls";
import {SpaceWeatherEventsGrid} from "./SpaceWeatherEventsGrid";
import {SpaceWeatherHero} from "./SpaceWeatherHero";
import {SpaceWeatherLoadingState} from "./SpaceWeatherLoadingState";
import {SpaceWeatherNotificationsGrid} from "./SpaceWeatherNotificationsGrid";
import {SpaceWeatherStats} from "./SpaceWeatherStats";

export const SpaceWeatherPageClient = () => {
    const {locale} = useLanguage();
    const t = locale.spaceWeather as SpaceWeatherLocale;

    const {
        explorer,
        state,
        loadSpaceWeather,
    } = useSpaceWeatherExplorer();

    useEffect(() => {
        loadSpaceWeather();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePageChange = (page: number) => {
        loadSpaceWeather(explorer, page);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)] px-3 py-6 text-[var(--color-text)] sm:px-5 sm:py-8 lg:px-8">
            <SpaceWeatherBackground />

            <div className="relative z-10 mx-auto max-w-[1540px]">
                <SpaceWeatherHero locale={t} />

                <SpaceWeatherControls
                    locale={t}
                    defaultValues={explorer}
                    loading={state.loading}
                    onLoad={(values) => loadSpaceWeather(values, 1)}
                />

                {state.stats && (
                    <SpaceWeatherStats
                        locale={t}
                        stats={state.stats}
                    />
                )}

                {state.loading ? (
                    <SpaceWeatherLoadingState />
                ) : (
                    <>
                        {state.error && (
                            <div className="mt-5 rounded-[1.5rem] border border-[var(--color-error)]/30 bg-[var(--color-error)]/10 p-5 text-sm text-[var(--color-error)]">
                                {state.error}
                            </div>
                        )}

                        {explorer.tab !== "notifications" && (
                            <SpaceWeatherEventsGrid
                                locale={t}
                                events={state.events}
                            />
                        )}

                        {explorer.tab === "notifications" && (
                            <SpaceWeatherNotificationsGrid
                                locale={t}
                                notifications={state.notifications}
                            />
                        )}

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