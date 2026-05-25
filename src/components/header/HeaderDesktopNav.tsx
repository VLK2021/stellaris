"use client";

import Link from "next/link";
import {ChevronDown, Telescope} from "lucide-react";
import {motion} from "framer-motion";
import {useState} from "react";

import {HeaderExploreMenu} from "./HeaderExploreMenu";
import type {HeaderNavItem} from "./types";

type HeaderDesktopNavProps = {
    mainLinks: HeaderNavItem[];
    exploreLinks: HeaderNavItem[];
    isActive: (href: string) => boolean;
    locale: {
        header: {
            deepExplore: string;
            missionIndex: string;
            missionTitle: string;
            missionDescription: string;
            openModule: string;
        };
    };
};

export const HeaderDesktopNav = ({
                                     mainLinks,
                                     exploreLinks,
                                     isActive,
                                     locale,
                                 }: HeaderDesktopNavProps) => {
    const [isExploreOpen, setIsExploreOpen] = useState(false);

    return (
        <nav className="hidden items-center gap-2 xl:flex">
            {mainLinks.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="group relative flex items-center gap-2 rounded-full px-3 py-2"
                    >
                        {active && (
                            <motion.div
                                layoutId="active-nav-pill"
                                className="absolute inset-0 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-accent-soft)] shadow-[var(--shadow-soft)]"
                            />
                        )}

                        <span className="relative grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-text-muted)] transition group-hover:border-[var(--color-border-strong)] group-hover:text-[var(--color-accent)]">
                            <Icon className="h-4 w-4" />
                        </span>

                        <span
                            className={`relative text-sm font-medium transition ${
                                active
                                    ? "text-[var(--color-text)]"
                                    : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]"
                            }`}
                        >
                            {item.label}
                        </span>
                    </Link>
                );
            })}

            <div
                className="relative"
                onMouseEnter={() => setIsExploreOpen(true)}
                onMouseLeave={() => setIsExploreOpen(false)}
            >
                <button
                    type="button"
                    className="group flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
                >
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] transition group-hover:border-[var(--color-border-strong)] group-hover:text-[var(--color-nebula)]">
                        <Telescope className="h-4 w-4" />
                    </span>

                    {locale.header.deepExplore}
                    <ChevronDown className="h-4 w-4" />
                </button>

                <HeaderExploreMenu
                    isOpen={isExploreOpen}
                    links={exploreLinks}
                    locale={locale}
                />
            </div>
        </nav>
    );
};