import Image from "next/image";
import {Camera} from "lucide-react";

import type {MarsLocale, MarsPhoto} from "@/src/types/mars";

type Props = {
    photo: MarsPhoto;
    t: MarsLocale;
};

export const MarsSurfacePhotoCard = ({photo, t}: Props) => {
    return (
        <article className="group overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/30 transition hover:border-orange-300/45 hover:shadow-[0_0_44px_rgba(249,115,22,.16)]">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={photo.img_src}
                    alt={`${photo.rover.name} ${photo.camera.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="p-4">
                <Camera className="h-4 w-4 text-orange-300" />

                <p className="mt-3 text-sm font-black uppercase text-white">
                    {photo.rover.name}
                </p>

                <p className="mt-1 truncate text-xs font-bold text-white/45">
                    {photo.camera.full_name}
                </p>

                <p className="mt-3 text-[10px] font-black uppercase tracking-[0.16em] text-orange-300">
                    {t.sol} {photo.sol} · {photo.earth_date}
                </p>
            </div>
        </article>
    );
};