"use client";

import {useEffect, useState} from "react";

import type {AsteroidDetails} from "@/src/types/asteroids/asteroidDetails.types";

type State = {
    data: AsteroidDetails | null;
    loading: boolean;
    error: string | null;
};

type Response = {
    success: boolean;
    data: AsteroidDetails;
    message?: string;
};

export const useAsteroidDetails = (id: string) => {
    const [state, setState] = useState<State>({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const load = async () => {
            try {
                setState({
                    data: null,
                    loading: true,
                    error: null,
                });

                const response = await fetch(`/api/asteroids/${id}`, {
                    cache: "no-store",
                });

                const json = (await response.json()) as Response;

                if (!response.ok || !json.success) {
                    throw new Error(json.message ?? "Failed to load asteroid details.");
                }

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
                            : "Unknown asteroid details error.",
                });
            }
        };

        load();
    }, [id]);

    return state;
};