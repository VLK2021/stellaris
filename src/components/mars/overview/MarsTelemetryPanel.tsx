import {Activity, Archive, Camera, Rocket} from "lucide-react";

import type {MarsLocale, MarsOverview} from "@/src/types/mars";

type Props = {
    data: MarsOverview;
    t: MarsLocale;
};

export const MarsTelemetryPanel = ({data, t}: Props) => {
    const archived = data.stats.rovers - data.stats.activeRovers;

    return (
        <aside className="relative overflow-hidden rounded-[2.4rem] border border-[var(--mars-border)] bg-[var(--mars-surface)] p-6 shadow-[var(--mars-glow)]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(56,189,248,.10),rgba(249,115,22,.13),transparent_70%)]" />

            <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--mars-accent)]">
                    {t.telemetryTitle}
                </p>

                <p className="mt-3 text-sm leading-7 text-[var(--mars-muted)]">
                    {t.telemetryDescription}
                </p>

                <div className="mt-6 grid gap-3">
                    <Line icon={Rocket} label={t.totalRovers} value={data.stats.rovers} />
                    <Line icon={Activity} label={t.activeRovers} value={data.stats.activeRovers} />
                    <Line icon={Archive} label={t.archivedRovers} value={archived} />
                    <Line icon={Camera} label={t.photoStream} value={data.stats.totalPhotos} />
                </div>
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