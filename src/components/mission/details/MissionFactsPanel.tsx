import {CalendarDays, Flag, Globe2, Rocket} from "lucide-react";

import {useLanguage} from "@/src/context";
import type {MissionAggregated} from "@/src/types/missions";

type Props = {
    mission: MissionAggregated;
};

export const MissionFactsPanel = ({mission}: Props) => {
    const {locale} = useLanguage();
    const t = locale.missions.missionDetails;

    return (
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Fact icon={Rocket} label={t.category} value={mission.category} />
            <Fact icon={Globe2} label={t.target} value={mission.target} />
            <Fact icon={CalendarDays} label={t.launchDate} value={mission.launchDate ?? t.unknown} />
            <Fact icon={Flag} label={t.endDate} value={mission.endDate ?? t.activeOrUnknown} />
        </section>
    );
};

const Fact = ({
                  icon: Icon,
                  label,
                  value,
              }: {
    icon: typeof Rocket;
    label: string;
    value: string;
}) => (
    <article className="rounded-[1.4rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl transition hover:border-[var(--color-accent)]">
        <Icon className="h-5 w-5 text-[var(--color-accent)]" />

        <p className="mt-4 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {label}
        </p>

        <p className="mt-1 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-lg font-black uppercase text-transparent">
            {value}
        </p>
    </article>
);