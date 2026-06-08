"use client";

import {useCallback, useEffect, useState} from "react";

import {Pagination} from "@/src/common/pagination";
import {useLanguage} from "@/src/context/LanguageContext";
import type {
    ExoplanetMethodItem,
    ExoplanetsMethodsApiResponse,
} from "@/src/types/exoplanets/methods.types";
import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

import {ExoplanetsMethodsFilters} from "./ExoplanetsMethodsFilters";
import {ExoplanetsMethodsHero} from "./ExoplanetsMethodsHero";
import {ExoplanetsMethodsList} from "./ExoplanetsMethodsList";
import {ExoplanetsMethodsState} from "./ExoplanetsMethodsState";
import {BackButton} from "@/src/common";

export const ExoplanetsMethodsPage = () => {
    const {locale} = useLanguage();
    const t = (locale.exoplanets as ExoplanetsLocale).methods;

    const [items, setItems] = useState<ExoplanetMethodItem[]>([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("planets");
    const [order, setOrder] = useState("desc");
    const [page, setPage] = useState(1);

    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

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
                sortBy,
                order,
            });

            const response = await fetch(`/api/exoplanets/methods?${params.toString()}`);
            const json = (await response.json()) as ExoplanetsMethodsApiResponse;

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
            <div className="pointer-events-none fixed inset-0 opacity-20 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:38px_38px]" />

            <div className="relative z-10 mx-auto grid max-w-[1500px] gap-5 px-4 py-6 sm:px-6 lg:px-8">
                <BackButton label={t.backToExoplanets} />

                <ExoplanetsMethodsHero
                    t={t}
                    total={total}
                    page={page}
                    totalPages={totalPages}
                />

                <ExoplanetsMethodsFilters
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

                <ExoplanetsMethodsState loading={loading} error={error}>
                    <ExoplanetsMethodsList items={items} t={t} />

                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        isLoading={loading}
                        showInfo={false}
                    />
                </ExoplanetsMethodsState>
            </div>
        </main>
    );
};