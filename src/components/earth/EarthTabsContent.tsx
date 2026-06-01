import type {EarthOverview} from "@/src/types/earth/earth.types";
import type {EarthTab} from "@/src/types/earth/earthUi.types";

import {EarthEpicTab} from "./EarthEpicTab";
import {EarthEventsTab} from "./EarthEventsTab";
import {EarthLayersTab} from "./EarthLayersTab";
import {EarthOverviewTab} from "./EarthOverviewTab";

type Props = {
    activeTab: EarthTab;
    data: EarthOverview;
    t: {
        latestEvents: string;
        latestEarthImages: string;
        gibsLayers: string;
        category: string;
        coordinates: string;
    };
};

export const EarthTabsContent = ({activeTab, data, t}: Props) => {
    if (activeTab === "events") {
        return (
            <EarthEventsTab
                data={data}
                title={t.latestEvents}
            />
        );
    }

    if (activeTab === "epic") {
        return (
            <EarthEpicTab
                data={data}
                title={t.latestEarthImages}
            />
        );
    }

    if (activeTab === "layers") {
        return (
            <EarthLayersTab
                data={data}
                title={t.gibsLayers}
            />
        );
    }

    return (
        <EarthOverviewTab
            data={data}
            t={{
                latestEvents: t.latestEvents,
                latestEarthImages: t.latestEarthImages,
                category: t.category,
                coordinates: t.coordinates,
            }}
        />
    );
};