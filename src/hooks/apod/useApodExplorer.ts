"use client";

import {useMemo, useState} from "react";

import type {
    ApodExplorerApiResponse,
    ApodExplorerState,
    ApodItem,
} from "@/src/types/apod/apod.types";

import {
    asApodArray,
    filterApodItems,
    getTodayDate,
    sortApodItems,
} from "@/src/helpers/apod/apod.helpers";

type State = {
    data: ApodItem | ApodItem[] | null;
    loading: boolean;
    error: string | null;
};

const initialExplorerState: ApodExplorerState = {
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
        useState<ApodExplorerState>(initialExplorerState);

    const [state, setState] = useState<State>({
        data: null,
        loading: false,
        error: null,
    });

    const loadApod = async () => {
        setState((prev) => ({
            ...prev,
            loading: true,
            error: null,
        }));

        try {
            const params = new URLSearchParams();

            if (explorer.mode === "date") {
                params.set("date", explorer.date);
            }

            if (explorer.mode === "range") {
                params.set("start_date", explorer.startDate);
                params.set("end_date", explorer.endDate);
            }

            if (explorer.mode === "random") {
                params.set("count", String(explorer.count));
            }

            params.set("thumbs", "true");

            const response = await fetch(`/api/apod?${params.toString()}`, {
                cache: "no-store",
            });

            if (!response.ok) {
                throw new Error("Failed to load APOD data");
            }

            const json = (await response.json()) as ApodExplorerApiResponse;

            setState({
                data: json.data,
                loading: false,
                error: null,
            });
        } catch (error) {
            setState({
                data: null,
                loading: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown APOD error",
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
        setExplorer,
        state,
        loadApod,
        visibleItems,
        featured,
    };
};