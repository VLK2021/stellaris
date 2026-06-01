"use client";

import {useEffect, useState} from "react";

import type {
    EarthOverview,
    EarthOverviewResponse,
} from "@/src/types/earth/earth.types";

type State = {
    data: EarthOverview | null;
    loading: boolean;
    error: string | null;
};

export const useEarthExplorer = () => {
    const [state, setState] = useState<State>({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const controller = new AbortController();

        const loadEarthOverview = async () => {
            setState({
                data: null,
                loading: true,
                error: null,
            });

            try {
                const response = await fetch("/api/earth/overview", {
                    signal: controller.signal,
                });

                const json = (await response.json()) as EarthOverviewResponse & {
                    message?: string;
                };

                if (!response.ok || !json.success) {
                    throw new Error(json.message ?? "Failed to load Earth data.");
                }

                setState({
                    data: json.data,
                    loading: false,
                    error: null,
                });
            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") {
                    return;
                }

                setState({
                    data: null,
                    loading: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : "Unknown Earth data error.",
                });
            }
        };

        loadEarthOverview();

        return () => {
            controller.abort();
        };
    }, []);

    return state;
};