import type {LucideIcon} from "lucide-react";

type Props = {
    icon: LucideIcon;
    label: string;
    value: number;
};

export const EarthStatCard = ({icon: Icon, label, value}: Props) => {
    return (
        <div className="relative overflow-hidden rounded-[1.4rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
            <div className="absolute right-[-44px] top-[-44px] h-28 w-28 rounded-full bg-[var(--color-accent-soft)] blur-3xl" />

            <Icon className="relative z-10 h-5 w-5 text-[var(--color-accent)]" />

            <p className="relative z-10 mt-5 text-3xl font-black text-[var(--color-text)]">
                {value}
            </p>

            <p className="relative z-10 mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                {label}
            </p>
        </div>
    );
};