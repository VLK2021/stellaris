import Link from "next/link";
import {ArrowUpRight} from "lucide-react";

import type {EarthOverview} from "@/src/types/earth/earth.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

import {EarthPanel} from "./EarthPanel";

type Props = {
    data: EarthOverview;
    title: string;
    t: EarthLocale;
};

export const EarthEventsTab = ({data, title, t}: Props) => {
    return (
        <EarthPanel title={title}>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {data.events.map((event) => (
                    <Link
                        key={event.id}
                        href={`/earth/${encodeURIComponent(event.id)}`}
                        className="group rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 transition hover:border-[var(--color-accent)]/60"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                                    {event.status === "open" ? t.details.open : t.details.closed}
                                </p>

                                <h3 className="mt-2 text-lg font-black text-[var(--color-text)]">
                                    {event.title}
                                </h3>

                                <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                                    {event.categories[0]?.title ?? "—"}
                                </p>

                                <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                                    {t.details.geometryPoints}: {event.geometryCount}
                                </p>
                            </div>

                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-accent)] transition group-hover:rotate-45">
                                <ArrowUpRight className="h-4 w-4" />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </EarthPanel>
    );
};