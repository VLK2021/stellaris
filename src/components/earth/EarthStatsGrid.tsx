import {Activity, Camera, Database, RadioTower} from "lucide-react";

import type {EarthOverview} from "@/src/types/earth/earth.types";

import {EarthStatCard} from "./EarthStatCard";

type Props = {
    data: EarthOverview;
    t: {
        activeEvents: string;
        closedEvents: string;
        epicImages: string;
        satelliteLayers: string;
    };
};

export const EarthStatsGrid = ({data, t}: Props) => {
    return (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <EarthStatCard icon={Activity} label={t.activeEvents} value={data.stats.activeEvents} />
            <EarthStatCard icon={RadioTower} label={t.closedEvents} value={data.stats.closedEvents} />
            <EarthStatCard icon={Camera} label={t.epicImages} value={data.stats.epicImages} />
            <EarthStatCard icon={Database} label={t.satelliteLayers} value={data.stats.layers} />
        </section>
    );
};