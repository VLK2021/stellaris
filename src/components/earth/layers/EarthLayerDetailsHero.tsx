"use client";

import {motion} from "framer-motion";
import {Database, FileImage, Globe2, Layers3} from "lucide-react";

import type {EarthLayerDetails} from "@/src/types/earth/earth.types";

type Props = {
    layer: EarthLayerDetails;
};

export const EarthLayerDetailsHero = ({layer}: Props) => {
    return (
        <motion.section
            initial={{opacity: 0, y: 18}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.45}}
            className="relative min-h-[460px] overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-8"
        >
            {layer.previewUrl && (
                <motion.img
                    src={layer.previewUrl}
                    alt={layer.title}
                    className="absolute right-[-80px] top-[-80px] h-[560px] w-[560px] rounded-full object-cover opacity-35"
                    animate={{scale: [1, 1.05, 1], rotate: [0, 1.4, 0]}}
                    transition={{duration: 12, repeat: Infinity, ease: "easeInOut"}}
                />
            )}

            <motion.div
                className="absolute inset-0"
                style={{background: "var(--hero-bg)"}}
                animate={{opacity: [0.72, 0.95, 0.72]}}
                transition={{duration: 8, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="relative z-10 flex min-h-[400px] flex-col justify-between">
                <div>
                    <p className="earth-label text-[11px] font-black uppercase tracking-[0.24em]">
                        NASA GIBS WMTS Layer
                    </p>

                    <h1 className="mt-4 max-w-5xl text-4xl font-black uppercase tracking-[-0.06em] sm:text-5xl">
                        {layer.title}
                    </h1>

                    <p className="earth-muted mt-4 max-w-4xl text-sm leading-7">
                        {layer.abstract ?? "NASA GIBS did not return an abstract for this layer."}
                    </p>
                </div>

                <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    <Info icon={Database} label="Layer ID" value={layer.id} />
                    <Info icon={FileImage} label="Format" value={layer.format ?? "—"} />
                    <Info icon={Layers3} label="Tile matrix set" value={layer.tileMatrixSet ?? "—"} />
                    <Info icon={Globe2} label="Source" value={layer.source} />
                </div>
            </div>
        </motion.section>
    );
};

const Info = ({
                  icon: Icon,
                  label,
                  value,
              }: {
    icon: typeof Database;
    label: string;
    value: string;
}) => (
    <div className="relative overflow-hidden rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl">
        <Icon className="h-4 w-4 text-[var(--color-accent)]" />

        <p className="earth-muted mt-3 text-[10px] font-black uppercase tracking-[0.18em]">
            {label}
        </p>

        <p className="mt-1 break-words text-sm font-bold text-[var(--color-text)]">
            {value}
        </p>
    </div>
);