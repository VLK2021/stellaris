import type {ReactNode} from "react";

type Props = {
    active: boolean;
    onClick: () => void;
    children: ReactNode;
};

export const EarthTabButton = ({active, onClick, children}: Props) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-full px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.18em] transition ${
                active
                    ? "bg-[var(--color-accent)] text-white shadow-[var(--shadow-glow)]"
                    : "border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-text-muted)]"
            }`}
        >
            {children}
        </button>
    );
};