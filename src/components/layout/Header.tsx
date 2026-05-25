"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {Menu, Search, Sparkles, X} from "lucide-react";
import {useState} from "react";

import {mainNavigation, exploreNavigation} from "@/src/constants/navigation";
import {BRAND} from "@/src/constants/brand";
import {LangSwitcher, ThemeSwitcher} from "@/src/components";

export const Header = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isExploreOpen, setIsExploreOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] bg-[rgba(2,6,23,0.66)] backdrop-blur-2xl dark:bg-[rgba(2,6,23,0.66)]">
            <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="group flex items-center gap-3">
                    <div className="relative grid h-11 w-11 place-items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-soft)]">
                        <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-[var(--color-accent)]/30 to-[var(--color-brand-secondary)]/20 blur-sm" />
                        <Sparkles className="relative h-5 w-5 text-[var(--color-accent)]" />
                    </div>

                    <div className="leading-none">
                        <div className="text-lg font-semibold tracking-[0.22em] text-[var(--color-text)]">
                            {BRAND.name.toUpperCase()}
                        </div>
                        <div className="mt-1 hidden text-[10px] uppercase tracking-[0.28em] text-[var(--color-text-muted)] sm:block">
                            Universe Explorer
                        </div>
                    </div>
                </Link>

                <nav className="hidden items-center gap-1 lg:flex">
                    {mainNavigation.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        if (item.label === "Explore") {
                            return (
                                <div
                                    key={item.href}
                                    className="relative"
                                    onMouseEnter={() => setIsExploreOpen(true)}
                                    onMouseLeave={() => setIsExploreOpen(false)}
                                >
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                                            active
                                                ? "bg-[var(--color-card)] text-[var(--color-text)] shadow-[var(--shadow-soft)]"
                                                : "text-[var(--color-text-muted)] hover:bg-[var(--color-card)] hover:text-[var(--color-text)]"
                                        }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>

                                    {isExploreOpen && (
                                        <div className="absolute left-1/2 top-full w-[720px] -translate-x-1/2 pt-5">
                                            <div className="grid grid-cols-2 gap-2 rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-2xl">
                                                {exploreNavigation.map((link) => {
                                                    const LinkIcon = link.icon;

                                                    return (
                                                        <Link
                                                            key={link.href}
                                                            href={link.href}
                                                            className="group rounded-2xl border border-transparent p-4 transition hover:border-[var(--color-border)] hover:bg-[var(--color-card-solid)]"
                                                        >
                                                            <div className="flex gap-3">
                                                                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                                                                    <LinkIcon className="h-5 w-5" />
                                                                </div>

                                                                <div>
                                                                    <div className="text-sm font-semibold text-[var(--color-text)]">
                                                                        {link.label}
                                                                    </div>
                                                                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-[var(--color-text-muted)]">
                                                                        {link.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                                    active
                                        ? "bg-[var(--color-card)] text-[var(--color-text)] shadow-[var(--shadow-soft)]"
                                        : "text-[var(--color-text-muted)] hover:bg-[var(--color-card)] hover:text-[var(--color-text)]"
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden items-center gap-2 lg:flex">
                    <Link
                        href="/search"
                        className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
                        aria-label="Search"
                    >
                        <Search className="h-4 w-4" />
                    </Link>

                    <LangSwitcher />
                    <ThemeSwitcher />
                </div>

                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text)] lg:hidden"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {isOpen && (
                <div className="border-t border-[var(--color-border)] bg-[var(--color-card)] px-4 py-4 backdrop-blur-2xl lg:hidden">
                    <div className="mx-auto flex max-w-[1440px] flex-col gap-2">
                        {[...mainNavigation, ...exploreNavigation].map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href);

                            return (
                                <Link
                                    key={`${item.href}-${item.label}`}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                                        active
                                            ? "bg-[var(--color-accent-soft)] text-[var(--color-text)]"
                                            : "text-[var(--color-text-muted)] hover:bg-[var(--color-card-solid)] hover:text-[var(--color-text)]"
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            );
                        })}

                        <div className="mt-3 flex items-center gap-2 border-t border-[var(--color-border)] pt-4">
                            <LangSwitcher />
                            <ThemeSwitcher />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};