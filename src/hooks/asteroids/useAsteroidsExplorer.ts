"use client";

import {useMemo, useState} from "react";

import type {AsteroidsFeedStats, AsteroidItem} from "@/src/types/asteroids/asteroids.types";
import type {
    AsteroidsExplorerApiState,
    AsteroidsExplorerState,
} from "@/src/types/asteroids/asteroidsUi.types";

import {
    filterAsteroidsByHazard,
    getDatePlusDays,
    getTodayDate,
    sortAsteroids,
} from "@/src/helpers/asteroids/asteroidsUi.helpers";

import type {PaginationMeta} from "@/src/types/common/pagination.types";

type FeedResponse = {
    success: boolean;
    data: AsteroidItem[];
    stats: AsteroidsFeedStats;
    message?: string;
};

type BrowseResponse = {
    success: boolean;
    data: AsteroidItem[];
    pagination: PaginationMeta;
    message?: string;
};

type LookupResponse = {
    success: boolean;
    data: AsteroidItem;
    message?: string;
};

export const initialAsteroidsExplorerState: AsteroidsExplorerState = {
    mode: "feed",
    startDate: getTodayDate(),
    endDate: getDatePlusDays(7),
    asteroidId: "",
    page: 1,
    limit: 20,
    sort: "closest",
    hazardFilter: "all",
};

const normalizeErrorMessage = (message: string) => {
    const value = message.toLowerCase();

    if (value.includes("maximum 7 days")) {
        return "NASA NeoWs Feed дозволяє максимум 7 днів за один запит.";
    }

    if (value.includes("required")) {
        return "Заповни обовʼязкові поля для запиту.";
    }

    return message;
};

export const useAsteroidsExplorer = () => {
    const [explorer, setExplorer] =
        useState<AsteroidsExplorerState>(initialAsteroidsExplorerState);

    const [state, setState] = useState<AsteroidsExplorerApiState>({
        items: [],
        selected: null,
        stats: null,
        pagination: null,
        loading: false,
        error: null,
    });

    const loadAsteroids = async (
        values: AsteroidsExplorerState = explorer,
        page = 1,
    ) => {
        setExplorer({...values, page});

        setState((prev) => ({
            ...prev,
            loading: true,
            error: null,
        }));

        try {
            if (values.mode === "feed") {
                const params = new URLSearchParams({
                    start_date: values.startDate,
                    end_date: values.endDate,
                });

                const response = await fetch(`/api/asteroids/feed?${params.toString()}`);
                const json = (await response.json()) as FeedResponse;

                if (!response.ok || !json.success) {
                    throw new Error(json.message ?? "Failed to load asteroid feed.");
                }

                setState({
                    items: json.data,
                    selected: null,
                    stats: json.stats,
                    pagination: null,
                    loading: false,
                    error: null,
                });

                return;
            }

            if (values.mode === "browse") {
                const params = new URLSearchParams({
                    page: String(page),
                    limit: String(values.limit),
                });

                const response = await fetch(`/api/asteroids/browse?${params.toString()}`);
                const json = (await response.json()) as BrowseResponse;

                if (!response.ok || !json.success) {
                    throw new Error(json.message ?? "Failed to browse asteroids.");
                }

                setState({
                    items: json.data,
                    selected: null,
                    stats: null,
                    pagination: json.pagination,
                    loading: false,
                    error: null,
                });

                return;
            }

            const response = await fetch(`/api/asteroids/${values.asteroidId}`);
            const json = (await response.json()) as LookupResponse;

            if (!response.ok || !json.success) {
                throw new Error(json.message ?? "Failed to load asteroid.");
            }

            setState({
                items: [json.data],
                selected: json.data,
                stats: null,
                pagination: null,
                loading: false,
                error: null,
            });
        } catch (error) {
            const message =
                error instanceof Error
                    ? normalizeErrorMessage(error.message)
                    : "Unknown asteroid error.";

            setState({
                items: [],
                selected: null,
                stats: null,
                pagination: null,
                loading: false,
                error: message,
            });
        }
    };

    const visibleItems = useMemo(() => {
        return sortAsteroids(
            filterAsteroidsByHazard(state.items, explorer.hazardFilter),
            explorer.sort,
        );
    }, [state.items, explorer.hazardFilter, explorer.sort]);

    return {
        explorer,
        state,
        visibleItems,
        loadAsteroids,
    };
};