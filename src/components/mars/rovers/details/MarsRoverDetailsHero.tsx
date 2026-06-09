import Link from "next/link";
import {ArrowRight, Camera, Rocket} from "lucide-react";

import type {
    MarsLocale,
    MarsRoverSummary,
} from "@/src/types/mars";

type Props = {
    rover: MarsRoverSummary;
    t: MarsLocale;
};

export const MarsRoverDetailsHero = ({rover, t}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[2.8rem] border border-[var(--mars-border)] bg-[var(--mars-surface)] p-6 shadow-[var(--mars-glow)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_24%,rgba(249,115,22,.22),transparent_34%),radial-gradient(circle_at_14%_0%,rgba(56,189,248,.10),transparent_30%)]" />

            <div className="relative z-10 grid gap-8 xl:grid-cols-[1fr_360px]">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--mars-accent)]">
                        {t.roverProfile}
                    </p>

                    <h1 className="mt-4 text-6xl font-black uppercase leading-[0.85] tracking-[-0.08em] text-[var(--mars-text)] md:text-8xl">
                        {rover.label}
                    </h1>

                    <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--mars-muted)]">
                        {t.roverMissionProfile}: {rover.label}. {t.missionStatus}:{" "}
                        {rover.status === "active" ? t.active : t.complete}.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href={`/mars/photos?rover=${rover.name}&earthDate=${rover.defaultEarthDate}`}
                            className="inline-flex items-center gap-2 rounded-full border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--mars-accent)] transition hover:border-[var(--mars-accent)] hover:shadow-[var(--mars-glow)]"
                        >
                            {t.roverPhotoArchive}
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                </div>

                <aside className="rounded-[2rem] border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] p-5">
                    <Rocket className="h-6 w-6 text-[var(--mars-accent)]" />

                    <p className="mt-5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mars-muted)]">
                        {t.availableCameraCount}
                    </p>

                    <p className="mt-2 text-5xl font-black text-[var(--mars-text)]">
                        {rover.cameras.length}
                    </p>

                    <div className="mt-6 rounded-[1.2rem] border border-[var(--mars-border)] bg-[var(--mars-surface)] p-4">
                        <Camera className="h-4 w-4 text-[var(--mars-accent)]" />

                        <p className="mt-3 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--mars-muted)]">
                            {t.defaultPhotoDate}
                        </p>

                        <p className="mt-1 font-black text-[var(--mars-text)]">
                            {rover.defaultEarthDate}
                        </p>
                    </div>
                </aside>
            </div>
        </section>
    );
};