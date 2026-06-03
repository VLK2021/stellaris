"use client";

type Props = {
    label: string;
    value: string | number | null;
};

export const ExoplanetRow = ({label, value}: Props) => {
    return (
        <p className="flex justify-between gap-4 border-b border-[var(--color-border)]/60 pb-1">
            <span>{label}</span>
            <span className="font-bold text-[var(--color-text)]">
                {value ?? "—"}
            </span>
        </p>
    );
};