import {CalendarDays} from "lucide-react";

import type {MissionTimelineEvent} from "@/src/types/missions";

type Props = {
    timeline: MissionTimelineEvent[];
};

export const MissionTimelinePanel = ({timeline}: Props) => {
    if (!timeline.length) return null;

    return (
        <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass)]">
                    <CalendarDays className="h-5 w-5 text-[var(--color-accent)]" />
                </div>

                <h2 className="text-2xl font-black uppercase tracking-[-0.05em]">
                    Хронологія
                </h2>
            </div>

            <div className="mt-6 grid gap-3">
                {timeline.map((event) => (
                    <article
                        key={`${event.label}-${event.date}`}
                        className="rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4"
                    >
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                            {event.label}
                        </p>

                        <p className="mt-1 text-xl font-black">
                            {event.date}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
};