"use client";

import {useCallback, useEffect, useState} from "react";
import {motion} from "framer-motion";
import {Loader2} from "lucide-react";

import {Pagination} from "@/src/common/pagination";
import {useLanguage} from "@/src/context/LanguageContext";
import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

import {ExoplanetsHabitableCard} from "./ExoplanetsHabitableCard";
import {ExoplanetsHabitableFilters} from "./ExoplanetsHabitableFilters";
import {BackButton} from "@/src/common";

export type HabitableWorld = {
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
    habitabilityScore: number;
    habitabilityZone: string;
};

type ApiResponse = {
    success: boolean;
    data: HabitableWorld[];
    message?: string;
    pagination: {
        page: number;
        total: number;
        totalPages: number;
    };
};

export const ExoplanetsHabitablePage = () => {
    const {locale} = useLanguage();
    const t = locale.exoplanets as ExoplanetsLocale;

    const [items, setItems] = useState<HabitableWorld[]>([]);
    const [search, setSearch] = useState("");
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
            });

            const response = await fetch(`/api/exoplanets/habitable?${params.toString()}`);
            const json = (await response.json()) as ApiResponse;

            if (!response.ok || !json.success) {
                throw new Error(json.message ?? "Failed to load habitable worlds.");
            }

            setItems(json.data ?? []);
            setTotal(json.pagination?.total ?? 0);
            setTotalPages(json.pagination?.totalPages ?? 1);
        } catch (error) {
            setItems([]);
            setError(error instanceof Error ? error.message : "Unknown error.");
        } finally {
            setLoading(false);
        }
    }, [page, search]);

    useEffect(() => {
        const timeout = window.setTimeout(loadData, 250);
        return () => window.clearTimeout(timeout);
    }, [loadData]);

    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
            <div className="pointer-events-none fixed inset-0 opacity-95" style={{background: "var(--body-bg)"}} />
            <div className="pointer-events-none fixed inset-0 opacity-25 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:38px_38px]" />

            <div className="relative z-10 mx-auto grid max-w-[1500px] gap-5 px-4 py-6 sm:px-6 lg:px-8">
                <BackButton label={t.systems.backToExoplanets} />

                <motion.section
                    initial={{opacity: 0, y: 18}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.35}}
                    className="relative overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)]"
                >
                    <div className="absolute inset-0 opacity-30" style={{background: "var(--hero-bg)"}} />
                    <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:30px_30px]" />

                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                            Habitable Worlds
                        </p>

                        <h1 className="mt-3 max-w-4xl bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-3xl font-black uppercase tracking-[-0.05em] text-transparent sm:text-4xl">
                            Potentially Habitable Exoplanets
                        </h1>

                        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-text-muted)]">
                            Earth-like exoplanets ranked by temperature, radius, mass, distance and stellar parameters from NASA Exoplanet Archive.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2">
                                Worlds: {total}
                            </span>

                            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2">
                                Page {page} / {totalPages}
                            </span>
                        </div>
                    </div>
                </motion.section>

                <ExoplanetsHabitableFilters
                    search={search}
                    onSearch={(value) => {
                        setSearch(value);
                        setPage(1);
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
                                <ExoplanetsHabitableCard
                                    key={`${item.pl_name}-${index}`}
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