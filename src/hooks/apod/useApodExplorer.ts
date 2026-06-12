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

    if (
        normalized.includes("aborted") ||
        normalized.includes("timeout")
    ) {
        return "NASA API відповідає занадто довго. Спробуй менший діапазон дат.";
    }

    if (normalized.includes("maximum period")) {
        return "Максимальний період для APOD — 90 днів.";
    }

    if (normalized.includes("invalid apod date")) {
        return "Некоректна дата APOD.";
    }

    if (
        normalized.includes("503") ||
        normalized.includes("504")
    ) {
        return "NASA сервер тимчасово недоступний. Спробуй ще раз через кілька секунд.";
    }

    return message;
};

export const initialApodExplorerState: ApodExplorerState = {
    mode: "today",
    date: getTodayDate(),
    startDate: "",
    endDate: "",
    count: 6,
    sort: "newest",
    mediaFilter: "all",
};

export const useApodExplorer = () => {
    const [explorer, setExplorer] =
        useState<ApodExplorerState>(
            initialApodExplorerState,
        );

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
            const params =
                new URLSearchParams();

            if (
                values.mode === "date" &&
                values.date
            ) {
                params.set(
                    "date",
                    values.date,
                );
            }

            if (
                values.mode === "range" &&
                values.startDate &&
                values.endDate
            ) {
                params.set(
                    "start_date",
                    values.startDate,
                );

                params.set(
                    "end_date",
                    values.endDate,
                );

                params.set(
                    "page",
                    String(page),
                );

                params.set(
                    "limit",
                    "24",
                );
            }

            if (
                values.mode === "random"
            ) {
                params.set(
                    "count",
                    String(values.count),
                );
            }

            params.set(
                "thumbs",
                "true",
            );

            const response =
                await fetch(
                    `/api/apod?${params.toString()}`,
                );

            const json =
                (await response.json()) as
                    ApodExplorerApiResponseWithPagination & {
                    message?: string;
                };

            if (
                !response.ok ||
                !json.success
            ) {
                throw new Error(
                    json.message ??
                    "Failed to load APOD",
                );
            }

            setState({
                data: json.data,
                pagination:
                    json.pagination ??
                    null,
                loading: false,
                error: null,
            });
        } catch (error) {
            const message =
                error instanceof Error
                    ? getApodErrorMessage(
                        error.message,
                    )
                    : "Unknown APOD error";

            setState({
                data: null,
                pagination: null,
                loading: false,
                error: message,
            });
        }
    };

    const visibleItems =
        useMemo(() => {
            const items =
                asApodArray(
                    state.data,
                );

            return sortApodItems(
                filterApodItems(
                    items,
                    explorer.mediaFilter,
                ),
                explorer.sort,
            );
        }, [
            state.data,
            explorer.mediaFilter,
            explorer.sort,
        ]);

    const featured =
        visibleItems[0] ?? null;

    return {
        explorer,
        state,
        loadApod,
        visibleItems,
        featured,
    };
};