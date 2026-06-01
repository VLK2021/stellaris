"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {ExternalLink, ImageIcon} from "lucide-react";

import type {EpicImage} from "@/src/types/earth/earth.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

type Props = {
    image: EpicImage;
    t: EarthLocale;
};

export const EarthImageCard = ({image, t}: Props) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <a
            href={image.imageUrl}
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-[1.3rem] border border-[var(--color-border)] bg-[linear-gradient(145deg,var(--color-glass),rgba(34,197,94,0.08))] transition hover:border-[var(--color-accent)]/70 hover:shadow-[var(--shadow-glow)]"
        >
            <div className="relative aspect-square overflow-hidden">
                {!loaded && (
                    <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_45%,rgba(34,197,94,0.18),var(--color-card)_62%)]">
                        <motion.div
                            className="absolute h-36 w-36 rounded-full border border-[var(--color-accent)]/25"
                            animate={{rotate: 360}}
                            transition={{duration: 8, repeat: Infinity, ease: "linear"}}
                        />
                        <motion.div
                            className="absolute h-24 w-24 rounded-full border border-emerald-400/25"
                            animate={{rotate: -360}}
                            transition={{duration: 6, repeat: Infinity, ease: "linear"}}
                        />
                        <ImageIcon className="relative z-10 h-9 w-9 text-[var(--color-accent)]" />
                    </div>
                )}

                <img
                    src={image.imageUrl}
                    alt={image.caption}
                    onLoad={() => setLoaded(true)}
                    className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${
                        loaded ? "opacity-100" : "opacity-0"
                    }`}
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
                    <p>LAT: {image.centroidCoordinates.lat ?? "—"}</p>
                    <p>LON: {image.centroidCoordinates.lon ?? "—"}</p>
                    <p>VERSION: {image.version ?? "—"}</p>
                    <p>TYPE: {image.type}</p>
                </div>

                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                    {t.details.viewImage} →
                </p>
            </div>
        </a>
    );
};