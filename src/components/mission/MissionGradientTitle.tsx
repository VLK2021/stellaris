import type {ReactNode} from "react";

type Props = {
    children: ReactNode;
    className?: string;
};

export const MissionGradientTitle = ({
                                         children,
                                         className = "",
                                     }: Props) => {
    return (
        <h1 className={`bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text font-black uppercase tracking-[-0.075em] text-transparent ${className}`}>
            {children}
        </h1>
    );
};