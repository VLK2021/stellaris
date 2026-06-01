import type {LucideIcon} from "lucide-react";

type Props = {
    icon: LucideIcon;
    label: string;
    value: number;
    className: string;
};

export const EarthFloatingStat = ({
                                      icon: Icon,
                                      label,
                                      value,
                                      className,
                                  }: Props) => {
    return (
        <div className={`absolute rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl ${className}`}>
            <Icon className="h-4 w-4 text-[var(--color-accent)]" />

            <p className="mt-3 text-2xl font-black text-[var(--color-text)]">
                {value}
            </p>

            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                {label}
            </p>
        </div>
    );
};