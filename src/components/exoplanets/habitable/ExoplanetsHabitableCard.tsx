"use client";

import {Earth, Thermometer, Weight} from "lucide-react";

import type {HabitableWorld} from "./ExoplanetsHabitablePage";

type Props = {
    item: HabitableWorld;
};

const zoneColor = {
    temperate: "bg-emerald-500",
    hot: "bg-red-500",
    cold: "bg-blue-500",
    unknown: "bg-gray-500",
};

export const ExoplanetsHabitableCard = ({item}: Props) => {
    return (
        <article className="overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)]">
            <div className="p-5">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black uppercase">
                        {item.pl_name}
                    </h2>

                    <div className="rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-black">
                        {item.habitabilityScore}/100
                    </div>
                </div>

                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    {item.hostname}
                </p>

                <div className="mt-5 grid grid-cols-3 gap-3">
                    <Metric
                        icon={Earth}
                        label="Radius"
                        value={`${item.pl_rade ?? "—"} R⊕`}
                    />

                    <Metric
                        icon={Weight}
                        label="Mass"
                        value={`${item.pl_bmasse ?? "—"} M⊕`}
                    />

                    <Metric
                        icon={Thermometer}
                        label="Temp"
                        value={`${item.pl_eqt ?? "—"} K`}
                    />
                </div>

                <div className="mt-5 flex items-center gap-3">
                    <div
                        className={`h-3 w-3 rounded-full ${
                            zoneColor[item.habitabilityZone as keyof typeof zoneColor]
                        }`}
                    />

                    <span className="text-xs font-black uppercase tracking-[0.16em]">
                        {item.habitabilityZone}
                    </span>
                </div>
            </div>
        </article>
    );
};

const Metric = ({
                    icon: Icon,
                    label,
                    value,
                }: {
    icon: typeof Earth;
    label: string;
    value: string;
}) => (
    <div className="rounded-xl border border-[var(--color-border)] p-3">
        <Icon className="h-4 w-4 text-[var(--color-accent)]" />

        <p className="mt-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {label}
        </p>

        <p className="mt-1 text-sm font-black">
            {value}
        </p>
    </div>
);