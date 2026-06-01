"use client";

import {Pagination} from "@/src/common/pagination";
import {useEarthEpic} from "@/src/hooks/earth/useEarthEpic";

import type {EpicImageType} from "@/src/types/earth/earth.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

import {EarthImageCard} from "./EarthImageCard";
import {EarthPanel} from "./EarthPanel";

type Props = {
    title: string;
    t: EarthLocale;
};

export const EarthEpicTab = ({title, t}: Props) => {
    const {
        data,
        pagination,
        initialLoading,
        fetching,
        error,
        page,
        setPage,
        type,
        setType,
        date,
        setDate,
    } = useEarthEpic();

    return (
        <EarthPanel title={title}>
            <div className="mb-5 grid gap-3 md:grid-cols-[180px_220px]">
                <select
                    value={type}
                    onChange={(event) => {
                        setType(event.target.value as EpicImageType);
                        setPage(1);
                    }}
                    className="input h-[46px]"
                >
                    <option value="natural">Natural</option>
                    <option value="enhanced">Enhanced</option>
                </select>

                <input
                    type="date"
                    value={date}
                    onChange={(event) => {
                        setDate(event.target.value);
                        setPage(1);
                    }}
                    className="input h-[46px]"
                />
            </div>

            {initialLoading && (
                <div className="rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-5 text-sm text-[var(--color-text-muted)]">
                    {t.details.loading}
                </div>
            )}

            {!initialLoading && error && (
                <div className="rounded-[1.2rem] border border-[var(--color-error)]/30 bg-[var(--color-error)]/10 p-5 text-sm text-[var(--color-error)]">
                    {error}
                </div>
            )}

            {!initialLoading && !error && (
                <>
                    <div className="relative">
                        {fetching && (
                            <div className="absolute inset-0 z-20 grid place-items-center rounded-[1.4rem] bg-[var(--color-background)]/45 backdrop-blur-[2px]">
                                <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                                    {t.details.loading}
                                </div>
                            </div>
                        )}

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {data.map((image) => (
                                <EarthImageCard
                                    key={image.id}
                                    image={image}
                                    t={t}
                                />
                            ))}
                        </div>
                    </div>

                    {pagination && pagination.totalPages > 1 && (
                        <div className="mt-5">
                            <Pagination
                                currentPage={page}
                                totalPages={pagination.totalPages}
                                onPageChange={setPage}
                                isLoading={fetching}
                                showInfo
                            />
                        </div>
                    )}
                </>
            )}
        </EarthPanel>
    );
};