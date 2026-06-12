import type {LucideIcon} from "lucide-react";

type Props = {
    icon: LucideIcon;
    label: string;
    value: string;
};

export const MissionPreviewInfoCard = ({
                                           icon: Icon,
                                           label,
                                           value,
                                       }: Props) => {
    return (
        <div className="rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]">
            <Icon className="h-5 w-5 text-[var(--color-accent)]" />

            <p className="mt-3 text-[9px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                {label}
            </p>

            <p className="mt-1 line-clamp-2 text-sm font-black text-[var(--color-text)]">
                {value}
            </p>
        </div>
    );
};