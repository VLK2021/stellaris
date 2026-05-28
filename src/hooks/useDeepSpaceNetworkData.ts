"use client";

import {useEffect, useState} from "react";

import type {
    DeepSpaceNetworkApiResponse,
    DeepSpaceNetworkData,
} from "@/src/types/deepSpaceNetwork";

type State = {
    data: DeepSpaceNetworkData | null;
    loading: boolean;
    error: string | null;
};

export const useDeepSpaceNetworkData = () => {
    const [state, setState] = useState<State>({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        let mounted = true;

        const load = async () => {
            try {
                const response = await fetch("/api/nasa/deep-space-network", {
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error("Failed to load deep space network data");
                }

                const json = (await response.json()) as DeepSpaceNetworkApiResponse;

                if (!mounted) return;

                setState({
                    data: json.data,
                    loading: false,
                    error: null,
                });
            } catch (error) {
                if (!mounted) return;

                setState({
                    data: null,
                    loading: false,
                    error: error instanceof Error ? error.message : "Unknown error",
                });
            }
        };

        load();

        const interval = window.setInterval(load, 1000 * 60 * 20);

        return () => {
            mounted = false;
            window.clearInterval(interval);
        };
    }, []);

    return state;
};