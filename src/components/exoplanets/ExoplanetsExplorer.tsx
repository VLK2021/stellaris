"use client";

import {useCallback, useEffect, useMemo, useState} from "react";
import {Loader2} from "lucide-react";

import {Pagination} from "@/src/common/pagination";

import {
    EXOPLANET_COLUMNS,
    EXOPLANET_DEFAULT_LIMIT,
    EXOPLANET_TAP_SYNC_URL,
} from "@/src/constants/exoplanets/exoplanets.constants";

import type {
    ExoplanetFilters,
    ExoplanetPlanet,
} from "@/src/types/exoplanets/exoplanets.types";
import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

import {ExoplanetCard} from "./ExoplanetCard";
import {ExoplanetsFilters} from "./ExoplanetsFilters";

type Props = {
    t: ExoplanetsLocale;
};

const initialFilters: ExoplanetFilters = {
    search: "",
    discoveryMethod: "",
    yearFrom: "",
    yearTo: "",
    radiusMax: "",
    tempMin: "",
    tempMax: "",
    sortBy: "disc_year",
    order: "desc",
    limit: EXOPLANET_DEFAULT_LIMIT,
    page: 1,
};

const safeSqlValue = (value: string) => value.replaceAll("'", "''").trim();

const buildWhere = (filters: ExoplanetFilters) => {
    const where: string[] = ["default_flag = 1"];

    if (filters.search.trim()) {
        const search = safeSqlValue(filters.search);
        where.push(`(lower(pl_name) like lower('%${search}%') or lower(hostname) like lower('%${search}%'))`);
    }

    if (filters.discoveryMethod) where.push(`discoverymethod = '${safeSqlValue(filters.discoveryMethod)}'`);
    if (filters.yearFrom) where.push(`disc_year >= ${Number(filters.yearFrom)}`);
    if (filters.yearTo) where.push(`disc_year <= ${Number(filters.yearTo)}`);
    if (filters.radiusMax) where.push(`pl_rade <= ${Number(filters.radiusMax)}`);
    if (filters.tempMin) where.push(`pl_eqt >= ${Number(filters.tempMin)}`);
    if (filters.tempMax) where.push(`pl_eqt <= ${Number(filters.tempMax)}`);

    return where.join(" and ");
};

const buildTapUrl = (filters: ExoplanetFilters) => {
    const offset = (filters.page - 1) * filters.limit;

    const query = `
        select top ${filters.limit}
        ${EXOPLANET_COLUMNS.join(",")}
        from ps
        where ${buildWhere(filters)}
        order by ${filters.sortBy} ${filters.order}
        offset ${offset}
    `
        .replace(/\s+/g, " ")
        .trim();

    const url = new URL(EXOPLANET_TAP_SYNC_URL);

    url.searchParams.set("query", query);
    url.searchParams.set("format", "json");

    return url.toString();
};

export const ExoplanetsExplorer = ({t}: Props) => {
    const [filters, setFilters] = useState<ExoplanetFilters>(initialFilters);
    const [items, setItems] = useState<ExoplanetPlanet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const url = useMemo(() => buildTapUrl(filters), [filters]);

    const loadPlanets = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`${t.explorer.requestError}: ${response.status}`);
            }

            const data = (await response.json()) as ExoplanetPlanet[];
            setItems(data);
        } catch (error) {
            setItems([]);
            setError(error instanceof Error ? error.message : t.explorer.unknownError);
        } finally {
            setLoading(false);
        }
    }, [url, t.explorer.requestError, t.explorer.unknownError]);

    useEffect(() => {
        const timeout = window.setTimeout(loadPlanets, 350);
        return () => window.clearTimeout(timeout);
    }, [loadPlanets]);

    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl">
            <div className="absolute inset-0 opacity-25" style={{background: "var(--hero-bg)"}} />

            <div className="relative z-10">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black uppercase tracking-[-0.05em]">
                            {t.explorer.title}
                        </h2>

                        <p className="exo-muted mt-2 text-sm">
                            {t.explorer.description}
                        </p>
                    </div>

                    <span className="exo-label text-[10px] font-black uppercase tracking-[0.18em]">
                        {items.length} {t.explorer.loaded}
                    </span>
                </div>

                <ExoplanetsFilters
                    filters={filters}
                    onChange={setFilters}
                    t={t}
                />

                {loading && (
                    <div className="grid min-h-[260px] place-items-center rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-glass)]">
                        <Loader2 className="h-8 w-8 animate-spin text-[var(--color-accent)]" />
                    </div>
                )}

                {!loading && error && (
                    <div className="rounded-[1.5rem] border border-[var(--color-error)]/40 bg-[var(--color-error)]/10 p-5 text-[var(--color-error)]">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                            {items.map((planet, index) => (
                                <ExoplanetCard
                                    key={`${planet.pl_name}-${planet.hostname}-${index}`}
                                    planet={planet}
                                    index={index}
                                    t={t}
                                />
                            ))}
                        </div>

                        <div className="mt-5">
                            <Pagination
                                currentPage={filters.page}
                                totalPages={999}
                                onPageChange={(page) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        page,
                                    }))
                                }
                                isLoading={loading}
                                showInfo={false}
                            />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};