"use client";

import {useEffect, useState} from "react";
import type {NasaLiveApiResponse, NasaLiveData} from "@/src/types/nasaLive";

type State = {
    data: NasaLiveData | null;
    isLoading: boolean;
    error: string | null;
};

export const useNasaLiveData = () => {
    const [state, setState] = useState<State>({
        data: null,
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        const controller = new AbortController();

        const load = async () => {
            try {
                const response = await fetch("/api/nasa/live", {
                    signal: controller.signal,
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error("Failed to load NASA live data");
                }

                const result = (await response.json()) as NasaLiveApiResponse;

                setState({
                    data: result.data,
                    isLoading: false,
                    error: null,
                });
            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") return;

                setState({
                    data: null,
                    isLoading: false,
                    error: error instanceof Error ? error.message : "Unknown error",
                });
            }
        };

        load();

        return () => controller.abort();
    }, []);

    return state;
};