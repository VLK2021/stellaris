"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ExternalLink,
    FileAudio,
    ImageIcon,
    Video,
} from "lucide-react";

import {BackButton} from "@/src/common/BackButton";
import {useLanguage} from "@/src/context/LanguageContext";

import type {
    MediaItem,
    MediaLocale,
    MediaType,
} from "@/src/types/media";

type Props = {
    item: MediaItem;
    assets: string[];
    preview: string | null;
    video: string | null;
    audio: string | null;
};

type ResourceLink = {
    href: string;
    label: string;
    icon: "video" | "audio" | "image" | "external";
    variant: "primary" | "secondary";
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

const getFileName = (href: string) => {
    return decodeURIComponent(href.split("/").at(-1) ?? href);
};

const getCaptionAsset = (assets: string[]) => {
    return assets.find((asset) => {
        const file = asset.toLowerCase();

        return file.endsWith(".srt") || file.endsWith(".vtt");
    }) ?? null;
};

const getMetadataAsset = (assets: string[]) => {
    return assets.find((asset) => {
        return asset.toLowerCase().endsWith("metadata.json");
    }) ?? null;
};

const buildResourceLinks = ({
                                assets,
                                preview,
                                video,
                                audio,
                            }: {
    assets: string[];
    preview: string | null;
    video: string | null;
    audio: string | null;
}): ResourceLink[] => {
    const resources: ResourceLink[] = [];
    const caption = getCaptionAsset(assets);
    const metadata = getMetadataAsset(assets);

    if (video) {
        resources.push({
            href: video,
            label: "Watch original video",
            icon: "video",
            variant: "primary",
        });
    }

    if (audio) {
        resources.push({
            href: audio,
            label: "Listen audio",
            icon: "audio",
            variant: "primary",
        });
    }

    if (preview) {
        resources.push({
            href: preview,
            label: "Open full image",
            icon: "image",
            variant: video || audio ? "secondary" : "primary",
        });
    }

    if (caption) {
        resources.push({
            href: caption,
            label: "Open captions",
            icon: "external",
            variant: "secondary",
        });
    }

    if (metadata) {
        resources.push({
            href: metadata,
            label: "Open metadata",
            icon: "external",
            variant: "secondary",
        });
    }

    return resources;
};

const ResourceIcon = ({
                          icon,
                          className,
                      }: {
    icon: ResourceLink["icon"];
    className?: string;
}) => {
    if (icon === "video") return <Video className={className} />;
    if (icon === "audio") return <FileAudio className={className} />;
    if (icon === "image") return <ImageIcon className={className} />;

    return <ExternalLink className={className} />;
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

    const uniqueAssets = [...new Set(assets)];
    const resources = buildResourceLinks({
        assets: uniqueAssets,
        preview,
        video,
        audio,
    });

    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--body-bg)] text-[var(--color-text)]">
            <div className="pointer-events-none fixed inset-0 opacity-70">
                <div
                    className="absolute inset-0"
                    style={{background: "var(--hero-bg)"}}
                />
                <div className="absolute left-[-10%] top-[18%] h-[520px] w-[520px] rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
                <div className="absolute right-[-12%] top-[8%] h-[620px] w-[620px] rounded-full bg-[var(--color-brand-secondary)]/10 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto grid max-w-[1580px] gap-6 px-4 py-8 sm:px-6 lg:px-8">
                <BackButton label={t.back} />

                <section className="relative overflow-hidden rounded-[2.8rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(56,189,248,.15),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(139,92,246,.14),transparent_30%)]" />

                    <div className="relative z-10">
                        <div className="relative min-h-[56vh] bg-black">
                            {video ? (
                                <video
                                    controls
                                    src={video}
                                    poster={preview ?? undefined}
                                    className="h-[56vh] w-full bg-black object-contain"
                                />
                            ) : audio ? (
                                <div className="grid min-h-[56vh] place-items-center p-6">
                                    <div className="w-full max-w-2xl rounded-[2rem] border border-white/15 bg-white/10 p-8 text-white backdrop-blur-xl">
                                        <FileAudio className="h-16 w-16 text-[var(--color-accent)]" />

                                        <h1 className="mt-6 text-3xl font-black uppercase tracking-[-0.06em] md:text-4xl">
                                            {data.title}
                                        </h1>

                                        <audio
                                            controls
                                            src={audio}
                                            className="mt-8 w-full"
                                        />
                                    </div>
                                </div>
                            ) : preview ? (
                                <div className="relative h-[56vh]">
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
                                <div className="grid min-h-[56vh] place-items-center">
                                    <MediaTypeIcon
                                        type={data.media_type}
                                        className="h-24 w-24 text-[var(--color-accent)]"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="p-6 md:p-8">
                            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                                <MediaTypeIcon
                                    type={data.media_type}
                                    className="h-4 w-4"
                                />
                                {data.media_type}
                            </p>

                            <h1 className="mt-5 max-w-4xl text-3xl font-black uppercase leading-[0.95] tracking-[-0.05em] md:text-5xl">
                                {data.title}
                            </h1>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <Pill label={t.nasaId} value={data.nasa_id} />
                                <Pill label={t.center} value={data.center} />
                                <Pill
                                    label={t.dateCreated}
                                    value={data.date_created?.slice(0, 10)}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {data.description && (
                    <section className="rounded-[2.2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)] md:p-8">
                        <p className="max-w-5xl text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
                            {data.description}
                        </p>
                    </section>
                )}

                <section className="rounded-[2.2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)]">
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--color-accent)]">
                        Metadata
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <Pill label={t.location} value={data.location} />
                        <Pill
                            label={t.photographer}
                            value={data.photographer}
                        />
                        <Pill label={t.mediaType} value={data.media_type} />
                    </div>

                    {data.keywords?.length ? (
                        <div className="mt-6 flex flex-wrap gap-2">
                            {data.keywords.slice(0, 30).map((keyword) => (
                                <span
                                    key={keyword}
                                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[var(--color-accent)]"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    ) : null}
                </section>

                {resources.length ? (
                    <section className="rounded-[2.2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)]">
                        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--color-accent)]">
                            Media Resources
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                            {resources.map((resource) => (
                                <Link
                                    key={`${resource.href}-${resource.label}`}
                                    href={resource.href}
                                    target="_blank"
                                    className={
                                        resource.variant === "primary"
                                            ? "inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-[var(--shadow-glow)] transition hover:scale-[1.02]"
                                            : "inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-accent)] transition hover:border-[var(--color-accent)]"
                                    }
                                    title={getFileName(resource.href)}
                                >
                                    <ResourceIcon
                                        icon={resource.icon}
                                        className="h-4 w-4"
                                    />
                                    {resource.label}
                                </Link>
                            ))}
                        </div>
                    </section>
                ) : null}
            </div>
        </main>
    );
};

const Pill = ({
                  label,
                  value,
              }: {
    label: string;
    value?: string;
}) => {
    if (!value) return null;

    return (
        <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2">
            <span className="text-[9px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                {label}:{" "}
            </span>
            <span className="text-xs font-black text-[var(--color-text)]">
                {value}
            </span>
        </div>
    );
};