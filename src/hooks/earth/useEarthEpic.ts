"use client";

import {useEffect, useState} from "react";

import type {
    EpicImage,
    EpicImageType,
    EpicResponse,
    EarthPaginationMeta,
} from "@/src/types/earth/earth.types";

type State = {
    data: EpicImage[];
    pagination: EarthPaginationMeta | null;
    initialLoading: boolean;
    fetching: boolean;
    error: string | null;
};

const epicCache = new Map<string, {
    data: EpicImage[];
    pagination: EarthPaginationMeta;
}>();

export const useEarthEpic = () => {
    const [page, setPage] = useState(1);
    const [type, setType] = useState<EpicImageType>("natural");
    const [date, setDate] = useState("");

    const [state, setState] = useState<State>({
        data: [],
        pagination: null,
        initialLoading: true,
        fetching: false,
        error: null,
    });

    useEffect(() => {
        const cacheKey = `${type}-${date}-${page}`;
        const cached = epicCache.get(cacheKey);

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

        const loadEpic = async () => {
            setState((prev) => ({
                ...prev,
                initialLoading: prev.data.length === 0,
                fetching: prev.data.length > 0,
                error: null,
            }));

            try {
                const params = new URLSearchParams({
                    type,
                    page: String(page),
                    limit: "12",
                });

                if (date) params.set("date", date);

                const response = await fetch(`/api/earth/epic?${params.toString()}`, {
                    signal: controller.signal,
                });

                const json = (await response.json()) as EpicResponse & {
                    message?: string;
                };

                if (!response.ok || !json.success) {
                    throw new Error(json.message ?? "Failed to load EPIC images.");
                }

                epicCache.set(cacheKey, {
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
                if (error instanceof DOMException && error.name === "AbortError") return;

                setState((prev) => ({
                    ...prev,
                    initialLoading: false,
                    fetching: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : "Unknown EPIC error.",
                }));
            }
        };

        loadEpic();

        return () => controller.abort();
    }, [type, date, page]);

    return {
        ...state,
        page,
        setPage,
        type,
        setType,
        date,
        setDate,
    };
};