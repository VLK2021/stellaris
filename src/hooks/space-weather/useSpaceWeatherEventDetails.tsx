"use client";

import {useEffect, useState} from "react";

import type {
    SpaceWeatherEventDetails,
    SpaceWeatherEventDetailsResponse,
} from "@/src/types/space-weather/spaceWeatherEventDetails.types";

import type {SpaceWeatherEvent} from "@/src/types/space-weather/spaceWeather.types";

type State = {
    data: SpaceWeatherEventDetails | null;
    loading: boolean;
    error: string | null;
};

export const useSpaceWeatherEventDetails = ({
                                                eventId,
                                                type,
                                                startDate,
                                                endDate,
                                            }: {
    eventId: string;
    type?: SpaceWeatherEvent["type"];
    startDate?: string;
    endDate?: string;
}) => {
    const [state, setState] = useState<State>({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const loadDetails = async () => {
            if (!eventId || !type || !startDate || !endDate) {
                setState({
                    data: null,
                    loading: false,
                    error: "Missing event details query parameters.",
                });

                return;
            }

            setState({
                data: null,
                loading: true,
                error: null,
            });

            try {
                const params = new URLSearchParams({
                    eventId,
                    type,
                    startDate,
                    endDate,
                });

                const response = await fetch(
                    `/api/space-weather/event?${params.toString()}`,
                    {cache: "no-store"},
                );

                const json = (await response.json()) as SpaceWeatherEventDetailsResponse & {
                    message?: string;
                };

                if (!response.ok || !json.success) {
                    throw new Error(json.message ?? "Failed to load event details.");
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
                            : "Unknown event details error.",
                });
            }
        };

        loadDetails();
    }, [eventId, type, startDate, endDate]);

    return state;
};