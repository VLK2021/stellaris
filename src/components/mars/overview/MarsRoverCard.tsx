import {Camera, Calendar, Rocket} from "lucide-react";

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
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black uppercase tracking-[-0.04em] text-[var(--mars-text)]">
                        {rover.label}
                    </h3>

                    <span
                        className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]
                        ${
                            rover.status === "active"
                                ? "bg-emerald-500/15 text-emerald-400"
                                : "bg-slate-500/15 text-slate-400"
                        }`}
                    >
                        {rover.status === "active" ? t.active : t.complete}
                    </span>
                </div>

                <div className="mt-6 grid gap-3">
                    <div className="flex items-center gap-3 text-sm text-[var(--mars-muted)]">
                        <Rocket className="h-4 w-4 text-[var(--mars-accent)]" />
                        <span>{t.launch}: {rover.launchDate}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-[var(--mars-muted)]">
                        <Calendar className="h-4 w-4 text-[var(--mars-accent)]" />
                        <span>{t.landing}: {rover.landingDate}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-[var(--mars-muted)]">
                        <Camera className="h-4 w-4 text-[var(--mars-accent)]" />
                        <span>{t.cameras}: {rover.cameras.length}</span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] p-3">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--mars-muted)]">
                            {t.maxSol}
                        </p>

                        <p className="mt-2 text-xl font-black text-[var(--mars-text)]">
                            {rover.maxSol}
                        </p>
                    </div>

                    <div className="rounded-xl border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] p-3">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--mars-muted)]">
                            {t.maxDate}
                        </p>

                        <p className="mt-2 text-sm font-black text-[var(--mars-text)]">
                            {rover.maxDate}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
};