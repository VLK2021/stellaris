import Link from "next/link";
import {ArrowRight, Camera} from "lucide-react";

import type {MarsLocale, MarsRoverSummary} from "@/src/types/mars";

type Props = {
    rovers: MarsRoverSummary[];
    t: MarsLocale;
};

const CAMERA_DESCRIPTIONS: Record<string, string> = {
    FHAZ: "Front Hazard Avoidance Camera",
    RHAZ: "Rear Hazard Avoidance Camera",
    NAVCAM: "Navigation Camera",
    NAVCAM_LEFT: "Navigation Camera Left",
    NAVCAM_RIGHT: "Navigation Camera Right",
    CHEMCAM: "Chemistry & Laser Analysis",
    MAST: "Mast Camera",
    MAHLI: "Mars Hand Lens Imager",
    MARDI: "Descent Imager",
    PANCAM: "Panoramic Camera",
    MINITES: "Thermal Emission Spectrometer",
    MCZ_LEFT: "Mastcam-Z Left",
    MCZ_RIGHT: "Mastcam-Z Right",
    HAZCAM_LEFT_FRONT: "Front Left Hazard Camera",
    HAZCAM_RIGHT_FRONT: "Front Right Hazard Camera",
    EDL_RUCAM: "Entry Descent Landing Camera",
    EDL_RDCAM: "Descent Camera",
};

export const MarsCameraNetwork = ({rovers, t}: Props) => {
    const cameras = Array.from(new Set(rovers.flatMap((rover) => rover.cameras))).sort();

    return (
        <section className="relative overflow-hidden rounded-[2.4rem] border border-[var(--mars-border)] bg-[var(--mars-surface)] p-6 shadow-[var(--mars-glow)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(56,189,248,.12),transparent_34%)]" />

            <div className="relative z-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--mars-accent)]">
                            {t.cameraNetworkTitle}
                        </p>

                        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--mars-muted)]">
                            {t.cameraNetworkDescription}
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

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {cameras.map((camera) => (
                        <Link
                            key={camera}
                            href={`/mars/photos?camera=${encodeURIComponent(camera)}`}
                            className="group relative overflow-hidden rounded-[1.5rem] border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] p-5 transition hover:-translate-y-1 hover:border-[var(--mars-accent)] hover:shadow-[var(--mars-glow)]"
                        >
                            <div className="relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--mars-border)] bg-[var(--mars-surface)] text-[var(--mars-accent)]">
                                        <Camera className="h-4 w-4" />
                                    </div>

                                    <span className="text-sm font-black uppercase tracking-[0.16em] text-[var(--mars-accent)]">
                                        {camera}
                                    </span>
                                </div>

                                <p className="mt-4 text-sm font-black text-[var(--mars-text)]">
                                    {CAMERA_DESCRIPTIONS[camera] ?? t.cameraFallbackName}
                                </p>

                                <p className="mt-2 text-xs leading-5 text-[var(--mars-muted)]">
                                    {t.cameraArchiveSoon}
                                </p>

                                <p className="mt-5 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--mars-accent)]">
                                    {t.openCameraArchive}
                                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};