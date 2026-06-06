"use client";

import {ArrowLeft} from "lucide-react";
import {useRouter} from "next/navigation";

type Props = {
    label: string;
    className?: string;
};

export const BackButton = ({label, className = ""}: Props) => {
    const router = useRouter();

    return (
        <button
            type="button"
            onClick={() => router.back()}
            className={`w-fit rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--color-accent)] transition hover:border-[var(--color-accent)] ${className}`}
        >
            <ArrowLeft className="mr-2 inline h-4 w-4" />
            {label}
        </button>
    );
};