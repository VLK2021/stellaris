"use client";

import {useCallback, useEffect, useState} from "react";
import {motion} from "framer-motion";
import {Loader2} from "lucide-react";

import {Pagination} from "@/src/common/pagination";
import {useLanguage} from "@/src/context/LanguageContext";
import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

import {ExoplanetsSystemsCard} from "./ExoplanetsSystemsCard";
import {ExoplanetsSystemsFilters} from "./ExoplanetsSystemsFilters";
import {BackButton} from "@/src/common";

export type ExoplanetSystemItem = {
    hostname: string | null;
    sy_snum: number | null;
    sy_pnum: number | null;
    sy_mnum: number | null;
    sy_dist: number | null;
    st_spectype: string | null;
    st_teff: number | null;
    st_rad: number | null;
    st_mass: number | null;
    st_met: number | null;
    st_logg: number | null;
    st_age: number | null;
};

type ApiResponse = {
    success: boolean;
    data: ExoplanetSystemItem[];
    message?: string;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

export const ExoplanetsSystemsPage = () => {
    const {locale} = useLanguage();
    const t = (locale.exoplanets as ExoplanetsLocale).systems;

    const [items, setItems] = useState<ExoplanetSystemItem[]>([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("sy_pnum");
    const [order, setOrder] = useState("desc");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                page: String(page),
                limit: "9",
                search,
                sortBy,
                order,
            });

            const response = await fetch(`/api/exoplanets/systems?${params.toString()}`);
            const json = (await response.json()) as ApiResponse;

            if (!response.ok || !json.success) {
                throw new Error(json.message ?? t.loadingError);
            }

            setItems(json.data);
            setTotal(json.pagination.total);
            setTotalPages(json.pagination.totalPages);
        } catch (error) {
            setItems([]);
            setError(error instanceof Error ? error.message : t.unknownError);
        } finally {
            setLoading(false);
        }
    }, [page, search, sortBy, order, t.loadingError, t.unknownError]);

    useEffect(() => {
        const timeout = window.setTimeout(loadData, 300);
        return () => window.clearTimeout(timeout);
    }, [loadData]);

    const resetPage = () => setPage(1);

    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
            <div className="pointer-events-none fixed inset-0 opacity-95" style={{background: "var(--body-bg)"}} />
            <div className="pointer-events-none fixed inset-0 opacity-25 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:38px_38px]" />

            <div className="relative z-10 mx-auto grid max-w-[1500px] gap-5 px-4 py-6 sm:px-6 lg:px-8">
                <BackButton
                    label={t.backToSystems}
                />

                <motion.section
                    initial={{opacity: 0, y: 18}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.35}}
                    className="relative overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)] backdrop-blur-2xl"
                >
                    <div className="absolute inset-0 opacity-30" style={{background: "var(--hero-bg)"}} />

                    <div className="relative z-10">
                        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                            {t.eyebrow}
                        </p>

                        <h1 className="mt-3 max-w-4xl bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-3xl font-black uppercase tracking-[-0.05em] text-transparent sm:text-4xl">
                            {t.title}
                        </h1>

                        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-text-muted)]">
                            {t.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2">
                                {t.total}: {total}
                            </span>
                            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2">
                                {t.page} {page} / {totalPages}
                            </span>
                        </div>
                    </div>
                </motion.section>

                <ExoplanetsSystemsFilters
                    search={search}
                    sortBy={sortBy}
                    order={order}
                    t={t}
                    onSearch={(value) => {
                        setSearch(value);
                        resetPage();
                    }}
                    onSortBy={(value) => {
                        setSortBy(value);
                        resetPage();
                    }}
                    onOrder={(value) => {
                        setOrder(value);
                        resetPage();
                    }}
                />

                {loading && (
                    <div className="grid min-h-[300px] place-items-center rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)]">
                        <Loader2 className="h-9 w-9 animate-spin text-[var(--color-accent)]" />
                    </div>
                )}

                {!loading && error && (
                    <div className="rounded-[2rem] border border-[var(--color-error)]/40 bg-[var(--color-error)]/10 p-6 text-[var(--color-error)]">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <section className="grid gap-4 xl:grid-cols-2">
                            {items.map((item, index) => (
                                <ExoplanetsSystemsCard
                                    key={`${item.hostname}-${index}`}
                                    item={item}
                                    index={index}
                                    t={t}
                                />
                            ))}
                        </section>

                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                            isLoading={loading}
                            showInfo={false}
                        />
                    </>
                )}
            </div>
        </main>
    );
};