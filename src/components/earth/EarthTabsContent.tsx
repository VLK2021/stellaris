import type {EarthOverview} from "@/src/types/earth/earth.types";
import type {EarthLocale, EarthTab} from "@/src/types/earth/earthUi.types";

import {EarthEpicTab} from "./EarthEpicTab";
import {EarthEventsTab} from "./EarthEventsTab";
import {EarthLayersTab} from "./EarthLayersTab";
import {EarthOverviewTab} from "./EarthOverviewTab";

type Props = {
    activeTab: EarthTab;
    data: EarthOverview;
    t: EarthLocale;
};

export const EarthTabsContent = ({activeTab, data, t}: Props) => {
    if (activeTab === "events") {
        return <EarthEventsTab data={data} title={t.latestEvents} t={t} />;
    }

    if (activeTab === "epic") {
        return <EarthEpicTab title={t.latestEarthImages} t={t} />;
    }

    if (activeTab === "layers") {
        return <EarthLayersTab title={t.gibsLayers} t={t} />;
    }

    return <EarthOverviewTab data={data} t={t} />;
};