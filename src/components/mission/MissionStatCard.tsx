import type {LucideIcon} from "lucide-react";

type Props = {
    icon: LucideIcon;
    label: string;
    value: number;
};

export const MissionStatCard = ({
                                    icon: Icon,
                                    label,
                                    value,
                                }: Props) => {
    return (
        <div className="group relative overflow-hidden rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[var(--color-accent)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--color-accent-soft),transparent_34%)] opacity-0 transition group-hover:opacity-100" />

            <div className="relative z-10">
                <Icon className="h-5 w-5 text-[var(--color-accent)]" />

                <p className="mt-3 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--color-text-muted)]">
                    {label}
                </p>

                <p className="mt-1 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-3xl font-black tracking-[-0.06em] text-transparent">
                    {value}
                </p>
            </div>
        </div>
    );
};