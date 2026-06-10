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
    const preview = item.links?.[0]?.href ?? null;
    const assetHref = item.links?.find((link) => link.rel === "preview")?.href
        ?? item.links?.[0]?.href
        ?? null;

    if (!data) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-xl">
            <section className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card-solid)] p-5 shadow-[var(--shadow-card)]">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-5 top-5 z-20 grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-text)]"
                    aria-label={t.close}
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
                    <div className="relative aspect-video overflow-hidden rounded-[1.4rem] bg-[var(--color-card-deep)]">
                        {preview ? (
                            <Image
                                src={preview}
                                alt={data.title}
                                fill
                                sizes="100vw"
                                className="object-cover"
                                unoptimized
                            />
                        ) : (
                            <div className="grid h-full place-items-center text-[var(--color-text-muted)]">
                                {data.media_type}
                            </div>
                        )}
                    </div>

                    <aside>
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                            {data.media_type}
                        </p>

                        <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.05em] text-[var(--color-text)]">
                            {data.title}
                        </h2>

                        {data.description && (
                            <p className="mt-4 max-h-[220px] overflow-y-auto text-sm leading-7 text-[var(--color-text-muted)]">
                                {data.description}
                            </p>
                        )}

                        <div className="mt-5 grid gap-3">
                            <Meta label={t.nasaId} value={data.nasa_id} />
                            <Meta label={t.center} value={data.center} />
                            <Meta label={t.dateCreated} value={data.date_created?.slice(0, 10)} />
                            <Meta label={t.location} value={data.location} />
                            <Meta label={t.photographer} value={data.photographer} />
                        </div>

                        {data.keywords?.length ? (
                            <div className="mt-5">
                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                                    {t.keywords}
                                </p>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {data.keywords.slice(0, 16).map((keyword) => (
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

            <p className="mt-1 text-sm font-bold text-[var(--color-text)]">
                {value}
            </p>
        </div>
    );
};