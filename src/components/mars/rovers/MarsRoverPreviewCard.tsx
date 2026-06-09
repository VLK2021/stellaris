import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    Camera,
    CircleDot,
    Rocket,
} from "lucide-react";

import type {MarsLocale, MarsRoverSummary} from "@/src/types/mars";

type Props = {
    rover: MarsRoverSummary;
    t: MarsLocale;
};

export const MarsRoverPreviewCard = ({rover, t}: Props) => {
    const roverPhotosHref = `/mars/photos?rover=${rover.name}&earthDate=${rover.defaultEarthDate}`;

    return (
        <article className="relative overflow-hidden rounded-[2rem] border border-[var(--mars-border)] bg-[var(--mars-surface)] p-5 shadow-[var(--mars-glow)] transition hover:border-[var(--mars-accent)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(249,115,22,.16),transparent_34%)]" />

            <div className="relative z-10 grid gap-5 lg:grid-cols-[1fr_260px]">
                <div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Rocket className="h-5 w-5 text-[var(--mars-accent)]" />

                        <span className="rounded-full border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--mars-accent)]">
                            {rover.status === "active" ? t.active : t.complete}
                        </span>
                    </div>

                    <h2 className="mt-5 text-4xl font-black uppercase tracking-[-0.07em] text-[var(--mars-text)]">
                        {rover.label}
                    </h2>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <Info
                            icon={CalendarDays}
                            label={t.launch}
                            value={rover.launchDate}
                        />

                        <Info
                            icon={CalendarDays}
                            label={t.landing}
                            value={rover.landingDate}
                        />

                        <Info
                            icon={CircleDot}
                            label={t.maxSol}
                            value={rover.maxSol}
                        />

                        <Info
                            icon={Camera}
                            label={t.availableCameraCount}
                            value={rover.cameras.length}
                        />
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <LinkButton
                            href={`/mars/rovers/${rover.name}`}
                            label={t.roverDetails}
                        />

                        <LinkButton
                            href={roverPhotosHref}
                            label={t.openRoverPhotos}
                        />
                    </div>
                </div>

                <aside className="rounded-[1.5rem] border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] p-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--mars-muted)]">
                        {t.availableCameras}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {rover.cameras.slice(0, 8).map((camera) => {
                            const cameraHref = `/mars/photos?rover=${rover.name}&camera=${encodeURIComponent(
                                camera,
                            )}&earthDate=${rover.defaultEarthDate}`;

                            return (
                                <Link
                                    key={camera}
                                    href={cameraHref}
                                    className="rounded-full border border-[var(--mars-border)] bg-[var(--mars-surface)] px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[var(--mars-accent)] transition hover:border-[var(--mars-accent)]"
                                >
                                    {camera}
                                </Link>
                            );
                        })}
                    </div>
                </aside>
            </div>
        </article>
    );
};

const Info = ({
                  icon: Icon,
                  label,
                  value,
              }: {
    icon: typeof CalendarDays;
    label: string;
    value: string | number;
}) => (
    <div className="rounded-xl border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] p-3">
        <Icon className="h-4 w-4 text-[var(--mars-accent)]" />

        <p className="mt-2 text-[9px] font-black uppercase tracking-[0.16em] text-[var(--mars-muted)]">
            {label}
        </p>

        <p className="mt-1 truncate text-sm font-black text-[var(--mars-text)]">
            {value}
        </p>
    </div>
);

const LinkButton = ({
                        href,
                        label,
                    }: {
    href: string;
    label: string;
}) => (
    <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--mars-accent)] transition hover:border-[var(--mars-accent)] hover:shadow-[var(--mars-glow)]"
    >
        {label}
        <ArrowRight className="h-3.5 w-3.5" />
    </Link>
);