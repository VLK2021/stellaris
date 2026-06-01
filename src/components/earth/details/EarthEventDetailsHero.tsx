import {Calendar, Database, MapPin, RadioTower} from "lucide-react";

import type {EarthEvent} from "@/src/types/earth/earth.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

type Props = {
    event: EarthEvent;
    t: EarthLocale;
};

export const EarthEventDetailsHero = ({event, t}: Props) => {
    return (
        <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)]">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                {t.details.nasaEvent}
            </p>

            <div className="mt-4 flex flex-wrap items-start justify-between gap-5">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-[-0.05em]">
                        {event.title}
                    </h1>

                    <p className="mt-3 text-sm text-[var(--color-text-muted)]">
                        {event.description ?? t.details.descriptionFallback}
                    </p>
                </div>

                <span className="rounded-full bg-[var(--color-accent-soft)] px-4 py-2 text-xs font-black uppercase text-[var(--color-accent)]">
                    {event.status === "open" ? t.details.open : t.details.closed}
                </span>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <Info icon={Database} label={t.details.id} value={event.id} />
                <Info icon={Calendar} label={t.details.latestDate} value={event.latestDate ?? "—"} />
                <Info icon={MapPin} label={t.details.coordinates} value={event.coordinates?.join(" / ") ?? "—"} />
                <Info icon={RadioTower} label={t.details.geometryPoints} value={String(event.geometryCount)} />
            </div>
        </section>
    );
};

const Info = ({
                  icon: Icon,
                  label,
                  value,
              }: {
    icon: typeof Database;
    label: string;
    value: string;
}) => (
    <div className="rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4">
        <Icon className="h-4 w-4 text-[var(--color-accent)]" />

        <p className="mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {label}
        </p>

        <p className="mt-1 break-words text-sm font-bold">
            {value}
        </p>
    </div>
);