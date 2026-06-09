import type {MarsLocale, MarsPhoto} from "@/src/types/mars";

import {MarsPhotoCard} from "./MarsPhotoCard";

type Props = {
    photos: MarsPhoto[];
    error: string | null;
    t: MarsLocale;
};

export const MarsPhotosGallery = ({photos, error, t}: Props) => {
    if (error) {
        return (
            <section className="rounded-[2rem] border border-red-400/30 bg-red-500/10 p-6 text-red-300">
                {error}
            </section>
        );
    }

    if (!photos.length) {
        return (
            <section className="rounded-[2rem] border border-[var(--mars-border)] bg-[var(--mars-surface)] p-8 text-center text-[var(--mars-muted)]">
                {t.emptyPhotos}
            </section>
        );
    }

    return (
        <section className="rounded-[2.2rem] border border-[var(--mars-border)] bg-[var(--mars-surface)] p-5 shadow-[var(--mars-glow)]">
            <div className="flex items-center justify-between gap-4">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--mars-accent)]">
                    {t.gallery}
                </p>

                <span className="rounded-full border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--mars-muted)]">
                    {t.photosFound}: {photos.length}
                </span>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {photos.map((photo) => (
                    <MarsPhotoCard key={photo.id} photo={photo} t={t} />
                ))}
            </div>
        </section>
    );
};