"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {ExternalLink, ImageIcon} from "lucide-react";

import type {EpicImage} from "@/src/types/earth/earth.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

type Props = {
    image: EpicImage;
    t: EarthLocale;
    index?: number;
};

export const EarthImageCard = ({image, t, index = 0}: Props) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <motion.a
            href={image.imageUrl}
            target="_blank"
            rel="noreferrer"
            initial={{opacity: 0, y: 18, scale: 0.985}}
            whileInView={{opacity: 1, y: 0, scale: 1}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.35, delay: Math.min(index * 0.03, 0.2)}}
            className="group relative block overflow-hidden rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-glass)] shadow-[var(--shadow-card)] backdrop-blur-xl transition hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
        >
            <motion.div
                className="absolute inset-0"
                style={{background: "var(--hero-bg)"}}
                animate={{opacity: [0.08, 0.22, 0.08]}}
                transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="relative aspect-square overflow-hidden">
                {!loaded && (
                    <div className="absolute inset-0 z-10 grid place-items-center bg-[var(--color-card)]">
                        <motion.div
                            className="absolute h-36 w-36 rounded-full border border-[var(--color-accent)]/30"
                            animate={{rotate: 360}}
                            transition={{duration: 8, repeat: Infinity, ease: "linear"}}
                        />

                        <motion.div
                            className="absolute h-24 w-24 rounded-full border border-[var(--color-border)]"
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

                <span className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-card)]/75 text-[var(--color-accent)] backdrop-blur-xl">
                    <ExternalLink className="h-4 w-4" />
                </span>
            </div>

            <div className="relative z-10 p-4">
                <h3 className="text-sm font-black">{image.date}</h3>

                <p className="earth-muted mt-2 line-clamp-3 text-xs leading-5">
                    {image.caption}
                </p>

                <div className="mt-4 grid gap-1 text-xs text-[var(--color-text-muted)]">
                    <p>LAT: {image.centroidCoordinates.lat ?? "—"}</p>
                    <p>LON: {image.centroidCoordinates.lon ?? "—"}</p>
                    <p>VERSION: {image.version ?? "—"}</p>
                    <p>TYPE: {image.type}</p>
                </div>

                <p className="earth-label mt-4 text-[10px] font-black uppercase tracking-[0.18em]">
                    {t.details.viewImage} →
                </p>
            </div>
        </motion.a>
    );
};