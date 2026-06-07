"use client";

import type {LucideIcon} from "lucide-react";

type Props = {
    icon: LucideIcon;
    label: string;
    value: string | number;
};

export const HabitableMetricCard = ({icon: Icon, label, value}: Props) => {
    return (
        <div className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-3 transition duration-300 hover:border-[var(--color-accent)]">
            <Icon className="h-4 w-4 text-[var(--color-accent)]" />

            <p className="mt-2 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                {label}
            </p>

            <p className="mt-1 truncate text-sm font-black text-[var(--color-text)]">
                {value}
            </p>
        </div>
    );
};