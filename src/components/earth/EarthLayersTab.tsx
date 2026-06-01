"use client";

import {Database, ExternalLink} from "lucide-react";

import type {EarthOverview} from "@/src/types/earth/earth.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

import {EarthPanel} from "./EarthPanel";

type Props = {
    data: EarthOverview;
    title: string;
    t: EarthLocale;
};

export const EarthLayersTab = ({data, title, t}: Props) => {
    return (
        <EarthPanel title={title}>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {data.layers.map((layer) => {
                    const Component = layer.resourceUrl ? "a" : "div";

                    return (
                        <Component
                            key={layer.id}
                            href={layer.resourceUrl ?? undefined}
                            target={layer.resourceUrl ? "_blank" : undefined}
                            rel={layer.resourceUrl ? "noreferrer" : undefined}
                            className="group rounded-[1.1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 transition hover:border-[var(--color-accent)]/70 hover:shadow-[var(--shadow-glow)]"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                                        {layer.format ?? "NASA GIBS"}
                                    </p>

                                    <h3 className="mt-2 text-sm font-black text-[var(--color-text)]">
                                        {layer.title}
                                    </h3>

                                    <p className="mt-2 break-words text-xs text-[var(--color-text-muted)]">
                                        {layer.id}
                                    </p>
                                </div>

                                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-accent)]">
                                    {layer.resourceUrl ? (
                                        <ExternalLink className="h-4 w-4" />
                                    ) : (
                                        <Database className="h-4 w-4" />
                                    )}
                                </span>
                            </div>

                            <div className="mt-4 grid gap-1 text-xs text-[var(--color-text-muted)]">
                                <p>TileMatrixSet: {layer.tileMatrixSet ?? "—"}</p>
                                <p>Source: {layer.source}</p>
                            </div>

                            {layer.resourceUrl && (
                                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                                    {t.details.openSource} →
                                </p>
                            )}
                        </Component>
                    );
                })}
            </div>
        </EarthPanel>
    );
};