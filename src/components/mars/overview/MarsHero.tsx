import Link from "next/link";
import {Activity, ArrowRight, Camera, Radio, Rocket, Satellite} from "lucide-react";

import type {MarsLocale, MarsOverview} from "@/src/types/mars";

type Props = {
    data: MarsOverview;
    t: MarsLocale;
};

const heroLinks = [
    {
        href: "/mars/rovers",
        icon: Rocket,
        labelKey: "roverNetwork",
        descKey: "heroRoversDescription",
    },
    {
        href: "/mars/photos",
        icon: Camera,
        labelKey: "surfaceImages",
        descKey: "heroPhotosDescription",
    },
    {
        href: "/mars/photos",
        icon: Satellite,
        labelKey: "nasaStream",
        descKey: "heroStreamDescription",
    },
];

export const MarsHero = ({data, t}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[3rem] border border-[var(--mars-border)] bg-[var(--mars-surface)] p-6 shadow-[var(--mars-glow)] sm:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(249,115,22,.2),transparent_30%),radial-gradient(circle_at_18%_18%,rgba(56,189,248,.12),transparent_28%)]" />
            <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-[var(--mars-accent)]/35 to-transparent" />

            <div className="relative z-10 grid min-h-[520px] items-center gap-8 xl:grid-cols-[1fr_460px]">
                <div>
                    <p className="inline-flex rounded-full border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-[var(--mars-accent)]">
                        {t.heroEyebrow}
                    </p>

                    <h1 className="mt-6 max-w-5xl text-5xl font-black uppercase leading-[0.86] tracking-[-0.08em] text-[var(--mars-text)] sm:text-7xl lg:text-8xl">
                        {t.heroTitle}
                        <span className="block bg-gradient-to-r from-[var(--mars-accent)] via-orange-500 to-red-600 bg-clip-text text-transparent">
                            {t.heroAccent}
                        </span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--mars-muted)] sm:text-base">
                        {t.heroDescription}
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                        {heroLinks.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href + item.labelKey}
                                    href={item.href}
                                    className="group rounded-[1.3rem] border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] p-4 transition hover:-translate-y-1 hover:border-[var(--mars-accent)] hover:shadow-[var(--mars-glow)]"
                                >
                                    <Icon className="h-5 w-5 text-[var(--mars-accent)]" />

                                    <p className="mt-3 text-sm font-black uppercase tracking-[-0.02em] text-[var(--mars-text)]">
                                        {t[item.labelKey as keyof MarsLocale]}
                                    </p>

                                    <p className="mt-2 text-xs leading-5 text-[var(--mars-muted)]">
                                        {t[item.descKey as keyof MarsLocale]}
                                    </p>

                                    <p className="mt-4 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--mars-accent)]">
                                        {t.details}
                                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <aside className="relative overflow-hidden rounded-[2rem] border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] p-5 backdrop-blur-xl">
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(251,146,60,.14),rgba(56,189,248,.08),transparent_70%)]" />

                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--mars-muted)]">
                            {t.telemetry}
                        </p>

                        <div className="mt-5 grid gap-3">
                            <HeroSignal href="/mars/rovers" icon={Rocket} label={t.rovers} value={data.stats.rovers} hint={t.telemetryRoversHint} />
                            <HeroSignal href="/mars/rovers" icon={Activity} label={t.activeMissions} value={data.stats.activeRovers} hint={t.telemetryActiveHint} />
                            <HeroSignal href="/mars/photos" icon={Camera} label={t.loadedPhotos} value={data.stats.totalPhotos} hint={t.telemetryPhotosHint} />
                            <HeroSignal href="/mars/photos" icon={Radio} label={t.latestTransmission} value={data.stats.latestEarthDate ?? "—"} hint={t.telemetryLatestHint} />
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
};

const HeroSignal = ({
                        href,
                        icon: Icon,
                        label,
                        value,
                        hint,
                    }: {
    href: string;
    icon: typeof Rocket;
    label: string;
    value: string | number;
    hint: string;
}) => (
    <Link
        href={href}
        className="group rounded-[1.3rem] border border-[var(--mars-border)] bg-[var(--mars-surface)] p-4 transition hover:border-[var(--mars-accent)] hover:shadow-[var(--mars-glow)]"
    >
        <Icon className="h-4 w-4 text-[var(--mars-accent)]" />

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--mars-muted)]">
            {label}
        </p>

        <p className="mt-1 truncate text-xl font-black text-[var(--mars-text)]">
            {value}
        </p>

        <p className="mt-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--mars-accent)]">
            {hint}
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
        </p>
    </Link>
);