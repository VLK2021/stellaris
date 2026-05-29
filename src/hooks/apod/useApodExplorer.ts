"use client";

import {useMemo, useState} from "react";

import type {
    ApodExplorerApiResponseWithPagination,
    ApodExplorerState,
    ApodItem,
    ApodPaginationMeta,
} from "@/src/types/apod/apod.types";

import {
    asApodArray,
    filterApodItems,
    getTodayDate,
    sortApodItems,
} from "@/src/helpers/apod/apod.helpers";

type State = {
    data: ApodItem | ApodItem[] | null;
    pagination: ApodPaginationMeta | null;
    loading: boolean;
    error: string | null;
};

const getApodErrorMessage = (message: string) => {
    const normalized = message.toLowerCase();

    if (normalized.includes("aborted")) {
        return "NASA API занадто довго відповідає. Спробуй менший діапазон дат або повтори запит.";
    }

    if (normalized.includes("maximum period")) {
        return "Максимальний період для APOD — 365 днів.";
    }

    if (normalized.includes("invalid apod date")) {
        return "Некоректна дата. Для APOD можна вибирати дати від 1995-06-16 до сьогодні.";
    }

    return message;
};

export const initialApodExplorerState: ApodExplorerState = {
    mode: "today",
    date: getTodayDate(),
    startDate: getTodayDate(),
    endDate: getTodayDate(),
    count: 6,
    sort: "newest",
    mediaFilter: "all",
};

export const useApodExplorer = () => {
    const [explorer, setExplorer] =
        useState<ApodExplorerState>(initialApodExplorerState);

    const [state, setState] = useState<State>({
        data: null,
        pagination: null,
        loading: false,
        error: null,
    });

    const loadApod = async (
        values: ApodExplorerState = explorer,
        page = 1,
    ) => {
        setExplorer(values);

        setState((prev) => ({
            ...prev,
            loading: true,
            error: null,
        }));

        try {
            const params = new URLSearchParams();

            if (values.mode === "date") {
                params.set("date", values.date);
            }

            if (values.mode === "range") {
                params.set("start_date", values.startDate);
                params.set("end_date", values.endDate);
                params.set("page", String(page));
                params.set("limit", "24");
            }

            if (values.mode === "random") {
                params.set("count", String(values.count));
            }

            params.set("thumbs", "true");

            const response = await fetch(`/api/apod?${params.toString()}`, {
                cache: "no-store",
            });

            const json =
                (await response.json()) as ApodExplorerApiResponseWithPagination & {
                    message?: string;
                };

            if (!response.ok || !json.success) {
                throw new Error(json.message ?? "Failed to load APOD data");
            }

            setState({
                data: json.data,
                pagination: json.pagination ?? null,
                loading: false,
                error: null,
            });
        } catch (error) {
            const message =
                error instanceof Error
                    ? getApodErrorMessage(error.message)
                    : "Невідома помилка APOD";

            setState({
                data: null,
                pagination: null,
                loading: false,
                error: message,
            });
        }
    };

    const visibleItems = useMemo(() => {
        const items = asApodArray(state.data);

        return sortApodItems(
            filterApodItems(items, explorer.mediaFilter),
            explorer.sort,
        );
    }, [state.data, explorer.mediaFilter, explorer.sort]);

    const featured = visibleItems[0] ?? null;

    return {
        explorer,
        state,
        loadApod,
        visibleItems,
        featured,
    };
};