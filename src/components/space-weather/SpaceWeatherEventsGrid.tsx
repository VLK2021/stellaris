import type {SpaceWeatherEvent} from "@/src/types/space-weather/spaceWeather.types";
import type {SpaceWeatherLocale} from "@/src/types/space-weather/spaceWeatherUi.types";

import {SpaceWeatherEventCard} from "./SpaceWeatherEventCard";

type Props = {
    locale: SpaceWeatherLocale;
    events: SpaceWeatherEvent[];
    startDate: string;
    endDate: string;
};

export const SpaceWeatherEventsGrid = ({
                                           locale,
                                           events,
                                           startDate,
                                           endDate,
                                       }: Props) => {
    if (!events.length) {
        return (
            <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-card)] p-7 text-center text-sm text-[var(--color-text-muted)]">
                {locale.noData}
            </div>
        );
    }

    return (
        <section className="rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                        NASA DONKI
                    </p>

                    <h2 className="mt-1 text-xl font-black uppercase tracking-[-0.04em] text-[var(--color-text)]">
                        Event Timeline
                    </h2>
                </div>

                <p className="text-xs text-[var(--color-text-muted)]">
                    {events.length} {locale.events}
                </p>
            </div>

            <div className="relative">
                <div className="absolute left-[13px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-warning)] to-transparent sm:block" />

                <div className="grid gap-3">
                    {events.map((event, index) => (
                        <SpaceWeatherEventCard
                            key={`${event.id}-${event.type}-${index}`}
                            event={event}
                            locale={locale}
                            index={index}
                            startDate={startDate}
                            endDate={endDate}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};