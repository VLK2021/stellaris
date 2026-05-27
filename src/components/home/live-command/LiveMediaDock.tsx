"use client";

import type {
    NasaLiveDonki,
    NasaLiveEpic,
    NasaLiveMediaItem,
} from "@/src/types/nasaLive";

import {EpicEarthModule} from "./EpicEarthModule";
import {MarsArchiveModule} from "./MarsArchiveModule";
import {DonkiSolarModule} from "./DonkiSolarModule";

type Props = {
    locale: {
        dock: {
            earth: string;
            earthFallback: string;
            marsFallbackTitle: string;
            marsFallbackText: string;
            nasaLibrary: string;
            openSource: string;
            donkiStream: string;
            solarFlares: string;
            geomagneticStorms: string;
            latestEvent: string;
            earthSignal?: string;
            marsSignal?: string;
            solarSignal?: string;
        };
    };
    epic: NasaLiveEpic | null;
    marsMedia: NasaLiveMediaItem | null;
    donki: NasaLiveDonki | null;
};

export const LiveMediaDock = ({locale, epic, marsMedia, donki}: Props) => {
    const t = locale.dock;

    return (
        <section className="relative mt-12 min-h-[520px] overflow-hidden rounded-[2.6rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_44%,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_68%_35%,rgba(168,85,247,0.1),transparent_28%),radial-gradient(circle_at_90%_58%,rgba(251,146,60,0.12),transparent_26%)]" />

            <div className="relative z-10 grid min-h-[520px] gap-5 lg:grid-cols-[1.08fr_0.72fr_0.86fr]">
                <EpicEarthModule locale={t} epic={epic} />
                <MarsArchiveModule locale={t} marsMedia={marsMedia} />
                <DonkiSolarModule locale={t} donki={donki} />
            </div>
        </section>
    );
};