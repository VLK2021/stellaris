import type {LucideIcon} from "lucide-react";

type Props = {
    icon: LucideIcon;
    label: string;
    value: number;
    className: string;
    onClick?: () => void;
};

export const EarthFloatingStat = ({
                                      icon: Icon,
                                      label,
                                      value,
                                      className,
                                      onClick,
                                  }: Props) => {
    const Component = onClick ? "button" : "div";

    return (
        <Component
            type={onClick ? "button" : undefined}
            onClick={onClick}
            className={`absolute rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 text-left backdrop-blur-xl transition ${onClick ? "cursor-pointer hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]" : ""} ${className}`}
        >
            <Icon className="h-4 w-4 text-[var(--color-accent)]" />

            <p className="mt-3 text-2xl font-black text-[var(--color-text)]">
                {value}
            </p>

            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                {label}
            </p>
        </Component>
    );
};