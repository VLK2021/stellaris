"use client";

import type {ReactNode} from "react";
import {Loader2} from "lucide-react";

type Props = {
    loading: boolean;
    error: string | null;
    children: ReactNode;
};

export const ExoplanetsMethodsState = ({loading, error, children}: Props) => {
    if (loading) {
        return (
            <div className="grid min-h-[320px] place-items-center rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)]">
                <Loader2 className="h-9 w-9 animate-spin text-[var(--color-accent)]" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-[2rem] border border-[var(--color-error)]/30 bg-[var(--color-error)]/10 p-5 text-[var(--color-error)]">
                {error}
            </div>
        );
    }

    return <>{children}</>;
};