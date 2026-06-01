"use client";

import {ExternalLink} from "lucide-react";

import {Pagination} from "@/src/common/pagination";
import {useEarthEpic} from "@/src/hooks/earth/useEarthEpic";

import type {EarthLocale} from "@/src/types/earth/earthUi.types";
import type {EpicImageType} from "@/src/types/earth/earth.types";

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
                                <a
                                    key={image.id}
                                    href={image.imageUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group overflow-hidden rounded-[1.3rem] border border-[var(--color-border)] bg-[var(--color-glass)] transition hover:border-[var(--color-accent)]/70 hover:shadow-[var(--shadow-glow)]"
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={image.imageUrl}
                                            alt={image.caption}
                                            className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105"
                                        />

                                        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] bg-black/40 text-[var(--color-accent)] backdrop-blur-xl">
                                            <ExternalLink className="h-4 w-4" />
                                        </span>
                                    </div>

                                    <div className="p-4">
                                        <p className="text-sm font-black text-[var(--color-text)]">
                                            {image.date}
                                        </p>

                                        <p className="mt-2 text-xs leading-5 text-[var(--color-text-muted)]">
                                            {image.caption}
                                        </p>

                                        <div className="mt-4 grid gap-1 text-xs text-[var(--color-text-muted)]">
                                            <p>LAT: {image.centroidCoordinates.lat ?? "—"}</p>
                                            <p>LON: {image.centroidCoordinates.lon ?? "—"}</p>
                                            <p>VERSION: {image.version ?? "—"}</p>
                                            <p>TYPE: {image.type}</p>
                                        </div>

                                        <p className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                                            {t.details.viewImage} →
                                        </p>
                                    </div>
                                </a>
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