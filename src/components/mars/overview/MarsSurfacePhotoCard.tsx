import Image from "next/image";

import type {MarsLocale, MarsPhoto} from "@/src/types/mars";

type Props = {
    photo: MarsPhoto;
    t: MarsLocale;
};

export const MarsSurfacePhotoCard = ({photo, t}: Props) => {
    return (
        <article className="overflow-hidden rounded-[1.8rem] border border-[var(--mars-border)] bg-[var(--mars-surface)]">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={photo.img_src}
                    alt={`${photo.rover.name} ${photo.camera.name}`}
                    fill
                    className="object-cover"
                    unoptimized
                />
            </div>

            <div className="p-5">
                <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-[var(--mars-border)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-[var(--mars-accent)]">
                        {photo.rover.name}
                    </span>

                    <span className="rounded-full border border-[var(--mars-border)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-[var(--mars-blue)]">
                        {photo.camera.name}
                    </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--mars-muted)]">
                            {t.sol}
                        </p>

                        <p className="mt-1 font-black text-[var(--mars-text)]">
                            {photo.sol}
                        </p>
                    </div>

                    <div>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--mars-muted)]">
                            Date
                        </p>

                        <p className="mt-1 font-black text-[var(--mars-text)]">
                            {photo.earth_date}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
};