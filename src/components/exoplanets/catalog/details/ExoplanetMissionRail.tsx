"use client";

import {Calendar, Radio, Telescope} from "lucide-react";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";
import type {ExoplanetDetails} from "./ExoplanetDetailsPage";

type Props = {
    data: ExoplanetDetails;
    t: ExoplanetsLocale["details"];
};

export const ExoplanetMissionRail = ({data, t}: Props) => {
    return (
        <aside className="flex flex-col justify-between rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-5 backdrop-blur-xl">
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                    {t.eyebrow}
                </p>

                <div className="mt-7 space-y-5">
                    <RailItem icon={Calendar} label={t.discoveryYear} value={data.disc_year ?? "—"} />
                    <RailItem icon={Radio} label={t.method} value={data.discoverymethod ?? "—"} />
                    <RailItem icon={Telescope} label={t.facility} value={data.disc_facility ?? "—"} />
                </div>
            </div>

            <div className="mt-7 rounded-[1.3rem] border border-[var(--color-border)] bg-[var(--color-card)]/50 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    {t.dataSource}
                </p>
            </div>
        </aside>
    );
};

const RailItem = ({
                      icon: Icon,
                      label,
                      value,
                  }: {
    icon: typeof Calendar;
    label: string;
    value: string | number;
}) => (
    <div className="relative border-l border-[var(--color-accent)]/40 pl-4">
        <Icon className="mb-2 h-4 w-4 text-[var(--color-accent)]" />
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {label}
        </p>
        <p className="mt-1 text-sm font-black text-[var(--color-text)]">{value}</p>
    </div>
);