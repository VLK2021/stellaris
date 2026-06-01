"use client";

import {useEffect, useState} from "react";

import type {
    EarthEvent,
    EarthEventDetailsResponse,
} from "@/src/types/earth/earth.types";

type State = {
    data: EarthEvent | null;
    loading: boolean;
    error: string | null;
};

const cache = new Map<string, EarthEvent>();

export const useEarthEventDetails = (eventId: string) => {
    const [state, setState] = useState<State>({
        data: cache.get(eventId) ?? null,
        loading: !cache.has(eventId),
        error: null,
    });

    useEffect(() => {
        if (cache.has(eventId)) return;

        const controller = new AbortController();

        const load = async () => {
            try {
                const response = await fetch(`/api/earth/events/${encodeURIComponent(eventId)}`, {
                    signal: controller.signal,
                });

                const json = (await response.json()) as EarthEventDetailsResponse & {
                    message?: string;
                };

                if (!response.ok || !json.success) {
                    throw new Error(json.message ?? "Failed to load event details.");
                }

                cache.set(eventId, json.data);

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
                    error: error instanceof Error ? error.message : "Unknown error.",
                });
            }
        };

        load();

        return () => controller.abort();
    }, [eventId]);

    return state;
};