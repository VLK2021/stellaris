"use client";

import {useCallback, useEffect, useState} from "react";

import {Pagination} from "@/src/common/pagination";
import {useLanguage} from "@/src/context/LanguageContext";
import type {AtmosphereItem, AtmospheresApiResponse} from "@/src/types/exoplanets/atmospheres.types";
import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

import {ExoplanetsAtmospheresFilters} from "./ExoplanetsAtmospheresFilters";
import {ExoplanetsAtmospheresHero} from "./ExoplanetsAtmospheresHero";
import {ExoplanetsAtmospheresList} from "./ExoplanetsAtmospheresList";
import {ExoplanetsAtmospheresState} from "./ExoplanetsAtmospheresState";
import {BackButton} from "@/src/common";

export const ExoplanetsAtmospheresPage = () => {
    const {locale} = useLanguage();
    const t = (locale.exoplanets as ExoplanetsLocale).atmospheres;

    const [items, setItems] = useState<AtmosphereItem[]>([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("pl_name");
    const [order, setOrder] = useState("asc");
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
                sortBy,
                order,
            });

            const response = await fetch(`/api/exoplanets/atmospheres?${params.toString()}`);
            const json = (await response.json()) as AtmospheresApiResponse;

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

                <ExoplanetsAtmospheresHero
                    t={t}
                    total={total}
                    page={page}
                    totalPages={totalPages}
                />

                <ExoplanetsAtmospheresFilters
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

                <ExoplanetsAtmospheresState
                    loading={loading}
                    error={error}
                >
                    <ExoplanetsAtmospheresList items={items} t={t} />

                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        isLoading={loading}
                        showInfo={false}
                    />
                </ExoplanetsAtmospheresState>
            </div>
        </main>
    );
};