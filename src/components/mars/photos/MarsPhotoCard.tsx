import Image from "next/image";
import Link from "next/link";
import {ExternalLink} from "lucide-react";

import type {MarsLocale, MarsPhoto} from "@/src/types/mars";

type Props = {
    photo: MarsPhoto;
    t: MarsLocale;
};

export const MarsPhotoCard = ({photo, t}: Props) => {
    return (
        <article className="group overflow-hidden rounded-[1.8rem] border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] transition hover:-translate-y-1 hover:border-[var(--mars-accent)] hover:shadow-[var(--mars-glow)]">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={photo.img_src}
                    alt={`${photo.rover.name} ${photo.camera.full_name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                    unoptimized
                />
            </div>

            <div className="p-5">
                <div className="flex flex-wrap gap-2">
                    <Badge value={photo.rover.name} />
                    <Badge value={photo.camera.name} />
                    <Badge value={`${t.sol} ${photo.sol}`} />
                </div>

                <p className="mt-4 text-sm font-black text-[var(--mars-text)]">
                    {photo.camera.full_name}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                    <Meta label={t.earthDate} value={photo.earth_date} />
                    <Meta label={t.rover} value={photo.rover.name} />
                    <Meta label={t.camera} value={photo.camera.name} />
                    <Meta label="ID" value={photo.id} />
                </div>

                <Link
                    href={photo.img_src}
                    target="_blank"
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--mars-border)] bg-[var(--mars-surface)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--mars-accent)] transition hover:border-[var(--mars-accent)]"
                >
                    {t.openOriginal}
                    <ExternalLink className="h-3.5 w-3.5" />
                </Link>
            </div>
        </article>
    );
};

const Badge = ({value}: {value: string | number}) => (
    <span className="rounded-full border border-[var(--mars-border)] bg-[var(--mars-surface)] px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[var(--mars-accent)]">
        {value}
    </span>
);

const Meta = ({label, value}: {label: string; value: string | number}) => (
    <div className="rounded-xl border border-[var(--mars-border)] bg-[var(--mars-surface)] p-3">
        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[var(--mars-muted)]">
            {label}
        </p>
        <p className="mt-1 truncate text-xs font-black text-[var(--mars-text)]">
            {value}
        </p>
    </div>
);