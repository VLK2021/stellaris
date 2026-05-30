"use client";

import {useMemo, useState} from "react";

import {
    getDateMinusDays,
    getTodayDate,
} from "@/src/helpers/space-weather/spaceWeatherDate.helpers";

import type {
    SpaceWeatherApiState,
    SpaceWeatherExplorerState,
    SpaceWeatherOverviewData,
} from "@/src/types/space-weather/spaceWeatherUi.types";

import type {
    SpaceWeatherEventsResponse,
} from "@/src/types/space-weather/spaceWeather.types";

import type {
    SpaceWeatherNotificationsResponse,
} from "@/src/types/space-weather/spaceWeatherNotification.types";

type OverviewResponse = {
    success: boolean;
    data: SpaceWeatherOverviewData;
    message?: string;
};

export const initialSpaceWeatherState: SpaceWeatherExplorerState = {
    tab: "overview",
    startDate: getDateMinusDays(30),
    endDate: getTodayDate(),
    type: "all",
    page: 1,
    limit: 24,
};

const getErrorMessage = (message: string) => {
    const value = message.toLowerCase();

    if (value.includes("required")) {
        return "Заповни початкову та кінцеву дату.";
    }

    if (value.includes("earlier")) {
        return "Кінцева дата не може бути раніше початкової.";
    }

    return message;
};

export const useSpaceWeatherExplorer = () => {
    const [explorer, setExplorer] =
        useState<SpaceWeatherExplorerState>(initialSpaceWeatherState);

    const [state, setState] = useState<SpaceWeatherApiState>({
        overview: null,
        events: [],
        notifications: [],
        stats: null,
        pagination: null,
        loading: false,
        error: null,
    });

    const loadSpaceWeather = async (
        values: SpaceWeatherExplorerState = explorer,
        page = 1,
    ) => {
        const nextValues = {
            ...values,
            page,
        };

        setExplorer(nextValues);

        setState((prev) => ({
            ...prev,
            loading: true,
            error: null,
        }));

        try {
            const params = new URLSearchParams({
                startDate: nextValues.startDate,
                endDate: nextValues.endDate,
            });

            if (nextValues.tab === "overview") {
                const response = await fetch(
                    `/api/space-weather/overview?${params.toString()}`,
                    {cache: "no-store"},
                );

                const json = (await response.json()) as OverviewResponse;

                if (!response.ok || !json.success) {
                    throw new Error(
                        json.message ?? "Failed to load space weather overview.",
                    );
                }

                setState({
                    overview: json.data,
                    events: json.data.latestEvents,
                    notifications: json.data.latestNotifications,
                    stats: json.data.stats,
                    pagination: null,
                    loading: false,
                    error: null,
                });

                return;
            }

            if (nextValues.tab === "events") {
                params.set("type", nextValues.type);
                params.set("page", String(page));
                params.set("limit", String(nextValues.limit));

                const response = await fetch(
                    `/api/space-weather/events?${params.toString()}`,
                    {cache: "no-store"},
                );

                const json = (await response.json()) as SpaceWeatherEventsResponse & {
                    message?: string;
                };

                if (!response.ok || !json.success) {
                    throw new Error(
                        json.message ?? "Failed to load space weather events.",
                    );
                }

                setState({
                    overview: null,
                    events: json.data,
                    notifications: [],
                    stats: json.stats,
                    pagination: json.pagination,
                    loading: false,
                    error: null,
                });

                return;
            }

            params.set("type", "all");
            params.set("page", String(page));
            params.set("limit", String(nextValues.limit));

            const response = await fetch(
                `/api/space-weather/notifications?${params.toString()}`,
                {cache: "no-store"},
            );

            const json = (await response.json()) as SpaceWeatherNotificationsResponse & {
                message?: string;
            };

            if (!response.ok || !json.success) {
                throw new Error(json.message ?? "Failed to load notifications.");
            }

            setState({
                overview: null,
                events: [],
                notifications: json.data,
                stats: null,
                pagination: json.pagination,
                loading: false,
                error: null,
            });
        } catch (error) {
            setState({
                overview: null,
                events: [],
                notifications: [],
                stats: null,
                pagination: null,
                loading: false,
                error:
                    error instanceof Error
                        ? getErrorMessage(error.message)
                        : "Unknown space weather error.",
            });
        }
    };

    const hasResults = useMemo(() => {
        return Boolean(
            state.events.length ||
            state.notifications.length ||
            state.overview,
        );
    }, [state.events.length, state.notifications.length, state.overview]);

    return {
        explorer,
        state,
        hasResults,
        loadSpaceWeather,
    };
};