"use client";

import Link from "next/link";
import {Search} from "lucide-react";

import {LangSwitcher, ThemeSwitcher} from "@/src/components";

type HeaderActionsProps = {
    searchLabel: string;
};

export const HeaderActions = ({searchLabel}: HeaderActionsProps) => {
    return (
        <div className="hidden items-center gap-2 xl:flex">
            <Link
                href="/search"
                className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.045)] text-[var(--color-text-muted)] transition hover:border-[rgba(56,189,248,0.45)] hover:text-[var(--color-accent)]"
                aria-label={searchLabel}
            >
                <Search className="h-4 w-4" />
            </Link>

            <LangSwitcher />
            <ThemeSwitcher />
        </div>
    );
};