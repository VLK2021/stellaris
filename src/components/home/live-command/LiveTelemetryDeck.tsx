"use client";

import type {
    IssPosition,
    NasaLiveDonki,
    NasaLiveNeo,
} from "@/src/types/nasaLive";

import {NeoApproachModule} from "./NeoApproachModule";

type Props = {
    locale: {
        telemetry: {
            neo: string;
            solar: string;
            velocity: string;
            iss: string;
            objects: string;
            syncing: string;
            asteroidFeed: string;
            solarFeed: string;
            loadingTelemetry: string;
            kmFromEarth: string;
            kmhRelative: string;
            flares: string;
            storms: string;
            approach?: string;
            radarText?: string;
            hazard?: string;
            clear?: string;
            potential?: string;
        };
    };
    neo: NasaLiveNeo | null;
    donki: NasaLiveDonki | null;
    iss: IssPosition | null;
};

export const LiveTelemetryDeck = ({locale, neo}: Props) => {
    const t = locale.telemetry;

    return (
        <div className="grid gap-5">
            <NeoApproachModule
                neo={neo}
                locale={t}
            />
        </div>
    );
};