"use client";

import {useEffect, useMemo, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {Loader2} from "lucide-react";

import {BackButton} from "@/src/common/BackButton";
import {Pagination} from "@/src/common/pagination";
import {useLanguage} from "@/src/context/LanguageContext";
import {fetchMediaSearchClient} from "@/src/services/media";
import type {
    MediaItem,
    MediaLocale,
    MediaSearchQuery,
    MediaSort,
    MediaType,
} from "@/src/types/media";

import {MediaFilters} from "./MediaFilters";
import {MediaGrid} from "./MediaGrid";
import {MediaHero} from "./MediaHero";
import {MediaPreviewModal} from "./MediaPreviewModal";

export type MediaFormState = {
    query: string;
    mediaType: MediaType | "all";
    center: string;
    yearStart: string;
    yearEnd: string;
    page: number;
    sort: MediaSort;
};

const getTotalPages = (itemsCount: number, page: number) => {
    return itemsCount >= 100 ? page + 1 : page;
};

const sortMediaItems = (items: MediaItem[], sort: MediaSort) => {
    return items.slice().sort((a, b) => {
        const aData = a.data[0];
        const bData = b.data[0];

        if (sort === "newest") {
            return (bData.date_created ?? "").localeCompare(aData.date_created ?? "");
        }

        if (sort === "oldest") {
            return (aData.date_created ?? "").localeCompare(bData.date_created ?? "");
        }

        if (sort === "titleAsc") {
            return aData.title.localeCompare(bData.title);
        }

        return bData.title.localeCompare(aData.title);
    });
};

export const MediaPage = () => {
    const {locale} = useLanguage();
    const t = locale.media as MediaLocale;

    const router = useRouter();
    const searchParams = useSearchParams();

    const [items, setItems] = useState<MediaItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState<MediaFormState>({
        query: searchParams.get("q") ?? "mars",
        mediaType: (searchParams.get("type") as MediaType | null) ?? "all",
        center: searchParams.get("center") ?? "",
        yearStart: searchParams.get("yearStart") ?? "",
        yearEnd: searchParams.get("yearEnd") ?? "",
        page: Number(searchParams.get("page") ?? 1),
        sort: (searchParams.get("sort") as MediaSort | null) ?? "newest",
    });

    useEffect(() => {
        const queryFromUrl = searchParams.get("q") ?? "mars";
        const typeFromUrl = searchParams.get("type") as MediaType | null;
        const pageFromUrl = Number(searchParams.get("page") ?? 1);

        setForm({
            query: queryFromUrl,
            mediaType:
                typeFromUrl === "image" ||
                typeFromUrl === "video" ||
                typeFromUrl === "audio"
                    ? typeFromUrl
                    : "all",
            center: searchParams.get("center") ?? "",
            yearStart: searchParams.get("yearStart") ?? "",
            yearEnd: searchParams.get("yearEnd") ?? "",
            page: Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1,
            sort: (searchParams.get("sort") as MediaSort | null) ?? "newest",
        });
    }, [searchParams]);

    useEffect(() => {
        const loadMedia = async () => {
            setLoading(true);
            setError(null);

            try {
                const query: MediaSearchQuery = {
                    query: form.query || "mars",
                    mediaType: form.mediaType === "all" ? undefined : form.mediaType,
                    center: form.center || undefined,
                    yearStart: form.yearStart || undefined,
                    yearEnd: form.yearEnd || undefined,
                    page: form.page,
                };

                const response = await fetchMediaSearchClient(query);

                setItems(response.collection.items ?? []);
            } catch (error) {
                setItems([]);
                setError(error instanceof Error ? error.message : t.noResults);
            } finally {
                setLoading(false);
            }
        };

        void loadMedia();
    }, [
        form.query,
        form.mediaType,
        form.center,
        form.yearStart,
        form.yearEnd,
        form.page,
        t.noResults,
    ]);

    const sortedItems = useMemo(
        () => sortMediaItems(items, form.sort),
        [items, form.sort],
    );

    const updateUrl = (nextForm: MediaFormState) => {
        const params = new URLSearchParams();

        if (nextForm.query) params.set("q", nextForm.query);
        if (nextForm.mediaType !== "all") params.set("type", nextForm.mediaType);
        if (nextForm.center) params.set("center", nextForm.center);
        if (nextForm.yearStart) params.set("yearStart", nextForm.yearStart);
        if (nextForm.yearEnd) params.set("yearEnd", nextForm.yearEnd);
        if (nextForm.sort !== "newest") params.set("sort", nextForm.sort);

        params.set("page", String(nextForm.page));

        router.push(`/media?${params.toString()}`);
    };

    return (
        <main className="min-h-screen bg-[var(--body-bg)] text-[var(--color-text)]">
            <div className="mx-auto grid max-w-[1580px] gap-6 px-4 py-8 sm:px-6 lg:px-8">
                <BackButton label={t.back} />

                <MediaHero t={t} />

                <MediaFilters
                    form={form}
                    setForm={setForm}
                    updateUrl={updateUrl}
                    t={t}
                />

                {loading ? (
                    <div className="grid min-h-[360px] place-items-center rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
                        <div className="flex items-center gap-3 text-[var(--color-accent)]">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span className="text-sm font-black uppercase tracking-[0.16em]">
                                {t.loading}
                            </span>
                        </div>
                    </div>
                ) : (
                    <MediaGrid
                        items={sortedItems}
                        error={error}
                        onSelect={setSelectedItem}
                        t={t}
                    />
                )}

                <Pagination
                    currentPage={form.page}
                    totalPages={getTotalPages(items.length, form.page)}
                    isLoading={loading}
                    onPageChange={(page) => {
                        const nextForm = {
                            ...form,
                            page,
                        };

                        setForm(nextForm);
                        updateUrl(nextForm);
                    }}
                />
            </div>

            {selectedItem && (
                <MediaPreviewModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    t={t}
                />
            )}
        </main>
    );
};