import {CalendarDays} from "lucide-react";

import {useLanguage} from "@/src/context";
import type {MissionTimelineEvent} from "@/src/types/missions";

type Props = {
    timeline: MissionTimelineEvent[];
};

export const MissionTimelinePanel = ({timeline}: Props) => {
    const {locale} = useLanguage();
    const t = locale.missions.missionDetails;

    if (!timeline.length) return null;

    return (
        <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-6 shadow-[var(--shadow-card)] backdrop-blur-2xl">
            <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass-strong)]">
                    <CalendarDays className="h-5 w-5 text-[var(--color-accent)]" />
                </div>

                <h2 className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase tracking-[-0.05em] text-transparent">
                    {t.timeline}
                </h2>
            </div>

            <div className="mt-6 grid gap-3">
                {timeline.map((event) => (
                    <article
                        key={`${event.label}-${event.date}`}
                        className="rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]"
                    >
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                            {event.label}
                        </p>

                        <p className="mt-1 text-xl font-black text-[var(--color-text)]">
                            {event.date}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
};