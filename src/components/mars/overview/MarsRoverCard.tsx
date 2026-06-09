import Link from "next/link";
import {ArrowRight, Camera, Calendar, Rocket} from "lucide-react";

import type {MarsLocale, MarsRoverSummary} from "@/src/types/mars";

type Props = {
    rover: MarsRoverSummary;
    t: MarsLocale;
};

export const MarsRoverCard = ({rover, t}: Props) => {
    return (
        <article className="group relative overflow-hidden rounded-[1.8rem] border border-[var(--mars-border)] bg-[var(--mars-surface)] p-6 transition hover:-translate-y-1 hover:border-[var(--mars-accent)] hover:shadow-[var(--mars-glow)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,.15),transparent_35%)] opacity-0 transition group-hover:opacity-100" />

            <div className="relative z-10">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-black uppercase tracking-[-0.04em] text-[var(--mars-text)]">
                        {rover.label}
                    </h3>

                    <span className="rounded-full border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--mars-accent)]">
                        {rover.status === "active" ? t.active : t.complete}
                    </span>
                </div>

                <div className="mt-6 grid gap-3">
                    <Line icon={Rocket} label={t.launch} value={rover.launchDate} />
                    <Line icon={Calendar} label={t.landing} value={rover.landingDate} />
                    <Line icon={Camera} label={t.cameras} value={rover.cameras.length} />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <Mini label={t.maxSol} value={rover.maxSol} />
                    <Mini label={t.maxDate} value={rover.maxDate} />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <LinkButton href={`/mars/rovers/${rover.name}`} label={t.details} />
                    <LinkButton href={`/mars/photos?rover=${rover.name}`} label={t.openPhotoArchive} />
                </div>
            </div>
        </article>
    );
};

const Line = ({icon: Icon, label, value}: {icon: typeof Rocket; label: string; value: string | number}) => (
    <div className="flex items-center gap-3 text-sm text-[var(--mars-muted)]">
        <Icon className="h-4 w-4 text-[var(--mars-accent)]" />
        <span>{label}: {value}</span>
    </div>
);

const Mini = ({label, value}: {label: string; value: string | number}) => (
    <div className="rounded-xl border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] p-3">
        <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--mars-muted)]">
            {label}
        </p>

        <p className="mt-2 truncate text-sm font-black text-[var(--mars-text)]">
            {value}
        </p>
    </div>
);

const LinkButton = ({href, label}: {href: string; label: string}) => (
    <Link
        href={href}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--mars-accent)] transition hover:border-[var(--mars-accent)]"
    >
        {label}
        <ArrowRight className="h-3.5 w-3.5" />
    </Link>
);