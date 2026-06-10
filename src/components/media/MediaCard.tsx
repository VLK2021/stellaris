import Image from "next/image";
import Link from "next/link";
import {ExternalLink, FileAudio, ImageIcon, Video} from "lucide-react";

import type {MediaItem, MediaLocale, MediaType} from "@/src/types/media";

type Props = {
    item: MediaItem;
    onSelect: (item: MediaItem) => void;
    t: MediaLocale;
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

export const MediaCard = ({item, onSelect, t}: Props) => {
    const data = item.data[0];

    if (!data) return null;

    const preview = item.links?.[0]?.href ?? null;

    return (
        <article className="group overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-glass)] transition hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]">
            <button
                type="button"
                onClick={() => onSelect(item)}
                className="block w-full text-left"
            >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-card-deep)]">
                    {preview ? (
                        <Image
                            src={preview}
                            alt={data.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                            unoptimized
                        />
                    ) : (
                        <div className="grid h-full place-items-center">
                            <MediaTypeIcon
                                type={data.media_type}
                                className="h-12 w-12 text-[var(--color-accent)]"
                            />
                        </div>
                    )}

                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white backdrop-blur-md">
                        <MediaTypeIcon
                            type={data.media_type}
                            className="h-3.5 w-3.5"
                        />
                        {data.media_type}
                    </span>
                </div>
            </button>

            <div className="p-5">
                <h3 className="line-clamp-2 text-xl font-black uppercase tracking-[-0.04em] text-[var(--color-text)]">
                    {data.title}
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                    {data.center && <Badge value={data.center} />}
                    {data.date_created && (
                        <Badge value={data.date_created.slice(0, 10)} />
                    )}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() => onSelect(item)}
                        className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-accent)] transition hover:border-[var(--color-accent)]"
                    >
                        {t.details}
                    </button>

                    <Link
                        href={`/media/${encodeURIComponent(data.nasa_id)}`}
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-[var(--shadow-glow)]"
                    >
                        {t.openAsset}
                        <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                </div>
            </div>
        </article>
    );
};

const Badge = ({value}: {value: string}) => (
    <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
        {value}
    </span>
);