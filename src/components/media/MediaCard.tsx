import Image from "next/image";
import {FileAudio, ImageIcon, Video} from "lucide-react";

import type {MediaItem, MediaLocale, MediaType} from "@/src/types/media";

type Props = {
    item: MediaItem;
    onSelect: (item: MediaItem) => void;
    t: MediaLocale;
};

const getIcon = (type: MediaType) => {
    if (type === "video") return Video;
    if (type === "audio") return FileAudio;
    return ImageIcon;
};

export const MediaCard = ({item, onSelect, t}: Props) => {
    const data = item.data[0];
    const preview = item.links?.[0]?.href ?? null;
    const Icon = getIcon(data.media_type);

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
                            <Icon className="h-12 w-12 text-[var(--color-accent)]" />
                        </div>
                    )}

                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white backdrop-blur-md">
                        <Icon className="h-3.5 w-3.5" />
                        {data.media_type}
                    </span>
                </div>

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

                    <p className="mt-5 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-accent)]">
                        {t.details}
                    </p>
                </div>
            </button>
        </article>
    );
};

const Badge = ({value}: {value: string}) => (
    <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
        {value}
    </span>
);