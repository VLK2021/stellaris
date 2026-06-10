import Image from "next/image";
import Link from "next/link";
import {ExternalLink, FileAudio, ImageIcon, Video, X} from "lucide-react";

import type {MediaItem, MediaLocale, MediaType} from "@/src/types/media";

type Props = {
    item: MediaItem;
    onClose: () => void;
    t: MediaLocale;
};

const getIcon = (type: MediaType) => {
    if (type === "video") return Video;
    if (type === "audio") return FileAudio;

    return ImageIcon;
};

export const MediaPreviewModal = ({item, onClose, t}: Props) => {
    const data = item.data[0];

    if (!data) return null;

    const preview = item.links?.[0]?.href ?? null;
    const assetHref =
        item.links?.find((link) => link.rel === "preview")?.href ??
        item.links?.[0]?.href ??
        null;

    const Icon = getIcon(data.media_type);

    return (
        <div className="fixed inset-0 z-[999] grid place-items-center bg-black/75 px-4 py-24 backdrop-blur-xl">
            <section className="relative flex h-[72vh] w-full max-w-5xl flex-col overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-card-solid)] shadow-[0_30px_120px_rgba(0,0,0,.55)]">
                <header className="flex shrink-0 items-center justify-between gap-4 border-b border-[var(--color-border)] bg-[var(--color-glass)] px-5 py-4">
                    <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-accent)]">
                            <Icon className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                                {data.media_type}
                            </p>

                            <h2 className="line-clamp-1 text-lg font-black uppercase tracking-[-0.04em] text-[var(--color-text)]">
                                {data.title}
                            </h2>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label={t.close}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text)] transition hover:border-[var(--color-accent)]"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </header>

                <div className="grid min-h-0 flex-1 overflow-hidden lg:grid-cols-[1.15fr_.85fr]">
                    <section className="min-h-0 overflow-y-auto bg-[var(--color-card-deep)] p-5">
                        <div className="relative aspect-video overflow-hidden rounded-[1.3rem] border border-[var(--color-border)] bg-black/30">
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
                                <div className="grid h-full place-items-center text-[var(--color-accent)]">
                                    <Icon className="h-16 w-16" />
                                </div>
                            )}
                        </div>

                        {data.description && (
                            <article className="mt-5 rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
                                <p className="text-sm leading-7 text-[var(--color-text-muted)]">
                                    {data.description}
                                </p>
                            </article>
                        )}
                    </section>

                    <aside className="min-h-0 overflow-y-auto border-t border-[var(--color-border)] p-5 lg:border-l lg:border-t-0">
                        <div className="grid gap-3">
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
                            <section className="mt-5 rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4">
                                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                                    {t.keywords}
                                </p>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {data.keywords.slice(0, 24).map((keyword) => (
                                        <span
                                            key={keyword}
                                            className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[var(--color-accent)]"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        ) : null}

                        {assetHref && (
                            <Link
                                href={assetHref}
                                target="_blank"
                                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-[var(--shadow-glow)]"
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