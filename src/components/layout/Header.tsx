"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {AnimatePresence, motion} from "framer-motion";
import {
    Aperture,
    ChevronDown,
    CircleDot,
    CloudSun,
    Database,
    Earth,
    GalleryHorizontal,
    Menu,
    Orbit,
    Rocket,
    Satellite,
    Search,
    Telescope,
    X,
} from "lucide-react";
import {useState} from "react";

import {LangSwitcher, ThemeSwitcher} from "@/src/components";
import {useLanguage} from "@/src/context";
import {StellarisLogo} from "./StellarisLogo";

export const Header = () => {
    const pathname = usePathname();
    const {locale} = useLanguage();

    const [isExploreOpen, setIsExploreOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const mainLinks = [
        {label: locale.nav.home, href: "/", icon: Aperture},
        {label: locale.nav.earth, href: "/earth", icon: Earth},
        {label: locale.nav.mars, href: "/mars", icon: Orbit},
        {label: locale.nav.media, href: "/media", icon: GalleryHorizontal},
        {label: locale.nav.missions, href: "/missions", icon: Rocket},
    ];

    const exploreLinks = [
        {label: locale.nav.apod, href: "/apod", icon: Aperture},
        {label: locale.nav.asteroids, href: "/asteroids", icon: CircleDot},
        {label: locale.nav.spaceWeather, href: "/space-weather", icon: CloudSun},
        {label: locale.nav.exoplanets, href: "/exoplanets", icon: Telescope},
        {label: locale.nav.satellites, href: "/orbits", icon: Satellite},
        {label: locale.nav.openData, href: "/datasets", icon: Database},
    ];

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] bg-[rgba(2,6,23,0.72)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />

            <div className="relative flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-10">
                <Link href="/" aria-label="Stellaris home">
                    <StellarisLogo subtitle={locale.header.subtitle} />
                </Link>

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
                                        className="absolute inset-0 rounded-full border border-[rgba(56,189,248,0.32)] bg-[rgba(56,189,248,0.11)] shadow-[0_0_30px_rgba(56,189,248,0.20)]"
                                    />
                                )}

                                <span className="relative grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.045)] transition group-hover:border-[rgba(56,189,248,0.55)] group-hover:text-[var(--color-accent)]">
                                    <Icon className="h-4 w-4" />
                                </span>

                                <span className={`relative text-sm font-medium transition ${active ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]"}`}>
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
                            <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.045)] transition group-hover:border-[rgba(139,92,246,0.6)] group-hover:text-[var(--color-nebula)]">
                                <Telescope className="h-4 w-4" />
                            </span>
                            {locale.header.deepExplore}
                            <ChevronDown className="h-4 w-4" />
                        </button>

                        <AnimatePresence>
                            {isExploreOpen && (
                                <motion.div
                                    initial={{opacity: 0, y: 14, scale: 0.98}}
                                    animate={{opacity: 1, y: 0, scale: 1}}
                                    exit={{opacity: 0, y: 10, scale: 0.98}}
                                    transition={{duration: 0.18}}
                                    className="absolute left-1/2 top-full w-[780px] -translate-x-1/2 pt-5"
                                >
                                    <div className="overflow-hidden border border-[var(--color-border)] bg-[rgba(5,11,22,0.96)] p-4 shadow-[0_28px_100px_rgba(0,0,0,0.58)] backdrop-blur-2xl">
                                        <div className="mb-4 border border-[var(--color-border)] bg-[linear-gradient(135deg,rgba(56,189,248,0.15),rgba(139,92,246,0.10))] p-5">
                                            <div className="text-xs uppercase tracking-[0.34em] text-[var(--color-accent)]">
                                                {locale.header.missionIndex}
                                            </div>

                                            <div className="mt-2 text-2xl font-bold text-[var(--color-text)]">
                                                {locale.header.missionTitle}
                                            </div>

                                            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-text-muted)]">
                                                {locale.header.missionDescription}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            {exploreLinks.map((item, index) => {
                                                const Icon = item.icon;

                                                return (
                                                    <motion.div
                                                        key={item.href}
                                                        initial={{opacity: 0, y: 10}}
                                                        animate={{opacity: 1, y: 0}}
                                                        transition={{delay: index * 0.025}}
                                                    >
                                                        <Link
                                                            href={item.href}
                                                            className="group flex items-center gap-4 border border-transparent p-4 transition hover:border-[rgba(56,189,248,0.25)] hover:bg-[rgba(255,255,255,0.05)]"
                                                        >
                                                            <div className="relative grid h-12 w-12 place-items-center rounded-full border border-[rgba(56,189,248,0.25)] bg-[rgba(56,189,248,0.08)] text-[var(--color-accent)] shadow-[0_0_28px_rgba(56,189,248,0.14)]">
                                                                <div className="absolute inset-[-5px] rounded-full border border-[rgba(56,189,248,0.10)] opacity-0 transition group-hover:opacity-100" />
                                                                <Icon className="h-5 w-5" />
                                                            </div>

                                                            <div>
                                                                <div className="font-semibold text-[var(--color-text)]">
                                                                    {item.label}
                                                                </div>
                                                                <div className="mt-1 text-xs text-[var(--color-text-muted)]">
                                                                    {locale.header.openModule}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </nav>

                <div className="hidden items-center gap-2 xl:flex">
                    <Link
                        href="/search"
                        className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.045)] text-[var(--color-text-muted)] transition hover:border-[rgba(56,189,248,0.45)] hover:text-[var(--color-accent)]"
                        aria-label={locale.nav.search}
                    >
                        <Search className="h-4 w-4" />
                    </Link>

                    <LangSwitcher />
                    <ThemeSwitcher />
                </div>

                <button
                    type="button"
                    onClick={() => setIsMobileOpen((prev) => !prev)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.05)] text-[var(--color-text)] xl:hidden"
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
                        className="overflow-hidden border-t border-[var(--color-border)] bg-[rgba(2,6,23,0.94)] backdrop-blur-2xl xl:hidden"
                    >
                        <div className="grid gap-3 p-4 sm:grid-cols-2">
                            {[...mainLinks, ...exploreLinks].map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.href);

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMobileOpen(false)}
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
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};