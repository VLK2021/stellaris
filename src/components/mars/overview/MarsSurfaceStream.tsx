import Link from "next/link";
import {ArrowRight} from "lucide-react";

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
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--mars-accent)]">
                            {t.surfaceStreamTitle}
                        </p>

                        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--mars-muted)]">
                            {t.surfaceStreamDescription}
                        </p>
                    </div>

                    <Link
                        href="/mars/photos"
                        className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--mars-accent)] transition hover:border-[var(--mars-accent)] hover:shadow-[var(--mars-glow)]"
                    >
                        {t.openPhotoArchive}
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>

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