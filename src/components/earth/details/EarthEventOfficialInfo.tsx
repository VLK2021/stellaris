"use client";

import {motion} from "framer-motion";
import {BookOpen, CheckCircle2, Database, ExternalLink, Layers3} from "lucide-react";

import type {EarthEventEnrichment} from "@/src/types/earth/earthEnrichment.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

type Props = {
    enrichment: EarthEventEnrichment;
    t: EarthLocale;
};

export const EarthEventOfficialInfo = ({enrichment}: Props) => {
    const {
        officialCategories,
        officialSources,
        completeness,
        readableSummary,
    } = enrichment;

    return (
        <motion.section
            initial={{opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.15}}
            transition={{duration: 0.45}}
            className="relative overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl"
        >
            <div className="absolute inset-0 opacity-35" style={{background: "var(--hero-bg)"}} />

            <div className="relative z-10">
                <h2 className="text-xl font-black uppercase tracking-[-0.04em]">
                    Official Event Intelligence
                </h2>

                <p className="earth-muted mt-2 max-w-4xl text-sm leading-6">
                    This block uses NASA EONET event metadata, official EONET category data,
                    official EONET source registry and NASA EPIC imagery. No local hardcoded
                    event facts are used.
                </p>

                <div className="mt-5 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl">
                        <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-[var(--color-accent)]" />
                            <h3 className="text-base font-black">Readable Summary</h3>
                        </div>

                        <div className="mt-4 grid gap-2 text-sm text-[var(--color-text-muted)]">
                            <Row label="Title" value={readableSummary.title} />
                            <Row label="Category" value={readableSummary.category || "—"} />
                            <Row label="Status" value={readableSummary.status} />
                            <Row label="Latest date" value={readableSummary.latestDate ?? "—"} />
                            <Row label="Coordinates" value={readableSummary.coordinates?.join(" / ") ?? "—"} />
                            <Row label="Source IDs" value={readableSummary.sourceIds.join(", ") || "—"} />
                        </div>
                    </div>

                    <div className="rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[var(--color-accent)]" />
                            <h3 className="text-base font-black">Data Completeness</h3>
                        </div>

                        <div className="mt-4 grid gap-2 text-sm">
                            {Object.entries(completeness).map(([key, value]) => (
                                <div
                                    key={key}
                                    className="flex items-center justify-between gap-3 rounded-[0.9rem] border border-[var(--color-border)] bg-[var(--color-card)]/50 px-3 py-2"
                                >
                                    <span className="text-[var(--color-text-muted)]">{key}</span>
                                    <span className={value ? "text-[var(--color-success)]" : "text-[var(--color-warning)]"}>
                                        {value ? "yes" : "no"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid gap-4 xl:grid-cols-2">
                    <div className="rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl">
                        <div className="flex items-center gap-2">
                            <Layers3 className="h-4 w-4 text-[var(--color-accent)]" />
                            <h3 className="text-base font-black">Official Categories</h3>
                        </div>

                        <div className="mt-4 grid gap-3">
                            {officialCategories.length > 0 ? (
                                officialCategories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-card)]/50 p-3"
                                    >
                                        <p className="earth-label text-xs font-black uppercase tracking-[0.16em]">
                                            {category.id}
                                        </p>
                                        <h3 className="mt-1 text-base font-black">{category.title}</h3>
                                        <p className="earth-muted mt-2 text-sm leading-6">
                                            {category.description ?? "NASA EONET does not provide a category description."}
                                        </p>
                                        <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                                            Layers: {category.layersCount}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="earth-muted text-sm">No official category details returned.</p>
                            )}
                        </div>
                    </div>

                    <div className="rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl">
                        <div className="flex items-center gap-2">
                            <Database className="h-4 w-4 text-[var(--color-accent)]" />
                            <h3 className="text-base font-black">Official Sources</h3>
                        </div>

                        <div className="mt-4 grid gap-3">
                            {officialSources.length > 0 ? (
                                officialSources.map((source) => (
                                    <a
                                        key={source.id}
                                        href={source.homepage ?? source.eventsApiLink ?? "#"}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-card)]/50 p-3 transition hover:border-[var(--color-accent)]"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="earth-label text-xs font-black uppercase tracking-[0.16em]">
                                                    {source.id}
                                                </p>
                                                <h3 className="mt-1 text-base font-black">
                                                    {source.title ?? source.id}
                                                </h3>
                                                <p className="mt-2 break-all text-xs text-[var(--color-text-muted)]">
                                                    {source.homepage ?? source.eventsApiLink ?? "—"}
                                                </p>
                                            </div>

                                            <ExternalLink className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                                        </div>
                                    </a>
                                ))
                            ) : (
                                <p className="earth-muted text-sm">No official source registry details returned.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

const Row = ({
                 label,
                 value,
             }: {
    label: string;
    value: string;
}) => (
    <div className="grid gap-1 rounded-[0.9rem] border border-[var(--color-border)] bg-[var(--color-card)]/50 px-3 py-2 sm:grid-cols-[150px_1fr]">
        <span className="font-black text-[var(--color-text)]">{label}</span>
        <span className="break-words text-[var(--color-text-muted)]">{value}</span>
    </div>
);