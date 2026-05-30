import type {SpaceWeatherEvent} from "@/src/types/space-weather/spaceWeather.types";
import type {SpaceWeatherLocale} from "@/src/types/space-weather/spaceWeatherUi.types";

import {SpaceWeatherEventCard} from "./SpaceWeatherEventCard";

type Props = {
    locale: SpaceWeatherLocale;
    events: SpaceWeatherEvent[];
};

export const SpaceWeatherEventsGrid = ({locale, events}: Props) => {
    if (!events.length) {
        return (
            <div className="mt-5 rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-card)] p-7 text-center text-sm text-[var(--color-text-muted)]">
                {locale.noData}
            </div>
        );
    }

    return (
        <section className="mt-5 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {events.map((event, index) => (
                <SpaceWeatherEventCard
                    key={`${event.id}-${event.type}-${index}`}
                    event={event}
                    locale={locale}
                />
            ))}
        </section>
    );
};