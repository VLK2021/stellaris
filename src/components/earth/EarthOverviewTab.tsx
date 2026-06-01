"use client";

import Link from "next/link";
import {ArrowUpRight, ExternalLink, MapPin, RadioTower} from "lucide-react";

import type {EarthOverview} from "@/src/types/earth/earth.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

type Props = {
    data: EarthOverview;
    t: EarthLocale;
};

export const EarthOverviewTab = ({data, t}: Props) => {
    const featuredImage = data.epicImages[0];

    return (
        <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
            <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
                <h2 className="text-2xl font-black uppercase tracking-[-0.05em]">
                    {t.latestEvents}
                </h2>

                <div className="mt-5 grid gap-4">
                    {data.events.slice(0, 8).map((event) => (
                        <Link
                            key={event.id}
                            href={`/earth/${encodeURIComponent(event.id)}`}
                            className="group relative overflow-hidden rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 transition hover:border-[var(--color-accent)]/70 hover:shadow-[var(--shadow-glow)]"
                        >
                            <div className="absolute right-[-50px] top-[-50px] h-28 w-28 rounded-full bg-[var(--color-accent-soft)] blur-3xl" />

                            <div className="relative z-10 flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                                        {event.categories[0]?.title ?? t.category}
                                    </p>

                                    <h3 className="mt-2 text-lg font-black text-[var(--color-text)]">
                                        {event.title}
                                    </h3>

                                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-[var(--color-text-muted)]">
                                        <span className="inline-flex items-center gap-1.5">
                                            <MapPin className="h-3.5 w-3.5" />
                                            {event.coordinates?.join(" / ") ?? "—"}
                                        </span>

                                        <span className="inline-flex items-center gap-1.5">
                                            <RadioTower className="h-3.5 w-3.5" />
                                            {event.geometryCount} {t.details.geometryPoints}
                                        </span>
                                    </div>
                                </div>

                                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-accent)] transition group-hover:rotate-45">
                                    <ArrowUpRight className="h-4 w-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
                <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-black uppercase tracking-[-0.05em]">
                        {t.latestEarthImages}
                    </h2>

                    <button
                        type="button"
                        className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]"
                    >
                        {t.epic}
                    </button>
                </div>

                {featuredImage && (
                    <a
                        href={featuredImage.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group mt-5 block overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-glass)] transition hover:border-[var(--color-accent)]/70 hover:shadow-[var(--shadow-glow)]"
                    >
                        <div className="relative overflow-hidden">
                            <img
                                src={featuredImage.imageUrl}
                                alt={featuredImage.caption}
                                className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105"
                            />

                            <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-black/40 text-[var(--color-accent)] backdrop-blur-xl">
                                <ExternalLink className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="p-4">
                            <p className="text-sm font-black text-[var(--color-text)]">
                                {featuredImage.date}
                            </p>

                            <p className="mt-2 text-xs leading-5 text-[var(--color-text-muted)]">
                                {featuredImage.caption}
                            </p>

                            <p className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                                {t.details.viewImage} →
                            </p>
                        </div>
                    </a>
                )}
            </section>
        </section>
    );
};