"use client";

import {useEffect, useState} from "react";

import type {
    EarthLayer,
    EarthLayersResponse,
    EarthPaginationMeta,
} from "@/src/types/earth/earth.types";

type State = {
    data: EarthLayer[];
    pagination: EarthPaginationMeta | null;
    initialLoading: boolean;
    fetching: boolean;
    error: string | null;
};

const layersCache = new Map<string, {
    data: EarthLayer[];
    pagination: EarthPaginationMeta;
}>();

export const useEarthLayers = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState<"title" | "id" | "format">("title");
    const [order, setOrder] = useState<"asc" | "desc">("asc");

    const [state, setState] = useState<State>({
        data: [],
        pagination: null,
        initialLoading: true,
        fetching: false,
        error: null,
    });

    useEffect(() => {
        const cacheKey = `${page}-${search}-${sortBy}-${order}`;
        const cached = layersCache.get(cacheKey);

        if (cached) {
            setState({
                data: cached.data,
                pagination: cached.pagination,
                initialLoading: false,
                fetching: false,
                error: null,
            });

            return;
        }

        const controller = new AbortController();

        const loadLayers = async () => {
            setState((prev) => ({
                ...prev,
                initialLoading: prev.data.length === 0,
                fetching: prev.data.length > 0,
                error: null,
            }));

            try {
                const params = new URLSearchParams({
                    page: String(page),
                    limit: "12",
                    search,
                    sortBy,
                    order,
                });

                const response = await fetch(`/api/earth/layers?${params.toString()}`, {
                    signal: controller.signal,
                });

                const json = (await response.json()) as EarthLayersResponse & {
                    message?: string;
                };

                if (!response.ok || !json.success) {
                    throw new Error(json.message ?? "Failed to load Earth layers.");
                }

                layersCache.set(cacheKey, {
                    data: json.data,
                    pagination: json.pagination,
                });

                setState({
                    data: json.data,
                    pagination: json.pagination,
                    initialLoading: false,
                    fetching: false,
                    error: null,
                });
            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") {
                    return;
                }

                setState((prev) => ({
                    ...prev,
                    initialLoading: false,
                    fetching: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : "Unknown Earth layers error.",
                }));
            }
        };

        loadLayers();

        return () => controller.abort();
    }, [page, search, sortBy, order]);

    return {
        ...state,
        page,
        setPage,
        search,
        setSearch,
        sortBy,
        setSortBy,
        order,
        setOrder,
    };
};