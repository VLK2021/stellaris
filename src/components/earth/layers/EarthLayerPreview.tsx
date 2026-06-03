"use client";

import {useMemo, useState} from "react";
import {motion} from "framer-motion";
import {ExternalLink, ImageIcon, Loader2} from "lucide-react";

import type {EarthLayerDetails} from "@/src/types/earth/earth.types";

type Props = {
    layer: EarthLayerDetails;
};

const TILE_MATRIX_OPTIONS = ["0", "1", "2", "3"];

const buildPreviewUrl = ({
                             template,
                             time,
                             tileMatrixSet,
                             tileMatrix,
                         }: {
    template: string | null;
    time: string;
    tileMatrixSet: string;
    tileMatrix: string;
}) => {
    if (!template) return null;

    return template
        .replaceAll("{Time}", time)
        .replaceAll("{TileMatrixSet}", tileMatrixSet)
        .replaceAll("{TileMatrix}", tileMatrix)
        .replaceAll("{TileRow}", "0")
        .replaceAll("{TileCol}", "0");
};

export const EarthLayerPreview = ({layer}: Props) => {
    const timeDimension = layer.dimensions.find((item) => item.id === "Time");

    const timeOptions = useMemo(() => {
        if (!timeDimension) return [];

        if (timeDimension.values.length > 0) {
            return timeDimension.values;
        }

        return timeDimension.defaultValue ? [timeDimension.defaultValue] : [];
    }, [timeDimension]);

    const [selectedTime, setSelectedTime] = useState(
        timeDimension?.defaultValue ?? timeOptions[0] ?? "default",
    );

    const [tileMatrix, setTileMatrix] = useState("0");
    const [loaded, setLoaded] = useState(false);

    const previewUrl = buildPreviewUrl({
        template: layer.resourceTemplate,
        time: selectedTime,
        tileMatrixSet: layer.tileMatrixSet ?? "250m",
        tileMatrix,
    });

    return (
        <section className="relative overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl">
            <div className="absolute inset-0 opacity-30" style={{background: "var(--hero-bg)"}} />

            <div className="relative z-10">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-[-0.04em]">
                            Live Tile Preview
                        </h2>

                        <p className="earth-muted mt-2 max-w-2xl text-sm leading-6">
                            This preview is generated from the official NASA GIBS WMTS tile
                            template. Change time or tile level to inspect another NASA tile.
                        </p>
                    </div>

                    {previewUrl && (
                        <a
                            href={previewUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-accent)] transition hover:border-[var(--color-accent)]"
                        >
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    )}
                </div>

                <div className="mb-4 grid gap-3 md:grid-cols-2">
                    <label className="grid gap-2">
                        <span className="earth-label text-[10px] font-black uppercase tracking-[0.18em]">
                            Time
                        </span>

                        <select
                            value={selectedTime}
                            onChange={(event) => {
                                setSelectedTime(event.target.value);
                                setLoaded(false);
                            }}
                            className="input"
                            disabled={timeOptions.length === 0}
                        >
                            {timeOptions.length > 0 ? (
                                timeOptions.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))
                            ) : (
                                <option value="default">default</option>
                            )}
                        </select>
                    </label>

                    <label className="grid gap-2">
                        <span className="earth-label text-[10px] font-black uppercase tracking-[0.18em]">
                            Tile Matrix
                        </span>

                        <select
                            value={tileMatrix}
                            onChange={(event) => {
                                setTileMatrix(event.target.value);
                                setLoaded(false);
                            }}
                            className="input"
                        >
                            {TILE_MATRIX_OPTIONS.map((value) => (
                                <option key={value} value={value}>
                                    Level {value}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="relative aspect-square overflow-hidden rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-glass)]">
                    {!previewUrl && (
                        <div className="grid h-full place-items-center p-6 text-center">
                            <p className="earth-muted text-sm">
                                NASA GIBS did not return a usable preview tile for this layer.
                            </p>
                        </div>
                    )}

                    {previewUrl && !loaded && (
                        <div className="absolute inset-0 z-10 grid place-items-center bg-[var(--color-card)]">
                            <motion.div
                                className="absolute h-36 w-36 rounded-full border border-[var(--color-accent)]/30"
                                animate={{rotate: 360}}
                                transition={{duration: 8, repeat: Infinity, ease: "linear"}}
                            />

                            <Loader2 className="relative z-10 h-8 w-8 animate-spin text-[var(--color-accent)]" />
                        </div>
                    )}

                    {previewUrl && (
                        <img
                            key={previewUrl}
                            src={previewUrl}
                            alt={layer.title}
                            onLoad={() => setLoaded(true)}
                            onError={() => setLoaded(true)}
                            className={`h-full w-full object-cover transition duration-700 ${
                                loaded ? "opacity-100" : "opacity-0"
                            }`}
                        />
                    )}

                    {previewUrl && loaded && (
                        <div className="absolute bottom-3 left-3 rounded-full border border-[var(--color-border)] bg-[var(--color-card)]/80 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-accent)] backdrop-blur-xl">
                            NASA GIBS Tile
                        </div>
                    )}

                    {!previewUrl && (
                        <ImageIcon className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-[var(--color-accent)]" />
                    )}
                </div>

                <p className="earth-muted mt-4 break-all text-xs leading-5">
                    {previewUrl ?? "No preview URL"}
                </p>
            </div>
        </section>
    );
};