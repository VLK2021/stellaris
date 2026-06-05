import {getEonetEvents} from "./eonetEarth.service";
import {getEpicImages} from "./epicEarth.service";
import {getGibsLayers} from "./gibsEarth.service";

import type {EarthOverviewResponse} from "@/src/types/earth/earth.types";

let lastSuccessfulOverview: EarthOverviewResponse | null = null;

export const getEarthOverview = async (): Promise<EarthOverviewResponse> => {
    const [eventsResult, epicResult, layersResult] = await Promise.allSettled([
        getEonetEvents({
            page: 1,
            limit: 8,
        }),
        getEpicImages({
            type: "natural",
        }),
        getGibsLayers({
            page: 1,
            limit: 12,
        }),
    ]);

    const events =
        eventsResult.status === "fulfilled"
            ? eventsResult.value.data
            : [];

    const epicImages =
        epicResult.status === "fulfilled"
            ? epicResult.value.data.slice(0, 12)
            : [];

    const layers =
        layersResult.status === "fulfilled"
            ? layersResult.value.data.slice(0, 12)
            : [];

    const activeEvents = events.filter(
        (item) => item.status === "open",
    ).length;

    const closedEvents = events.filter(
        (item) => item.status === "closed",
    ).length;

    const overview: EarthOverviewResponse = {
        success: true,
        data: {
            events,
            epicImages,
            layers,
            stats: {
                activeEvents,
                closedEvents,
                epicImages: epicImages.length,
                layers: layers.length,
            },
        },
    };

    if (
        events.length > 0 ||
        epicImages.length > 0 ||
        layers.length > 0
    ) {
        lastSuccessfulOverview = overview;
    }

    if (
        events.length === 0 &&
        lastSuccessfulOverview
    ) {
        return lastSuccessfulOverview;
    }

    return overview;
};