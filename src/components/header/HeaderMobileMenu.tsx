"use client";

import Link from "next/link";
import {Search} from "lucide-react";

import {LangSwitcher, ThemeSwitcher} from "@/src/components";
import type {HeaderNavItem} from "./types";

type HeaderMobileMenuProps = {
    links: HeaderNavItem[];
    isActive: (href: string) => boolean;
    onClose: () => void;
    searchLabel?: string;
};

export const HeaderMobileMenu = ({
                                     links,
                                     isActive,
                                     onClose,
                                     searchLabel = "Search",
                                 }: HeaderMobileMenuProps) => {
    return (
        <div className="max-h-[calc(100dvh-80px)] overflow-y-auto overscroll-contain px-4 py-4">
            <div className="mb-4 grid grid-cols-3 gap-2">
                <Link
                    href="/search"
                    onClick={onClose}
                    className="col-span-1 flex h-12 items-center justify-center gap-2 border border-[var(--color-border)] bg-[var(--color-card)] text-sm font-semibold text-[var(--color-text)] backdrop-blur-2xl"
                >
                    <Search className="h-4 w-4 text-[var(--color-accent)]" />
                    <span className="hidden sm:inline">{searchLabel}</span>
                </Link>

                <div className="col-span-2 flex h-12 items-center justify-end gap-2 border border-[var(--color-border)] bg-[var(--color-card)] px-3 backdrop-blur-2xl">
                    <LangSwitcher />
                    <ThemeSwitcher />
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                {links.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                        <Link
                            key={`${item.href}-${item.label}`}
                            href={item.href}
                            onClick={onClose}
                            className={`flex items-center gap-4 border p-4 transition ${
                                active
                                    ? "border-[var(--color-border-strong)] bg-[var(--color-accent-soft)]"
                                    : "border-[var(--color-border)] bg-[var(--color-card)]"
                            }`}
                        >
                            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                                <Icon className="h-5 w-5" />
                            </div>

                            <span className="font-medium text-[var(--color-text)]">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};