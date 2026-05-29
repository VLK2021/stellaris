"use client";

type Props = {
    active?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
};

export const PaginationButton = ({
                                     active,
                                     disabled,
                                     onClick,
                                     children,
                                 }: Props) => {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={`
                flex h-10 min-w-10 items-center justify-center rounded-xl px-3
                text-sm font-semibold transition-all duration-200
                ${
                active
                    ? "bg-[var(--color-accent)] text-white shadow-[var(--shadow-glow)]"
                    : "bg-[var(--color-card)] text-[var(--color-text)] border border-[var(--color-border)]"
            }
                ${
                disabled
                    ? "cursor-not-allowed opacity-40"
                    : "hover:scale-105 hover:border-[var(--color-border-strong)]"
            }
            `}
        >
            {children}
        </button>
    );
};