"use client";

import {Search} from "lucide-react";

import {Pagination} from "@/src/common/pagination";
import {useEarthLayers} from "@/src/hooks/earth/useEarthLayers";

import type {EarthLocale} from "@/src/types/earth/earthUi.types";

import {EarthLayerCard} from "./EarthLayerCard";
import {EarthPanel} from "./EarthPanel";

type Props = {
    title: string;
    t: EarthLocale;
};

export const EarthLayersTab = ({title, t}: Props) => {
    const {
        data,
        pagination,
        initialLoading,
        fetching,
        error,
        page,
        setPage,
        search,
        setSearch,
        sortBy,
        setSortBy,
        order,
        setOrder,
    } = useEarthLayers();

    return (
        <EarthPanel title={title}>
            <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_180px_160px]">
                <label className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />

                    <input
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                            setPage(1);
                        }}
                        placeholder="Search NASA GIBS layers..."
                        className="input h-[46px] pl-11"
                    />
                </label>

                <select
                    value={sortBy}
                    onChange={(event) => {
                        setSortBy(event.target.value as "title" | "id" | "format");
                        setPage(1);
                    }}
                    className="input h-[46px]"
                >
                    <option value="title">Title</option>
                    <option value="id">ID</option>
                    <option value="format">Format</option>
                </select>

                <select
                    value={order}
                    onChange={(event) => {
                        setOrder(event.target.value as "asc" | "desc");
                        setPage(1);
                    }}
                    className="input h-[46px]"
                >
                    <option value="asc">ASC</option>
                    <option value="desc">DESC</option>
                </select>
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

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {data.map((layer, index) => (
                                <EarthLayerCard
                                    key={layer.id}
                                    layer={layer}
                                    t={t}
                                    index={index}
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