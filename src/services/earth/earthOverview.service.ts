import {
    GIBS_SAMPLE_LAYERS,
} from "@/src/constants/earth/earth.constants";

import {
    getEonetEvents,
} from "./eonetEarth.service";

import {
    getEpicImages,
} from "./epicEarth.service";

import type {
    EarthOverviewResponse,
} from "@/src/types/earth/earth.types";

export const getEarthOverview =
    async (): Promise<EarthOverviewResponse> => {
        const [eventsResponse, epicResponse] =
            await Promise.all([
                getEonetEvents({
                    page: 1,
                    limit: 8,
                }),
                getEpicImages({
                    type: "natural",
                }),
            ]);

        const activeEvents =
            eventsResponse.data.filter(
                (item) => item.status === "open",
            ).length;

        const closedEvents =
            eventsResponse.data.filter(
                (item) => item.status === "closed",
            ).length;

        return {
            success: true,
            data: {
                events: eventsResponse.data,
                epicImages: epicResponse.data.slice(0, 12),
                layers: [...GIBS_SAMPLE_LAYERS],
                stats: {
                    activeEvents,
                    closedEvents,
                    epicImages: epicResponse.data.length,
                    layers: GIBS_SAMPLE_LAYERS.length,
                },
            },
        };
    };