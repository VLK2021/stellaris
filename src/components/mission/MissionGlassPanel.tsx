import type {ReactNode} from "react";

type Props = {
    children: ReactNode;
    className?: string;
};

export const MissionGlassPanel = ({
                                      children,
                                      className = "",
                                  }: Props) => {
    return (
        <section className={`relative overflow-hidden rounded-[2.4rem] border border-[var(--color-border)] bg-[var(--color-glass)] shadow-[var(--shadow-card)] backdrop-blur-2xl ${className}`}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--color-accent-soft),transparent_34%)] opacity-70" />
            <div className="relative z-10">{children}</div>
        </section>
    );
};