"use client";

import {useCallback, useEffect, useState} from "react";
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

    const loadData = useCallback(async () => {
        setLoading(true);

        try {
            const params = new URLSearchParams({
                page: String(page),
                limit: "12",
                search,
            });

            const response = await fetch(
                `/api/exoplanets/habitable?${params.toString()}`,
            );

            const json = (await response.json()) as ApiResponse;

            setItems(json.data ?? []);
            setTotal(json.pagination?.total ?? 0);
            setTotalPages(json.pagination?.totalPages ?? 1);
        } finally {
            setLoading(false);
        }
    }, [page, search]);

    useEffect(() => {
        void loadData();
    }, [loadData]);

    return (
        <main className="relative min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
            <div className="pointer-events-none fixed inset-0 opacity-95" style={{background: "var(--body-bg)"}} />

            <div className="relative z-10 mx-auto grid max-w-[1500px] gap-5 px-4 py-6">
                <BackButton label={t.systems.backToExoplanets} />

                <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                        HABITABLE WORLDS
                    </p>

                    <h1 className="mt-3 text-4xl font-black uppercase tracking-[-0.05em]">
                        Potentially Habitable Exoplanets
                    </h1>

                    <p className="mt-4 max-w-3xl text-sm text-[var(--color-text-muted)]">
                        Earth-like planets ranked by custom habitability score.
                    </p>

                    <div className="mt-5 flex gap-3">
                        <div className="rounded-full border border-[var(--color-border)] px-4 py-2 text-xs font-black">
                            {total} Worlds
                        </div>
                    </div>
                </section>

                <ExoplanetsHabitableFilters
                    search={search}
                    onSearch={(value) => {
                        setSearch(value);
                        setPage(1);
                    }}
                />

                {loading && (
                    <div className="grid min-h-[300px] place-items-center">
                        <Loader2 className="h-8 w-8 animate-spin text-[var(--color-accent)]" />
                    </div>
                )}

                {!loading && (
                    <>
                        <section className="grid gap-4 xl:grid-cols-2">
                            {items.map((item, index) => (
                                <ExoplanetsHabitableCard
                                    key={`${item.pl_name}-${index}`}
                                    item={item}
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