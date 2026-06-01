import type {EarthOverview} from "@/src/types/earth/earth.types";

import {EarthPanel} from "./EarthPanel";

type Props = {
    data: EarthOverview;
    title: string;
};

export const EarthEventsTab = ({data, title}: Props) => {
    return (
        <EarthPanel title={title}>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {data.events.map((event) => (
                    <div
                        key={event.id}
                        className="rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4"
                    >
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                            {event.status}
                        </p>

                        <h3 className="mt-2 text-lg font-black text-[var(--color-text)]">
                            {event.title}
                        </h3>

                        <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                            {event.categories[0]?.title ?? "—"}
                        </p>
                    </div>
                ))}
            </div>
        </EarthPanel>
    );
};