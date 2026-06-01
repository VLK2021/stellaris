"use client";

import {ExternalLink} from "lucide-react";

import type {EarthOverview} from "@/src/types/earth/earth.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

import {EarthEventCard} from "./EarthEventCard";
import {EarthImageCard} from "./EarthImageCard";

type Props = {
    data: EarthOverview;
    t: EarthLocale;
};

export const EarthOverviewTab = ({data, t}: Props) => {
    return (
        <section className="space-y-5">
            <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(145deg,var(--color-card),rgba(34,197,94,0.04),rgba(14,165,233,0.04))] p-5 shadow-[var(--shadow-card)]">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-black uppercase tracking-[-0.05em]">
                        {t.latestEvents}
                    </h2>

                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                        {data.events.length} {t.events}
                    </span>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-3">
                    {data.events.map((event) => (
                        <EarthEventCard
                            key={event.id}
                            event={event}
                            t={t}
                        />
                    ))}
                </div>
            </section>

            <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(145deg,var(--color-card),rgba(14,165,233,0.05),rgba(34,197,94,0.03))] p-5 shadow-[var(--shadow-card)]">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-black uppercase tracking-[-0.05em]">
                        {t.latestEarthImages}
                    </h2>

                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                        {data.epicImages.length} {t.epicImages}
                    </span>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-3">
                    {data.epicImages.map((image) => (
                        <div key={image.id} className="min-w-[280px] max-w-[280px]">
                            <EarthImageCard image={image} t={t} />
                        </div>
                    ))}
                </div>
            </section>

            <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(145deg,var(--color-card),rgba(99,102,241,0.05),rgba(14,165,233,0.03))] p-5 shadow-[var(--shadow-card)]">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-black uppercase tracking-[-0.05em]">
                        {t.gibsLayers}
                    </h2>

                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                        {data.layers.length} {t.satelliteLayers}
                    </span>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-3">
                    {data.layers.map((layer) => {
                        const content = (
                            <div className="flex h-[240px] min-w-[360px] max-w-[360px] flex-col justify-between rounded-[1.4rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 transition hover:border-[var(--color-accent)]/70 hover:shadow-[var(--shadow-glow)]">
                                <div>
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                                                {layer.format ?? "NASA GIBS"}
                                            </p>

                                            <h3 className="mt-2 line-clamp-2 min-h-[42px] text-base font-black text-[var(--color-text)]">
                                                {layer.title}
                                            </h3>
                                        </div>

                                        {layer.resourceUrl && (
                                            <ExternalLink className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                                        )}
                                    </div>

                                    <p className="mt-3 line-clamp-2 break-words text-xs text-[var(--color-text-muted)]">
                                        ID: {layer.id}
                                    </p>
                                </div>

                                <div className="rounded-[1rem] border border-[var(--color-border)] bg-black/10 p-3 text-xs text-[var(--color-text-muted)]">
                                    <p className="line-clamp-1">TileMatrixSet: {layer.tileMatrixSet ?? "—"}</p>
                                    <p className="mt-1 line-clamp-1">Source: {layer.source}</p>
                                    <p className="mt-1 line-clamp-2">Abstract: {layer.abstract ?? "—"}</p>
                                </div>
                            </div>
                        );

                        if (layer.resourceUrl) {
                            return (
                                <a
                                    key={layer.id}
                                    href={layer.resourceUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {content}
                                </a>
                            );
                        }

                        return <div key={layer.id}>{content}</div>;
                    })}
                </div>
            </section>
        </section>
    );
};