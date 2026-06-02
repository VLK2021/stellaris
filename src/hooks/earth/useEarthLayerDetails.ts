"use client";

import {useEffect, useState} from "react";

import type {
    EarthLayerDetails,
    EarthLayerDetailsResponse,
} from "@/src/types/earth/earth.types";

type State = {
    data: EarthLayerDetails | null;
    loading: boolean;
    error: string | null;
};

const layerDetailsCache = new Map<string, EarthLayerDetails>();

export const useEarthLayerDetails = (layerId: string) => {
    const [state, setState] = useState<State>({
        data: layerDetailsCache.get(layerId) ?? null,
        loading: !layerDetailsCache.has(layerId),
        error: null,
    });

    useEffect(() => {
        const cached = layerDetailsCache.get(layerId);

        if (cached) {
            setState({
                data: cached,
                loading: false,
                error: null,
            });

            return;
        }

        const controller = new AbortController();

        const loadLayerDetails = async () => {
            setState({
                data: null,
                loading: true,
                error: null,
            });

            try {
                const response = await fetch(
                    `/api/earth/layers/${encodeURIComponent(layerId)}`,
                    {
                        signal: controller.signal,
                    },
                );

                const json = (await response.json()) as EarthLayerDetailsResponse & {
                    message?: string;
                };

                if (!response.ok || !json.success) {
                    throw new Error(json.message ?? "Failed to load NASA GIBS layer.");
                }

                layerDetailsCache.set(layerId, json.data);

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
                            : "Unknown NASA GIBS layer details error.",
                });
            }
        };

        loadLayerDetails();

        return () => controller.abort();
    }, [layerId]);

    return state;
};