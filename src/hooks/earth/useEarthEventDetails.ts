"use client";

import {useEffect, useState} from "react";

import type {
    EarthEventEnrichment,
    EarthEventEnrichmentResponse,
} from "@/src/types/earth/earthEnrichment.types";

type State = {
    data: EarthEventEnrichment | null;
    loading: boolean;
    error: string | null;
};

const detailsCache = new Map<string, EarthEventEnrichment>();

const getInitialState = (eventId: string): State => {
    const cached = detailsCache.get(eventId);

    return {
        data: cached ?? null,
        loading: !cached,
        error: null,
    };
};

export const useEarthEventDetails = (eventId: string) => {
    const [state, setState] = useState<State>(() => getInitialState(eventId));

    useEffect(() => {
        const cached = detailsCache.get(eventId);

        if (cached) {
            queueMicrotask(() => {
                setState({
                    data: cached,
                    loading: false,
                    error: null,
                });
            });

            return;
        }

        const controller = new AbortController();

        const loadDetails = async () => {
            setState({
                data: null,
                loading: true,
                error: null,
            });

            try {
                const response = await fetch(
                    `/api/earth/events/${encodeURIComponent(eventId)}`,
                    {
                        signal: controller.signal,
                    },
                );

                const json = (await response.json()) as EarthEventEnrichmentResponse & {
                    message?: string;
                };

                if (!response.ok || !json.success) {
                    throw new Error(json.message ?? "Failed to load Earth event details.");
                }

                detailsCache.set(eventId, json.data);

                setState({
                    data: json.data,
                    loading: false,
                    error: null,
                });
            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") return;

                setState({
                    data: null,
                    loading: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : "Unknown Earth event details error.",
                });
            }
        };

        void loadDetails();

        return () => controller.abort();
    }, [eventId]);

    return state;
};