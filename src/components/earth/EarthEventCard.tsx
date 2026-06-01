"use client";

import Link from "next/link";
import {ArrowUpRight, Calendar, MapPin, RadioTower, Tag} from "lucide-react";

import type {EarthEvent} from "@/src/types/earth/earth.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

type Props = {
    event: EarthEvent;
    t: EarthLocale;
};

export const EarthEventCard = ({event, t}: Props) => {
    return (
        <Link
            href={`/earth/${encodeURIComponent(event.id)}`}
            className="group flex h-[360px] min-w-[380px] max-w-[380px] flex-col justify-between overflow-hidden rounded-[1.45rem] border border-[var(--color-border)] bg-[linear-gradient(145deg,var(--color-glass),rgba(14,165,233,0.04))] p-5 transition hover:border-[var(--color-accent)]/80 hover:shadow-[var(--shadow-glow)]"
        >
            <div className="min-h-0">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                            {event.status === "open" ? t.details.open : t.details.closed}
                        </p>

                        <h3 className="mt-3 line-clamp-2 min-h-[58px] text-[1.35rem] font-black leading-[1.18] text-[var(--color-text)]">
                            {event.title}
                        </h3>
                    </div>

                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-accent)] transition group-hover:rotate-45 group-hover:border-[var(--color-accent)]">
                        <ArrowUpRight className="h-4 w-4" />
                    </span>
                </div>

                <div className="mt-4 grid gap-2 text-[13px] text-[var(--color-text-muted)]">
                    <Info icon={Tag} text={`${t.details.category}: ${event.categories.map((item) => item.title).join(", ") || "—"}`} />
                    <Info icon={MapPin} text={`${t.details.coordinates}: ${event.coordinates?.join(" / ") ?? "—"}`} />
                    <Info icon={RadioTower} text={`${t.details.geometryPoints}: ${event.geometryCount}`} />
                    <Info icon={Calendar} text={`${t.details.latestDate}: ${event.latestDate ?? "—"}`} />
                </div>
            </div>

            <div className="mt-4 h-[75px] shrink-0 rounded-[1rem] border border-[var(--color-border)] bg-black/10 p-3">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    {t.details.sources}: {event.sourceCount}
                </p>

                <p className="mt-2 line-clamp-2 text-sm font-bold leading-5 text-[var(--color-accent)]">
                    {event.sources.map((source) => source.id).join(", ") || "—"}
                </p>
            </div>
        </Link>
    );
};

const Info = ({
                  icon: Icon,
                  text,
              }: {
    icon: typeof MapPin;
    text: string;
}) => {
    return (
        <p className="flex min-w-0 items-start gap-2">
            <Icon className="mt-[2px] h-4 w-4 shrink-0 text-[var(--color-accent)]" />
            <span className="line-clamp-2 leading-5">{text}</span>
        </p>
    );
};