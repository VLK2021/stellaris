import type {MarsLocale, MarsPhoto} from "@/src/types/mars";

import {MarsSurfacePhotoCard} from "./MarsSurfacePhotoCard";

type Props = {
    photos: MarsPhoto[];
    t: MarsLocale;
};

export const MarsSurfaceStream = ({photos, t}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[2.4rem] border border-[var(--mars-border)] bg-[var(--mars-surface)] p-6 shadow-[var(--mars-glow)]">
            <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--mars-accent)]">
                    {t.surfaceStreamTitle}
                </p>

                <p className="mt-3 text-sm leading-7 text-[var(--mars-muted)]">
                    {t.surfaceStreamDescription}
                </p>

                <div className="mt-8 grid gap-5 lg:grid-cols-3">
                    {photos.slice(0, 9).map((photo) => (
                        <MarsSurfacePhotoCard
                            key={photo.id}
                            photo={photo}
                            t={t}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};