"use client";

import type {EarthOverview} from "@/src/types/earth/earth.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

import {EarthEventCard} from "./EarthEventCard";
import {EarthImageCard} from "./EarthImageCard";
import {EarthLayerCard} from "./EarthLayerCard";

type Props = {
    data: EarthOverview;
    t: EarthLocale;
};

export const EarthOverviewTab = ({data, t}: Props) => {
    return (
        <section className="space-y-5">
            <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
                <div className="absolute inset-0 opacity-25" style={{background: "var(--hero-bg)"}} />

                <div className="relative z-10 mb-5 flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-black uppercase tracking-[-0.05em]">
                        {t.latestEvents}
                    </h2>

                    <span className="earth-label text-[10px] font-black uppercase tracking-[0.18em]">
                        {data.events.length} {t.events}
                    </span>
                </div>

                <div className="relative z-10 flex gap-4 overflow-x-auto pb-3">
                    {data.events.map((event, index) => (
                        <EarthEventCard
                            key={event.id}
                            event={event}
                            t={t}
                            index={index}
                        />
                    ))}
                </div>
            </section>

            <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
                <div className="absolute inset-0 opacity-25" style={{background: "var(--hero-bg)"}} />

                <div className="relative z-10 mb-5 flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-black uppercase tracking-[-0.05em]">
                        {t.latestEarthImages}
                    </h2>

                    <span className="earth-label text-[10px] font-black uppercase tracking-[0.18em]">
                        {data.epicImages.length} {t.epicImages}
                    </span>
                </div>

                <div className="relative z-10 flex gap-4 overflow-x-auto pb-3">
                    {data.epicImages.map((image, index) => (
                        <div key={image.id} className="min-w-[280px] max-w-[280px]">
                            <EarthImageCard image={image} t={t} index={index} />
                        </div>
                    ))}
                </div>
            </section>

            <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
                <div className="absolute inset-0 opacity-25" style={{background: "var(--hero-bg)"}} />

                <div className="relative z-10 mb-5 flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-black uppercase tracking-[-0.05em]">
                        {t.gibsLayers}
                    </h2>

                    <span className="earth-label text-[10px] font-black uppercase tracking-[0.18em]">
                        {data.layers.length} {t.satelliteLayers}
                    </span>
                </div>

                <div className="relative z-10 flex gap-4 overflow-x-auto pb-3">
                    {data.layers.map((layer, index) => (
                        <div key={layer.id} className="min-w-[380px] max-w-[380px]">
                            <EarthLayerCard layer={layer} t={t} index={index} />
                        </div>
                    ))}
                </div>
            </section>
        </section>
    );
};