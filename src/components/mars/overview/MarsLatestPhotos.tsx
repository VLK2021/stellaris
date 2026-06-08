import Image from "next/image";
import {Camera} from "lucide-react";

import type {MarsPhoto} from "@/src/types/mars";

type Props = {
    photos: MarsPhoto[];
};

export const MarsLatestPhotos = ({photos}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[2.2rem] border border-orange-200/12 bg-white/[0.035] p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(249,115,22,.18),transparent_32%)]" />

            <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-orange-300">
                    Latest Surface Stream
                </p>

                <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.06em] text-white">
                    Останні знімки поверхні
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {photos.slice(0, 8).map((photo) => (
                        <article
                            key={photo.id}
                            className="group overflow-hidden rounded-[1.4rem] border border-orange-200/12 bg-black/30"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={photo.img_src}
                                    alt={`${photo.rover.name} ${photo.camera.name}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                    className="object-cover transition duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="p-4">
                                <Camera className="h-4 w-4 text-orange-300" />

                                <p className="mt-2 text-sm font-black uppercase text-white">
                                    {photo.rover.name}
                                </p>

                                <p className="mt-1 truncate text-xs font-bold text-white/45">
                                    {photo.camera.full_name}
                                </p>

                                <p className="mt-2 text-[10px] font-black uppercase tracking-[0.16em] text-orange-300">
                                    Sol {photo.sol} · {photo.earth_date}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};