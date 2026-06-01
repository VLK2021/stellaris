"use client";

import Link from "next/link";
import {ArrowUpRight, Calendar, ExternalLink, MapPin, RadioTower, Tag} from "lucide-react";

import type {EarthOverview} from "@/src/types/earth/earth.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

type Props = {
    data: EarthOverview;
    t: EarthLocale;
};

export const EarthOverviewTab = ({data, t}: Props) => {
    return (
        <section className="space-y-5">
            <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-black uppercase tracking-[-0.05em]">
                        {t.latestEvents}
                    </h2>

                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                        {data.events.length} {t.events}
                    </span>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2">
                    {data.events.map((event) => (
                        <Link
                            key={event.id}
                            href={`/earth/${encodeURIComponent(event.id)}`}
                            className="group min-w-[360px] max-w-[360px] rounded-[1.4rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 transition hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                                        {event.status === "open" ? t.details.open : t.details.closed}
                                    </p>

                                    <h3 className="mt-2 line-clamp-2 text-xl font-black text-[var(--color-text)]">
                                        {event.title}
                                    </h3>
                                </div>

                                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-accent)] transition group-hover:rotate-45">
                                    <ArrowUpRight className="h-4 w-4" />
                                </span>
                            </div>

                            <div className="mt-4 grid gap-2 text-xs text-[var(--color-text-muted)]">
                                <Info icon={Tag} text={`${t.details.category}: ${event.categories.map((item) => item.title).join(", ") || "—"}`} />
                                <Info icon={MapPin} text={`${t.details.coordinates}: ${event.coordinates?.join(" / ") ?? "—"}`} />
                                <Info icon={RadioTower} text={`${t.details.geometryPoints}: ${event.geometryCount}`} />
                                <Info icon={Calendar} text={`${t.details.latestDate}: ${event.latestDate ?? "—"}`} />
                            </div>

                            <div className="mt-4 rounded-[1rem] border border-[var(--color-border)] bg-black/10 p-3">
                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                                    {t.details.sources}: {event.sourceCount}
                                </p>

                                <p className="mt-1 line-clamp-1 text-xs text-[var(--color-accent)]">
                                    {event.sources[0]?.id ?? "—"}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-black uppercase tracking-[-0.05em]">
                        {t.latestEarthImages}
                    </h2>

                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                        {data.epicImages.length} {t.epicImages}
                    </span>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2">
                    {data.epicImages.map((image) => (
                        <a
                            key={image.id}
                            href={image.imageUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="group min-w-[260px] max-w-[260px] overflow-hidden rounded-[1.4rem] border border-[var(--color-border)] bg-[var(--color-glass)] transition hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
                        >
                            <div className="relative">
                                <img
                                    src={image.imageUrl}
                                    alt={image.caption}
                                    className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105"
                                />

                                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] bg-black/45 text-[var(--color-accent)] backdrop-blur-xl">
                                    <ExternalLink className="h-4 w-4" />
                                </span>
                            </div>

                            <div className="p-4">
                                <p className="text-sm font-black text-[var(--color-text)]">
                                    {image.date}
                                </p>

                                <p className="mt-2 line-clamp-2 text-xs text-[var(--color-text-muted)]">
                                    {image.caption}
                                </p>

                                <div className="mt-3 grid gap-1 text-xs text-[var(--color-text-muted)]">
                                    <p>LAT: {image.centroidCoordinates.lat ?? "—"}</p>
                                    <p>LON: {image.centroidCoordinates.lon ?? "—"}</p>
                                    <p>VERSION: {image.version ?? "—"}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-black uppercase tracking-[-0.05em]">
                        {t.gibsLayers}
                    </h2>

                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                        {data.layers.length} {t.satelliteLayers}
                    </span>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2">
                    {data.layers.map((layer) => {
                        const content = (
                            <div className="min-w-[340px] max-w-[340px] rounded-[1.4rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 transition hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                                            {layer.format ?? "NASA GIBS"}
                                        </p>

                                        <h3 className="mt-2 line-clamp-2 text-base font-black text-[var(--color-text)]">
                                            {layer.title}
                                        </h3>
                                    </div>

                                    {layer.resourceUrl && (
                                        <ExternalLink className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                                    )}
                                </div>

                                <div className="mt-4 grid gap-2 text-xs text-[var(--color-text-muted)]">
                                    <p className="break-words">ID: {layer.id}</p>
                                    <p>TileMatrixSet: {layer.tileMatrixSet ?? "—"}</p>
                                    <p>Source: {layer.source}</p>
                                    <p className="line-clamp-3">
                                        Abstract: {layer.abstract ?? "—"}
                                    </p>
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

const Info = ({
                  icon: Icon,
                  text,
              }: {
    icon: typeof MapPin;
    text: string;
}) => (
    <p className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" />
        <span className="line-clamp-1">{text}</span>
    </p>
);