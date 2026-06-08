import type {MarsLocale, MarsPhoto} from "@/src/types/mars";

import {MarsSurfacePhotoCard} from "./MarsSurfacePhotoCard";

type Props = {
    photos: MarsPhoto[];
    t: MarsLocale;
};

export const MarsSurfaceStream = ({photos, t}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[2.4rem] border border-orange-200/12 bg-white/[0.035] p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(249,115,22,.18),transparent_32%)]" />

            <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-orange-300">
                    {t.surfaceStreamTitle}
                </p>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/55">
                    {t.surfaceStreamDescription}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {photos.slice(0, 8).map((photo) => (
                        <MarsSurfacePhotoCard key={photo.id} photo={photo} t={t} />
                    ))}
                </div>
            </div>
        </section>
    );
};