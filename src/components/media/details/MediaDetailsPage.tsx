"use client";

import Image from "next/image";
import Link from "next/link";
import {ExternalLink, FileAudio, ImageIcon, Video} from "lucide-react";

import {BackButton} from "@/src/common/BackButton";
import {useLanguage} from "@/src/context/LanguageContext";

import type {MediaItem, MediaLocale, MediaType} from "@/src/types/media";

type Props = {
    item: MediaItem;
    assets: string[];
    preview: string | null;
    video: string | null;
    audio: string | null;
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

export const MediaDetailsPage = ({
                                     item,
                                     assets,
                                     preview,
                                     video,
                                     audio,
                                 }: Props) => {
    const {locale} = useLanguage();
    const t = locale.media as MediaLocale;

    const data = item.data[0];

    if (!data) return null;

    return (
        <main className="min-h-screen bg-[var(--body-bg)] text-[var(--color-text)]">
            <div className="mx-auto grid max-w-[1580px] gap-6 px-4 py-8 sm:px-6 lg:px-8">
                <BackButton label={t.back} />

                <section className="overflow-hidden rounded-[2.4rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
                    <div className="grid xl:grid-cols-[1.15fr_.85fr]">
                        <div className="bg-[var(--color-card-deep)] p-5">
                            <div className="relative overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-black/30">
                                {video ? (
                                    <video
                                        controls
                                        src={video}
                                        poster={preview ?? undefined}
                                        className="aspect-video w-full rounded-[1.6rem] bg-black object-contain"
                                    />
                                ) : audio ? (
                                    <div className="grid min-h-[420px] place-items-center p-8">
                                        <div className="w-full max-w-xl rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-8">
                                            <FileAudio className="h-14 w-14 text-[var(--color-accent)]" />

                                            <h1 className="mt-6 text-3xl font-black uppercase tracking-[-0.05em]">
                                                {data.title}
                                            </h1>

                                            <audio
                                                controls
                                                src={audio}
                                                className="mt-6 w-full"
                                            />
                                        </div>
                                    </div>
                                ) : preview ? (
                                    <div className="relative aspect-video">
                                        <Image
                                            src={preview}
                                            alt={data.title}
                                            fill
                                            sizes="100vw"
                                            className="object-contain"
                                            unoptimized
                                            priority
                                        />
                                    </div>
                                ) : (
                                    <div className="grid min-h-[420px] place-items-center">
                                        <MediaTypeIcon
                                            type={data.media_type}
                                            className="h-20 w-20 text-[var(--color-accent)]"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <aside className="p-6">
                            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                                <MediaTypeIcon
                                    type={data.media_type}
                                    className="h-4 w-4"
                                />
                                {data.media_type}
                            </p>

                            <h1 className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-[-0.06em] md:text-5xl">
                                {data.title}
                            </h1>

                            {data.description && (
                                <p className="mt-6 max-h-[260px] overflow-y-auto pr-2 text-sm leading-7 text-[var(--color-text-muted)]">
                                    {data.description}
                                </p>
                            )}

                            <div className="mt-6 grid gap-3">
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
                                <section className="mt-6 rounded-[1.4rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4">
                                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                                        {t.keywords}
                                    </p>

                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {data.keywords.slice(0, 28).map((keyword) => (
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
                        </aside>
                    </div>
                </section>

                {assets.length ? (
                    <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
                        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--color-accent)]">
                            {t.openAsset}
                        </p>

                        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                            {assets.slice(0, 18).map((asset) => (
                                <Link
                                    key={asset}
                                    href={asset}
                                    target="_blank"
                                    className="group flex items-center justify-between gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-glass)] p-4 transition hover:border-[var(--color-accent)]"
                                >
                                    <span className="line-clamp-1 text-xs font-bold text-[var(--color-text-muted)]">
                                        {asset.split("/").at(-1)}
                                    </span>

                                    <ExternalLink className="h-4 w-4 shrink-0 text-[var(--color-accent)] transition group-hover:translate-x-1" />
                                </Link>
                            ))}
                        </div>
                    </section>
                ) : null}
            </div>
        </main>
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