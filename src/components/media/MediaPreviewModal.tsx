import Image from "next/image";
import Link from "next/link";
import {ExternalLink, X} from "lucide-react";

import type {MediaItem, MediaLocale} from "@/src/types/media";

type Props = {
    item: MediaItem;
    onClose: () => void;
    t: MediaLocale;
};

export const MediaPreviewModal = ({item, onClose, t}: Props) => {
    const data = item.data[0];

    if (!data) return null;

    const preview = item.links?.[0]?.href ?? null;

    const assetHref =
        item.links?.find((link) => link.rel === "preview")?.href ??
        item.links?.[0]?.href ??
        null;

    return (
        <div className="fixed inset-0 z-[999] grid place-items-center bg-black/75 p-4 backdrop-blur-xl md:p-8">
            <section className="relative grid max-h-[calc(100vh-11rem)] w-full max-w-6xl overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-card-solid)] shadow-[0_30px_120px_rgba(0,0,0,.55)]">
                <button
                    type="button"
                    onClick={onClose}
                    aria-label={t.close}
                    className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass-strong)] text-[var(--color-text)] transition hover:border-[var(--color-accent)]"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="grid max-h-[calc(100vh-5rem)] overflow-y-auto lg:grid-cols-[1.25fr_.75fr]">
                    <div className="bg-[var(--color-card-deep)] p-4 lg:p-5">
                        <div className="relative aspect-video overflow-hidden rounded-[1.3rem] border border-[var(--color-border)] bg-black/20">
                            {preview ? (
                                <Image
                                    src={preview}
                                    alt={data.title}
                                    fill
                                    sizes="100vw"
                                    className="object-contain"
                                    unoptimized
                                />
                            ) : (
                                <div className="grid h-full place-items-center text-[var(--color-text-muted)]">
                                    {data.media_type}
                                </div>
                            )}
                        </div>
                    </div>

                    <aside className="p-5 lg:p-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                            {data.media_type}
                        </p>

                        <h2 className="mt-3 text-2xl font-black uppercase tracking-[-0.05em] text-[var(--color-text)] lg:text-3xl">
                            {data.title}
                        </h2>

                        {data.description && (
                            <p className="mt-4 max-h-[180px] overflow-y-auto pr-2 text-sm leading-7 text-[var(--color-text-muted)]">
                                {data.description}
                            </p>
                        )}

                        <div className="mt-5 grid gap-3">
                            <Meta label={t.nasaId} value={data.nasa_id} />
                            <Meta label={t.center} value={data.center} />
                            <Meta
                                label={t.dateCreated}
                                value={data.date_created?.slice(0, 10)}
                            />
                            <Meta label={t.location} value={data.location} />
                            <Meta label={t.photographer} value={data.photographer} />
                        </div>

                        {data.keywords?.length ? (
                            <div className="mt-5">
                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                                    {t.keywords}
                                </p>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {data.keywords.slice(0, 14).map((keyword) => (
                                        <span
                                            key={keyword}
                                            className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[var(--color-accent)]"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ) : null}

                        {assetHref && (
                            <Link
                                href={assetHref}
                                target="_blank"
                                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-[var(--shadow-glow)]"
                            >
                                {t.openAsset}
                                <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                        )}
                    </aside>
                </div>
            </section>
        </div>
    );
};

const Meta = ({
                  label,
                  value,
              }: {
    label: string;
    value?: string;
}) => {
    if (!value) return null;

    return (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-glass)] p-3">
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                {label}
            </p>

            <p className="mt-1 break-words text-sm font-bold text-[var(--color-text)]">
                {value}
            </p>
        </div>
    );
};