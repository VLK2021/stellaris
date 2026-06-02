"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {ExternalLink, ImageIcon} from "lucide-react";

import type {EarthLayerDetails} from "@/src/types/earth/earth.types";

type Props = {
    layer: EarthLayerDetails;
};

export const EarthLayerPreview = ({layer}: Props) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <section className="relative overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl">
            <div className="absolute inset-0 opacity-30" style={{background: "var(--hero-bg)"}} />

            <div className="relative z-10">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <h2 className="text-xl font-black uppercase tracking-[-0.04em]">
                        Live Tile Preview
                    </h2>

                    {layer.previewUrl && (
                        <a
                            href={layer.previewUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-accent)] transition hover:border-[var(--color-accent)]"
                        >
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    )}
                </div>

                <div className="relative aspect-square overflow-hidden rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-glass)]">
                    {!layer.previewUrl && (
                        <div className="grid h-full place-items-center p-6 text-center">
                            <p className="earth-muted text-sm">
                                NASA GIBS did not return a preview tile for this layer.
                            </p>
                        </div>
                    )}

                    {layer.previewUrl && !loaded && (
                        <div className="absolute inset-0 z-10 grid place-items-center bg-[var(--color-card)]">
                            <motion.div
                                className="absolute h-36 w-36 rounded-full border border-[var(--color-accent)]/30"
                                animate={{rotate: 360}}
                                transition={{duration: 8, repeat: Infinity, ease: "linear"}}
                            />

                            <ImageIcon className="relative z-10 h-9 w-9 text-[var(--color-accent)]" />
                        </div>
                    )}

                    {layer.previewUrl && (
                        <img
                            src={layer.previewUrl}
                            alt={layer.title}
                            onLoad={() => setLoaded(true)}
                            className={`h-full w-full object-cover transition duration-700 ${
                                loaded ? "opacity-100" : "opacity-0"
                            }`}
                        />
                    )}
                </div>

                <p className="earth-muted mt-4 break-all text-xs leading-5">
                    {layer.previewUrl ?? "No preview URL"}
                </p>
            </div>
        </section>
    );
};