"use client";

import {useCallback, useEffect, useState} from "react";
import {motion} from "framer-motion";
import {Loader2} from "lucide-react";

import {Pagination} from "@/src/common/pagination";

import {ExoplanetsCatalogCard} from "./ExoplanetsCatalogCard";
import {ExoplanetsCatalogFilters} from "./ExoplanetsCatalogFilters";

export type ExoplanetCatalogItem = {
    pl_name: string | null;
    hostname: string | null;
    sy_dist: number | null;
    disc_year: number | null;
    discoverymethod: string | null;
    pl_rade: number | null;
    pl_bmasse: number | null;
    pl_orbper: number | null;
    pl_eqt: number | null;
    st_teff: number | null;
    st_rad: number | null;
    st_mass: number | null;
};

type ApiResponse = {
    success: boolean;
    data: ExoplanetCatalogItem[];
    message?: string;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
};

export const ExoplanetsCatalogPage = () => {
    const [items, setItems] = useState<ExoplanetCatalogItem[]>([]);
    const [search, setSearch] = useState("");
    const [method, setMethod] = useState("");
    const [sortBy, setSortBy] = useState("disc_year");
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
                limit: "12",
                search,
                method,
                sortBy,
                order,
            });

            const response = await fetch(`/api/exoplanets/catalog?${params.toString()}`);
            const json = (await response.json()) as ApiResponse;

            if (!response.ok || !json.success) {
                throw new Error(json.message ?? "Failed to load exoplanets.");
            }

            setItems(json.data);
            setTotal(json.pagination.total);
            setTotalPages(json.pagination.totalPages);
        } catch (error) {
            setItems([]);
            setError(error instanceof Error ? error.message : "Unknown error.");
        } finally {
            setLoading(false);
        }
    }, [page, search, method, sortBy, order]);

    useEffect(() => {
        const timeout = window.setTimeout(loadData, 300);
        return () => window.clearTimeout(timeout);
    }, [loadData]);

    const resetPage = () => setPage(1);

    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
            <div className="pointer-events-none fixed inset-0 opacity-90" style={{background: "var(--body-bg)"}} />
            <div className="pointer-events-none fixed inset-0 opacity-30 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:36px_36px]" />

            <div className="relative z-10 mx-auto grid max-w-[1500px] gap-5 px-4 py-6 sm:px-6 lg:px-8">
                <motion.section
                    initial={{opacity: 0, y: 18}}
                    animate={{opacity: 1, y: 0}}
                    className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)] backdrop-blur-2xl"
                >
                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                        NASA Exoplanet Archive
                    </p>

                    <h1 className="mt-3 max-w-4xl bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-3xl font-black uppercase tracking-[-0.05em] text-transparent sm:text-4xl">
                        Каталог підтверджених екзопланет
                    </h1>

                    <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-text-muted)]">
                        Реальні дані з NASA Exoplanet Archive TAP: планети, зорі-хости,
                        методи відкриття, орбіти, маса, радіус, температура та відстань.
                    </p>
                </motion.section>

                <ExoplanetsCatalogFilters
                    search={search}
                    method={method}
                    sortBy={sortBy}
                    order={order}
                    onSearch={(value) => {
                        setSearch(value);
                        resetPage();
                    }}
                    onMethod={(value) => {
                        setMethod(value);
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
                        <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                            <span>Total: {total}</span>
                            <span>Page {page} / {totalPages}</span>
                        </div>

                        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {items.map((item, index) => (
                                <ExoplanetsCatalogCard
                                    key={`${item.pl_name}-${item.hostname}-${index}`}
                                    item={item}
                                    index={index}
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