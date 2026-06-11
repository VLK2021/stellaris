import {CalendarDays, Flag, Globe2, Rocket} from "lucide-react";

import type {MissionAggregated} from "@/src/types/missions";

type Props = {
    mission: MissionAggregated;
};

export const MissionFactsPanel = ({mission}: Props) => {
    return (
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Fact icon={Rocket} label="Категорія" value={mission.category} />
            <Fact icon={Globe2} label="Ціль" value={mission.target} />
            <Fact icon={CalendarDays} label="Старт" value={mission.launchDate ?? "Невідомо"} />
            <Fact icon={Flag} label="Завершення" value={mission.endDate ?? "Активна / невідомо"} />
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
    <article className="rounded-[1.4rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
        <Icon className="h-5 w-5 text-[var(--color-accent)]" />

        <p className="mt-4 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {label}
        </p>

        <p className="mt-1 text-lg font-black uppercase">
            {value}
        </p>
    </article>
);