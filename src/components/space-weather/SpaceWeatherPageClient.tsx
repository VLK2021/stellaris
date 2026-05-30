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
                <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] backdrop-blur-2xl">
                    <SpaceWeatherHero locale={t} />

                    <div className="border-t border-[var(--color-border)] bg-[var(--color-glass)] p-4 sm:p-5">
                        <SpaceWeatherControls
                            locale={t}
                            defaultValues={explorer}
                            loading={state.loading}
                            onLoad={(values) => loadSpaceWeather(values, 1)}
                        />
                    </div>
                </section>

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

                        {explorer.tab === "notifications" ? (
                            <SpaceWeatherNotificationsGrid
                                locale={t}
                                notifications={state.notifications}
                            />
                        ) : (
                            <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
                                <SpaceWeatherEventsGrid
                                    locale={t}
                                    events={state.events}
                                    startDate={explorer.startDate}
                                    endDate={explorer.endDate}
                                />

                                <aside className="grid content-start gap-5">
                                    <SpaceWeatherNotificationsGrid
                                        locale={t}
                                        notifications={state.notifications}
                                        compact
                                    />

                                    <SolarActivityHeatmap
                                        locale={t}
                                        events={state.events}
                                    />
                                </aside>
                            </div>
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

type HeatmapProps = {
    locale: SpaceWeatherLocale;
    events: {
        id: string;
        startTime: string | null;
        type: string;
    }[];
};

const SolarActivityHeatmap = ({locale, events}: HeatmapProps) => {
    const days = Array.from({length: 35}, (_, index) => {
        const eventCount = events.filter((event) => {
            if (!event.startTime) return false;

            const day = new Date(event.startTime).getDate();

            return day === index + 1;
        }).length;

        return {
            day: index + 1,
            count: eventCount,
        };
    });

    return (
        <section className="relative overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-2xl">
            <div className="absolute right-[-70px] top-[-70px] h-40 w-40 rounded-full bg-[var(--color-warning)]/10 blur-3xl" />

            <div className="relative z-10 flex items-center justify-between gap-3">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-warning)]">
                        Activity Matrix
                    </p>

                    <h2 className="mt-1 text-lg font-black uppercase tracking-[-0.04em] text-[var(--color-text)]">
                        Solar Heatmap
                    </h2>
                </div>

                <p className="text-xs text-[var(--color-text-muted)]">
                    {locale.events}
                </p>
            </div>

            <div className="relative z-10 mt-5 grid grid-cols-7 gap-2">
                {days.map((item) => (
                    <div
                        key={item.day}
                        className={`grid h-9 place-items-center rounded-lg border text-[10px] font-black ${
                            item.count >= 6
                                ? "border-[var(--color-error)]/40 bg-[var(--color-error)]/30 text-[var(--color-error)]"
                                : item.count >= 3
                                    ? "border-[var(--color-warning)]/40 bg-[var(--color-warning)]/25 text-[var(--color-warning)]"
                                    : item.count > 0
                                        ? "border-[var(--color-success)]/40 bg-[var(--color-success)]/20 text-[var(--color-success)]"
                                        : "border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-text-soft)]"
                        }`}
                    >
                        {item.day}
                    </div>
                ))}
            </div>

            <div className="relative z-10 mt-5 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
            </div>
        </section>
    );
};