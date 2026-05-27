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
        <section className="relative mt-14 min-h-[560px] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_45%,rgba(34,211,238,0.12),transparent_32%),radial-gradient(circle_at_58%_42%,rgba(168,85,247,0.1),transparent_28%),radial-gradient(circle_at_90%_50%,rgba(251,146,60,0.12),transparent_26%)]" />

            <div className="relative z-10 grid min-h-[560px] gap-5 lg:grid-cols-[1.15fr_0.85fr]">
                <EpicEarthModule locale={t} epic={epic} />

                <div className="grid gap-5">
                    <MarsArchiveModule locale={t} marsMedia={marsMedia} />
                    <DonkiSolarModule locale={t} donki={donki} />
                </div>
            </div>
        </section>
    );
};