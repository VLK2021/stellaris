"use client";

import {ExternalLink} from "lucide-react";

import type {EarthOverview} from "@/src/types/earth/earth.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

import {EarthPanel} from "./EarthPanel";

type Props = {
    data: EarthOverview;
    title: string;
    t: EarthLocale;
};

export const EarthEpicTab = ({data, title, t}: Props) => {
    return (
        <EarthPanel title={title}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.epicImages.map((image) => (
                    <a
                        key={image.id}
                        href={image.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group overflow-hidden rounded-[1.3rem] border border-[var(--color-border)] bg-[var(--color-glass)] transition hover:border-[var(--color-accent)]/70 hover:shadow-[var(--shadow-glow)]"
                    >
                        <div className="relative overflow-hidden">
                            <img
                                src={image.imageUrl}
                                alt={image.caption}
                                className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105"
                            />

                            <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] bg-black/40 text-[var(--color-accent)] backdrop-blur-xl">
                                <ExternalLink className="h-4 w-4" />
                            </span>
                        </div>

                        <div className="p-4">
                            <p className="text-sm font-black text-[var(--color-text)]">
                                {image.date}
                            </p>

                            <p className="mt-2 text-xs leading-5 text-[var(--color-text-muted)]">
                                {image.caption}
                            </p>

                            <div className="mt-4 grid gap-1 text-xs text-[var(--color-text-muted)]">
                                <p>
                                    LAT: {image.centroidCoordinates.lat ?? "—"}
                                </p>
                                <p>
                                    LON: {image.centroidCoordinates.lon ?? "—"}
                                </p>
                                <p>
                                    VERSION: {image.version ?? "—"}
                                </p>
                            </div>

                            <p className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                                {t.details.viewImage} →
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </EarthPanel>
    );
};