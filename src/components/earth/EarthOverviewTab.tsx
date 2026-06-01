import type {EarthOverview} from "@/src/types/earth/earth.types";

import {EarthPanel} from "./EarthPanel";

type Props = {
    data: EarthOverview;
    t: {
        latestEvents: string;
        latestEarthImages: string;
        category: string;
        coordinates: string;
    };
};

export const EarthOverviewTab = ({data, t}: Props) => {
    return (
        <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <EarthPanel title={t.latestEvents}>
                <div className="grid gap-3">
                    {data.events.map((event) => (
                        <div
                            key={event.id}
                            className="rounded-[1.1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4"
                        >
                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                                {event.categories[0]?.title ?? t.category}
                            </p>

                            <h3 className="mt-2 text-base font-black text-[var(--color-text)]">
                                {event.title}
                            </h3>

                            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                {t.coordinates}: {event.coordinates?.join(" / ") ?? "—"}
                            </p>
                        </div>
                    ))}
                </div>
            </EarthPanel>

            <EarthPanel title={t.latestEarthImages}>
                <div className="grid gap-3 sm:grid-cols-2">
                    {data.epicImages.slice(0, 4).map((image) => (
                        <div
                            key={image.id}
                            className="overflow-hidden rounded-[1.1rem] border border-[var(--color-border)] bg-[var(--color-glass)]"
                        >
                            <img
                                src={image.imageUrl}
                                alt={image.caption}
                                className="aspect-square w-full object-cover"
                            />

                            <div className="p-3">
                                <p className="text-xs font-bold text-[var(--color-text)]">
                                    {image.date}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </EarthPanel>
        </section>
    );
};