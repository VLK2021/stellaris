"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {
    Aperture,
    CircleDot,
    CloudSun,
    Earth,
    GalleryHorizontal,
    Menu,
    Orbit,
    Rocket,
    Satellite,
    Telescope,
    X,
} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";

import {useLanguage} from "@/src/context";
import {StellarisLogo} from "@/src/components/StellarisLogo";
import {HeaderDesktopNav} from "./HeaderDesktopNav";
import {HeaderActions} from "./HeaderActions";
import {HeaderMobileMenu} from "./HeaderMobileMenu";
import type {HeaderNavItem} from "./types";

export const Header = () => {
    const pathname = usePathname();
    const {locale} = useLanguage();

    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const mainLinks: HeaderNavItem[] = [
        {label: locale.nav.home, href: "/", icon: Aperture},
        {label: locale.nav.earth, href: "/earth", icon: Earth},
        {label: locale.nav.mars, href: "/mars", icon: Orbit},
        {label: locale.nav.media, href: "/media", icon: GalleryHorizontal},
        {label: locale.nav.missions, href: "/missions", icon: Rocket},
        {label: locale.nav.asteroids, href: "/asteroids", icon: CircleDot},
    ];

    const exploreLinks: HeaderNavItem[] = [
        {label: locale.nav.apod, href: "/apod", icon: Aperture},
        {label: locale.nav.spaceWeather, href: "/space-weather", icon: CloudSun},
        {label: locale.nav.exoplanets, href: "/exoplanets", icon: Telescope},
        {label: locale.footer.manifest, href: "/manifest", icon: Orbit},
    ];

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-header)] shadow-[var(--shadow-card)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />

            <div className="relative flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-10">
                <Link href="/" aria-label="Stellaris home">
                    <StellarisLogo subtitle={locale.header.subtitle} />
                </Link>

                <HeaderDesktopNav
                    mainLinks={mainLinks}
                    exploreLinks={exploreLinks}
                    isActive={isActive}
                    locale={locale}
                />

                <HeaderActions searchLabel={locale.nav.search} />

                <button
                    type="button"
                    onClick={() => setIsMobileOpen((prev) => !prev)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-text)] backdrop-blur-xl xl:hidden"
                    aria-label="Toggle menu"
                >
                    {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{height: 0, opacity: 0}}
                        animate={{height: "auto", opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        className="overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-menu)] backdrop-blur-2xl xl:hidden"
                    >
                        <HeaderMobileMenu
                            links={[...mainLinks, ...exploreLinks]}
                            isActive={isActive}
                            onClose={() => setIsMobileOpen(false)}
                            searchLabel={locale.nav.search}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};