import {Camera} from "lucide-react";

import type {MarsLocale, MarsRoverSummary} from "@/src/types/mars";

type Props = {
    rovers: MarsRoverSummary[];
    t: MarsLocale;
};

export const MarsCameraNetwork = ({rovers, t}: Props) => {
    const cameras = Array.from(new Set(rovers.flatMap((rover) => rover.cameras))).sort();

    return (
        <section className="relative overflow-hidden rounded-[2.4rem] border border-orange-200/12 bg-white/[0.035] p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(56,189,248,.10),transparent_34%)]" />

            <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-orange-300">
                    {t.cameraNetworkTitle}
                </p>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/55">
                    {t.cameraNetworkDescription}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                    {cameras.map((camera) => (
                        <span
                            key={camera}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white/65"
                        >
                            <Camera className="h-3.5 w-3.5 text-orange-300" />
                            {camera}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};