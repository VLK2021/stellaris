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

type CachedSpaceWeatherState = Omit<SpaceWeatherApiState, "loading" | "error">;

const CACHE_TTL_MS = 1000 * 60 * 5;

const spaceWeatherCache = new Map<
    string,
    {
        expiresAt: number;
        state: CachedSpaceWeatherState;
    }
>();

export const initialSpaceWeatherState: SpaceWeatherExplorerState = {
    tab: "overview",
    startDate: getDateMinusDays(30),
    endDate: getTodayDate(),
    type: "all",
    page: 1,
    limit: 24,
};

const getCacheKey = (values: SpaceWeatherExplorerState) => {
    return [
        values.tab,
        values.startDate,
        values.endDate,
        values.type,
        values.page,
        values.limit,
    ].join("|");
};

const getCachedState = (
    values: SpaceWeatherExplorerState,
): CachedSpaceWeatherState | null => {
    const key = getCacheKey(values);
    const cached = spaceWeatherCache.get(key);

    if (!cached) return null;

    if (cached.expiresAt < Date.now()) {
        spaceWeatherCache.delete(key);
        return null;
    }

    return cached.state;
};

const setCachedState = (
    values: SpaceWeatherExplorerState,
    state: CachedSpaceWeatherState,
) => {
    spaceWeatherCache.set(getCacheKey(values), {
        expiresAt: Date.now() + CACHE_TTL_MS,
        state,
    });
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

        const cachedState = getCachedState(nextValues);

        if (cachedState) {
            setState({
                ...cachedState,
                loading: false,
                error: null,
            });

            return;
        }

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
                );

                const json = (await response.json()) as OverviewResponse;

                if (!response.ok || !json.success) {
                    throw new Error(
                        json.message ?? "Failed to load space weather overview.",
                    );
                }

                const nextState: CachedSpaceWeatherState = {
                    overview: json.data,
                    events: json.data.latestEvents,
                    notifications: json.data.latestNotifications,
                    stats: json.data.stats,
                    pagination: null,
                };

                setCachedState(nextValues, nextState);

                setState({
                    ...nextState,
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
                );

                const json = (await response.json()) as SpaceWeatherEventsResponse & {
                    message?: string;
                };

                if (!response.ok || !json.success) {
                    throw new Error(
                        json.message ?? "Failed to load space weather events.",
                    );
                }

                const nextState: CachedSpaceWeatherState = {
                    overview: null,
                    events: json.data,
                    notifications: [],
                    stats: json.stats,
                    pagination: json.pagination,
                };

                setCachedState(nextValues, nextState);

                setState({
                    ...nextState,
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
            );

            const json = (await response.json()) as SpaceWeatherNotificationsResponse & {
                message?: string;
            };

            if (!response.ok || !json.success) {
                throw new Error(json.message ?? "Failed to load notifications.");
            }

            const nextState: CachedSpaceWeatherState = {
                overview: null,
                events: [],
                notifications: json.data,
                stats: null,
                pagination: json.pagination,
            };

            setCachedState(nextValues, nextState);

            setState({
                ...nextState,
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