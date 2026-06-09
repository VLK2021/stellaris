"use client";

import Link from "next/link";
import {useEffect, useMemo, useState} from "react";
import {ArrowLeft, Loader2} from "lucide-react";

import {Pagination} from "@/src/common/pagination";
import {useLanguage} from "@/src/context/LanguageContext";
import {
    fetchMarsFiltersClient,
    fetchMarsPhotosClient,
} from "@/src/services/mars";
import type {
    MarsFilters,
    MarsLocale,
    MarsPhoto,
    MarsRoverName,
} from "@/src/types/mars";

import {MarsPhotosFilters} from "./MarsPhotosFilters";
import {MarsPhotosGallery} from "./MarsPhotosGallery";

export type MarsPhotoSort = "newest" | "oldest" | "solDesc" | "solAsc";

export type MarsPhotoFormState = {
    rover: MarsRoverName;
    camera: string;
    earthDate: string;
    sol: string;
    page: number;
    sort: MarsPhotoSort;
};

const ESTIMATED_TOTAL_PAGES = 25;

const sortPhotos = (photos: MarsPhoto[], sort: MarsPhotoSort) => {
    return photos.slice().sort((a, b) => {
        if (sort === "newest") return b.earth_date.localeCompare(a.earth_date);
        if (sort === "oldest") return a.earth_date.localeCompare(b.earth_date);
        if (sort === "solDesc") return b.sol - a.sol;

        return a.sol - b.sol;
    });
};

export const MarsPhotosPage = () => {
    const {locale} = useLanguage();
    const t = locale.mars as MarsLocale;

    const [filters, setFilters] = useState<MarsFilters | null>(null);
    const [photos, setPhotos] = useState<MarsPhoto[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtersLoading, setFiltersLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState<MarsPhotoFormState>({
        rover: "perseverance",
        camera: "",
        earthDate: "2025-11-06",
        sol: "",
        page: 1,
        sort: "newest",
    });

    useEffect(() => {
        const loadFilters = async () => {
            setFiltersLoading(true);

            try {
                const data = await fetchMarsFiltersClient();
                const first = data.rovers[0];

                setFilters(data);

                if (first) {
                    setForm((prev) => ({
                        ...prev,
                        rover: first.name,
                        earthDate: first.defaultEarthDate,
                    }));
                }
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : t.emptyPhotos,
                );
            } finally {
                setFiltersLoading(false);
            }
        };

        void loadFilters();
    }, [t.emptyPhotos]);

    useEffect(() => {
        const loadPhotos = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchMarsPhotosClient({
                    rover: form.rover,
                    camera: form.camera || undefined,
                    earthDate: form.earthDate || undefined,
                    sol: form.sol ? Number(form.sol) : undefined,
                    page: form.page,
                });

                setPhotos(data.photos);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : t.emptyPhotos,
                );
            } finally {
                setLoading(false);
            }
        };

        void loadPhotos();
    }, [
        form.rover,
        form.camera,
        form.earthDate,
        form.sol,
        form.page,
        t.emptyPhotos,
    ]);

    const sortedPhotos = useMemo(
        () => sortPhotos(photos, form.sort),
        [photos, form.sort],
    );

    return (
        <main
            className="relative min-h-screen overflow-hidden text-[var(--mars-text)]"
            style={{background: "var(--mars-bg)"}}
        >
            <div className="pointer-events-none fixed inset-0 opacity-70">
                <div
                    className="absolute inset-0"
                    style={{background: "var(--mars-bg)"}}
                />
                <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(251,146,60,.8)_1px,transparent_1px)] [background-size:36px_36px]" />
            </div>

            <div className="relative z-10 mx-auto grid max-w-[1580px] gap-6 px-4 py-8 sm:px-6 lg:px-8">
                <Link
                    href="/mars"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--mars-border)] bg-[var(--mars-surface)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--mars-accent)] transition hover:border-[var(--mars-accent)]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {t.photosBack}
                </Link>

                <section className="rounded-[2.6rem] border border-[var(--mars-border)] bg-[var(--mars-surface)] p-6 shadow-[var(--mars-glow)]">
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--mars-accent)]">
                        {t.photosEyebrow}
                    </p>

                    <h1 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-[var(--mars-text)] md:text-7xl">
                        {t.photosTitle}
                    </h1>

                    <p className="mt-5 max-w-4xl text-sm leading-7 text-[var(--mars-muted)]">
                        {t.photosDescription}
                    </p>
                </section>

                {filters && (
                    <MarsPhotosFilters
                        filters={filters}
                        form={form}
                        setForm={setForm}
                        t={t}
                    />
                )}

                {filtersLoading || loading ? (
                    <div className="grid min-h-[360px] place-items-center rounded-[2rem] border border-[var(--mars-border)] bg-[var(--mars-surface)]">
                        <div className="flex items-center gap-3 text-[var(--mars-accent)]">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span className="text-sm font-black uppercase tracking-[0.16em]">
                                {t.loadingPhotos}
                            </span>
                        </div>
                    </div>
                ) : (
                    <MarsPhotosGallery
                        photos={sortedPhotos}
                        error={error}
                        t={t}
                    />
                )}

                <Pagination
                    currentPage={form.page}
                    totalPages={ESTIMATED_TOTAL_PAGES}
                    isLoading={loading}
                    onPageChange={(page) =>
                        setForm((prev) => ({
                            ...prev,
                            page,
                        }))
                    }
                />
            </div>
        </main>
    );
};