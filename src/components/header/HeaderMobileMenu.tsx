"use client";

import Link from "next/link";

import {LangSwitcher, ThemeSwitcher} from "@/src/components";
import type {HeaderNavItem} from "./types";

type HeaderMobileMenuProps = {
    links: HeaderNavItem[];
    isActive: (href: string) => boolean;
    onClose: () => void;
};

export const HeaderMobileMenu = ({
                                     links,
                                     isActive,
                                     onClose,
                                 }: HeaderMobileMenuProps) => {
    return (
        <div className="grid gap-3 p-4 sm:grid-cols-2">
            {links.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center gap-4 border p-4 transition ${
                            active
                                ? "border-[rgba(56,189,248,0.35)] bg-[rgba(56,189,248,0.12)]"
                                : "border-[var(--color-border)] bg-[rgba(255,255,255,0.035)]"
                        }`}
                    >
                        <div className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(56,189,248,0.22)] bg-[rgba(56,189,248,0.08)] text-[var(--color-accent)]">
                            <Icon className="h-5 w-5" />
                        </div>

                        <span className="font-medium text-[var(--color-text)]">
                            {item.label}
                        </span>
                    </Link>
                );
            })}

            <div className="flex items-center gap-2 border border-[var(--color-border)] bg-[rgba(255,255,255,0.035)] p-4 sm:col-span-2">
                <LangSwitcher />
                <ThemeSwitcher />
            </div>
        </div>
    );
};