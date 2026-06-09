import {CalendarDays, Camera, CircleDot, Rocket} from "lucide-react";

import type {
    MarsLocale,
    MarsRoverSummary,
} from "@/src/types/mars";

type Props = {
    rover: MarsRoverSummary;
    t: MarsLocale;
};

export const MarsRoverDetailsTelemetry = ({rover, t}: Props) => {
    return (
        <aside className="relative overflow-hidden rounded-[2.2rem] border border-[var(--mars-border)] bg-[var(--mars-surface)] p-6 shadow-[var(--mars-glow)]">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--mars-accent)]">
                {t.telemetryTitle}
            </p>

            <div className="mt-6 grid gap-3">
                <Line icon={Rocket} label={t.launch} value={rover.launchDate} />
                <Line icon={CalendarDays} label={t.landing} value={rover.landingDate} />
                <Line icon={CircleDot} label={t.maxSol} value={rover.maxSol} />
                <Line icon={CalendarDays} label={t.maxDate} value={rover.maxDate} />
                <Line icon={Camera} label={t.cameras} value={rover.cameras.length} />
                <Line
                    icon={CircleDot}
                    label={t.missionStatus}
                    value={rover.status === "active" ? t.active : t.complete}
                />
            </div>
        </aside>
    );
};

const Line = ({
                  icon: Icon,
                  label,
                  value,
              }: {
    icon: typeof Rocket;
    label: string;
    value: string | number;
}) => (
    <div className="flex items-center justify-between gap-4 rounded-[1rem] border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] p-3">
        <div className="flex items-center gap-3">
            <Icon className="h-4 w-4 text-[var(--mars-accent)]" />

            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--mars-muted)]">
                {label}
            </span>
        </div>

        <strong className="text-sm font-black text-[var(--mars-text)]">
            {value}
        </strong>
    </div>
);