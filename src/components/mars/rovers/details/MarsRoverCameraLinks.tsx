import Link from "next/link";
import {ArrowRight, Camera} from "lucide-react";

import type {
    MarsLocale,
    MarsRoverSummary,
} from "@/src/types/mars";

type Props = {
    rover: MarsRoverSummary;
    t: MarsLocale;
};

export const MarsRoverCameraLinks = ({rover, t}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[2.2rem] border border-[var(--mars-border)] bg-[var(--mars-surface)] p-6 shadow-[var(--mars-glow)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(56,189,248,.10),transparent_34%)]" />

            <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--mars-accent)]">
                    {t.cameraArchiveByRover}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {rover.cameras.map((camera) => (
                        <Link
                            key={camera}
                            href={`/mars/photos?rover=${rover.name}&camera=${encodeURIComponent(camera)}&earthDate=${rover.defaultEarthDate}`}
                            className="group rounded-[1.4rem] border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] p-4 transition hover:-translate-y-1 hover:border-[var(--mars-accent)] hover:shadow-[var(--mars-glow)]"
                        >
                            <Camera className="h-5 w-5 text-[var(--mars-accent)]" />

                            <p className="mt-4 text-xl font-black uppercase tracking-[-0.04em] text-[var(--mars-text)]">
                                {camera}
                            </p>

                            <p className="mt-4 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--mars-accent)]">
                                {t.openCameraPhotos}
                                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};