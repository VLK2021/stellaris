import {getEonetEvents} from "./eonetEarth.service";
import {getEpicImages} from "./epicEarth.service";
import {getGibsLayers} from "./gibsEarth.service";

import type {EarthOverviewResponse} from "@/src/types/earth/earth.types";

export const getEarthOverview = async (): Promise<EarthOverviewResponse> => {
    const [eventsResponse, epicResponse, layersResponse] = await Promise.all([
        getEonetEvents({
            page: 1,
            limit: 8,
        }),
        getEpicImages({
            type: "natural",
        }),
        getGibsLayers(),
    ]);

    const activeEvents = eventsResponse.data.filter(
        (item) => item.status === "open",
    ).length;

    const closedEvents = eventsResponse.data.filter(
        (item) => item.status === "closed",
    ).length;

    return {
        success: true,
        data: {
            events: eventsResponse.data,
            epicImages: epicResponse.data.slice(0, 12),
            layers: layersResponse.data.slice(0, 12),
            stats: {
                activeEvents,
                closedEvents,
                epicImages: epicResponse.data.length,
                layers: layersResponse.data.length,
            },
        },
    };
};