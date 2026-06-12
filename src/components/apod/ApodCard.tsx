"use client";

import {motion} from "framer-motion";
import {ExternalLink, PlayCircle, Download} from "lucide-react";

import type {ApodExplorerLocale, ApodItem} from "@/src/types/apod/apod.types";

type Props = {
    item: ApodItem;
    locale: ApodExplorerLocale;
};

export const ApodCard = ({item, locale}: Props) => {
    const preview =
        item.mediaType === "image"
            ? item.url
            : item.thumbnailUrl ?? item.url;

    const previewUnavailable =
        item.mediaType === "video"
            ? "Video preview unavailable"
            : locale.noData;

    return (
        <motion.article
            initial={{opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            whileHover={{y: -5}}
            viewport={{once: true}}
            transition={{duration: 0.4}}
            className="group overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] backdrop-blur-xl"
        >
            <div className="relative h-52 overflow-hidden bg-[var(--color-card-deep)] sm:h-56">
                {preview ? (
                    <img
                        src={preview}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="grid h-full place-items-center px-6 text-center text-sm text-[var(--color-text-muted)]">
                        {previewUnavailable}
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/90 to-transparent opacity-80" />

                <div className="absolute left-4 top-4 rounded-full bg-[var(--color-glass-strong)] px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-[var(--color-accent)] backdrop-blur-xl">
                    {locale[item.mediaType]}
                </div>

                {item.mediaType === "video" && (
                    <div className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-accent)] backdrop-blur-xl">
                        <PlayCircle className="h-5 w-5" />
                    </div>
                )}
            </div>

            <div className="p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                    {item.date}
                </p>

                <h3 className="mt-2.5 line-clamp-2 text-lg font-black tracking-[-0.045em] text-[var(--color-text)] sm:text-xl">
                    {item.title}
                </h3>

                <p className="mt-3 line-clamp-4 text-[13px] leading-6 text-[var(--color-text-muted)]">
                    {item.explanation}
                </p>

                <div className="mt-4 flex flex-wrap gap-2.5">
                    {item.mediaType === "image" && (
                        <a
                            href={`/api/apod/download?url=${encodeURIComponent(item.hdUrl ?? item.url ?? "")}`}
                            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-3.5 py-2 text-[11px] font-black text-white transition hover:scale-105"
                        >
                            <Download className="h-3.5 w-3.5" />
                            Завантажити фото
                        </a>
                    )}

                    {item.hdUrl && (
                        <a
                            href={item.hdUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3.5 py-2 text-[11px] font-black text-[var(--color-accent)] transition hover:border-[var(--color-border-strong)]"
                        >
                            {locale.hd}
                            <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                    )}

                    {item.url && (
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3.5 py-2 text-[11px] font-black text-[var(--color-text-muted)] transition hover:border-[var(--color-border-strong)]"
                        >
                            {item.mediaType === "video"
                                ? "Відкрити відео"
                                : locale.source}
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
};