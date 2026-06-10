"use client";

import Image from "next/image";
import Link from "next/link";
import {useEffect, useMemo, useState} from "react";
import {
    ArrowRight,
    ExternalLink,
    FileAudio,
    ImageIcon,
    Loader2,
    Play,
    Video,
    X,
} from "lucide-react";

import {fetchMediaAssetsClient} from "@/src/services/media";

import type {NormalizedMediaAssets} from "@/src/services/media";
import type {MediaItem, MediaLocale, MediaType} from "@/src/types/media";

type Props = {
    item: MediaItem;
    onClose: () => void;
    t: MediaLocale;
};

const EMPTY_ASSETS: NormalizedMediaAssets = {
    assets: [],
    preview: null,
    video: null,
    audio: null,
};

const MediaTypeIcon = ({
                           type,
                           className,
                       }: {
    type: MediaType;
    className?: string;
}) => {
    if (type === "video") return <Video className={className} />;
    if (type === "audio") return <FileAudio className={className} />;

    return <ImageIcon className={className} />;
};

export const MediaPreviewModal = ({item, onClose, t}: Props) => {
    const data = item.data[0];

    const [assets, setAssets] = useState<NormalizedMediaAssets>(EMPTY_ASSETS);
    const [isLoadingAssets, setIsLoadingAssets] = useState(false);

    useEffect(() => {
        if (!data?.nasa_id) return;

        let mounted = true;

        const loadAssets = async () => {
            setIsLoadingAssets(true);

            try {
                const response = await fetchMediaAssetsClient(data.nasa_id);

                if (mounted) {
                    setAssets(response);
                }
            } catch {
                if (mounted) {
                    setAssets(EMPTY_ASSETS);
                }
            } finally {
                if (mounted) {
                    setIsLoadingAssets(false);
                }
            }
        };

        void loadAssets();

        return () => {
            mounted = false;
        };
    }, [data?.nasa_id]);

    const preview = useMemo(
        () => assets.preview ?? item.links?.[0]?.href ?? null,
        [assets.preview, item.links],
    );

    if (!data) return null;

    const detailsHref = `/media/${encodeURIComponent(data.nasa_id)}`;
    const directAssetHref =
        assets.video ??
        assets.audio ??
        assets.preview ??
        item.links?.[0]?.href ??
        null;

    return (
        <div className="fixed inset-0 z-[999] grid place-items-center overflow-hidden bg-black/80 px-4 py-24 backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,.18),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(139,92,246,.16),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(236,72,153,.13),transparent_35%)]" />

            <section className="relative h-[72vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card-solid)] shadow-[0_35px_140px_rgba(0,0,0,.65)]">
                <button
                    type="button"
                    onClick={onClose}
                    aria-label={t.close}
                    className="absolute right-5 top-5 z-30 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-xl transition hover:border-[var(--color-accent)] hover:bg-black/60"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="grid h-full min-h-0 lg:grid-cols-[1.12fr_.88fr]">
                    <section className="relative min-h-0 overflow-hidden bg-black">
                        {assets.video ? (
                            <video
                                controls
                                src={assets.video}
                                poster={preview ?? undefined}
                                className="h-full w-full object-contain"
                            />
                        ) : assets.audio ? (
                            <div className="grid h-full place-items-center p-8">
                                <div className="w-full max-w-xl rounded-[2rem] border border-white/15 bg-white/10 p-8 backdrop-blur-xl">
                                    <FileAudio className="h-16 w-16 text-[var(--color-accent)]" />
                                    <p className="mt-6 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                                        {data.media_type}
                                    </p>
                                    <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.05em] text-white">
                                        {data.title}
                                    </h2>
                                    <audio controls src={assets.audio} className="mt-8 w-full" />
                                </div>
                            </div>
                        ) : preview ? (
                            <Image
                                src={preview}
                                alt={data.title}
                                fill
                                sizes="100vw"
                                className="object-contain"
                                unoptimized
                                priority
                            />
                        ) : (
                            <div className="grid h-full place-items-center text-[var(--color-accent)]">
                                <MediaTypeIcon type={data.media_type} className="h-20 w-20" />
                            </div>
                        )}

                        {isLoadingAssets && (
                            <div className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-xl">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                {t.loading}
                            </div>
                        )}

                        {data.media_type === "video" && !assets.video && (
                            <div className="absolute bottom-5 left-5 z-20 inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-xl">
                                <Play className="h-4 w-4" />
                                Preview
                            </div>
                        )}
                    </section>

                    <aside className="relative min-h-0 overflow-y-auto border-l border-[var(--color-border)] bg-[var(--color-card-solid)] p-6">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(56,189,248,.10),transparent_32%)]" />

                        <div className="relative z-10">
                            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                                <MediaTypeIcon type={data.media_type} className="h-4 w-4" />
                                {data.media_type}
                            </p>

                            <h2 className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-[-0.06em] text-[var(--color-text)]">
                                {data.title}
                            </h2>

                            {data.description && (
                                <p className="mt-5 line-clamp-5 text-sm leading-7 text-[var(--color-text-muted)]">
                                    {data.description}
                                </p>
                            )}

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <Info label={t.center} value={data.center} />
                                <Info
                                    label={t.dateCreated}
                                    value={data.date_created?.slice(0, 10)}
                                />
                            </div>

                            {data.keywords?.length ? (
                                <div className="mt-6">
                                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                                        {t.keywords}
                                    </p>

                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {data.keywords.slice(0, 6).map((keyword) => (
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

                            <div className="mt-7 flex flex-wrap gap-3">
                                <Link
                                    href={detailsHref}
                                    className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-[var(--shadow-glow)] transition hover:scale-[1.02]"
                                >
                                    {t.details}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>

                                {directAssetHref && (
                                    <Link
                                        href={directAssetHref}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-accent)] transition hover:border-[var(--color-accent)]"
                                    >
                                        {t.openAsset}
                                        <ExternalLink className="h-4 w-4" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
};

const Info = ({
                  label,
                  value,
              }: {
    label: string;
    value?: string;
}) => {
    if (!value) return null;

    return (
        <div className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-3">
            <p className="text-[8px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                {label}
            </p>
            <p className="mt-1 break-words text-sm font-black text-[var(--color-text)]">
                {value}
            </p>
        </div>
    );
};