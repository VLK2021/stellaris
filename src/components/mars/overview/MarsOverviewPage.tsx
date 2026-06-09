"use client";

import {useLanguage} from "@/src/context/LanguageContext";
import type {MarsOverview} from "@/src/types/mars";

import {MarsBackground} from "./MarsBackground";
import {MarsCameraNetwork} from "./MarsCameraNetwork";
import {MarsHero} from "./MarsHero";
import {MarsMissionTimeline} from "./MarsMissionTimeline";
import {MarsNavigationDeck} from "./MarsNavigationDeck";
import {MarsRoverCommandCenter} from "./MarsRoverCommandCenter";
import {MarsSurfaceStream} from "./MarsSurfaceStream";
import {MarsTelemetryPanel} from "./MarsTelemetryPanel";

type Props = {
    data: MarsOverview;
};

export const MarsOverviewPage = ({data}: Props) => {
    const {locale} = useLanguage();
    const t = locale.mars;

    return (
        <main className="relative min-h-screen overflow-hidden text-[var(--mars-text)]" style={{background: "var(--mars-bg)"}}>
            <MarsBackground />

            <div className="relative z-10 mx-auto grid max-w-[1580px] gap-6 px-4 py-8 sm:px-6 lg:px-8">
                <MarsHero data={data} t={t} />

                <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
                    <MarsNavigationDeck t={t} />
                    <MarsTelemetryPanel data={data} t={t} />
                </section>

                <MarsRoverCommandCenter rovers={data.rovers} t={t} />
                <MarsSurfaceStream photos={data.latestPhotos} t={t} />
                <MarsMissionTimeline rovers={data.rovers} t={t} />
                <MarsCameraNetwork rovers={data.rovers} t={t} />
            </div>
        </main>
    );
};