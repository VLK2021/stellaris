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
    Sparkles,
    Telescope,
    X,
} from "lucide-react";
import {useState} from "react";

import {LangSwitcher, ThemeSwitcher} from "@/src/components";
import {useLanguage} from "@/src/context";

export const Header = () => {
    const pathname = usePathname();
    const {locale} = useLanguage();

    const [isExploreOpen, setIsExploreOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const mainLinks = [
        {label: locale.nav.home, href: "/", icon: Sparkles},
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
        <header className="fixed inset-x-0 top-0 z-50">
            <div className="w-full px-3 pt-3 sm:px-5 lg:px-6">
                <div className="relative overflow-visible rounded-[28px] border border-[var(--color-border)] bg-[rgba(2,6,23,0.58)] shadow-[0_20px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
                    <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(90deg,rgba(56,189,248,0.16),transparent_35%,rgba(139,92,246,0.16))]" />
                    <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />

                    <div className="relative flex h-[76px] items-center justify-between px-4 lg:px-6">
                        <Link href="/" className="group flex items-center gap-3">
                            <div className="relative grid h-12 w-12 place-items-center rounded-full border border-[rgba(56,189,248,0.35)] bg-[rgba(8,18,34,0.86)] shadow-[0_0_40px_rgba(56,189,248,0.22)]">
                                <motion.div
                                    className="absolute inset-[-6px] rounded-full border border-[rgba(56,189,248,0.22)]"
                                    animate={{rotate: 360}}
                                    transition={{duration: 18, repeat: Infinity, ease: "linear"}}
                                />

                                <motion.div
                                    className="absolute h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_18px_var(--color-accent)]"
                                    animate={{
                                        x: [0, 17, 0, -17, 0],
                                        y: [-17, 0, 17, 0, -17],
                                    }}
                                    transition={{duration: 5, repeat: Infinity, ease: "linear"}}
                                />

                                <Sparkles className="relative h-5 w-5 text-[var(--color-accent)]" />
                            </div>

                            <div>
                                <div className="text-lg font-black tracking-[0.32em] text-[var(--color-text)]">
                                    STELLARIS
                                </div>
                                <div className="mt-1 hidden text-[10px] uppercase tracking-[0.32em] text-[var(--color-text-muted)] sm:block">
                                    {locale.header.subtitle}
                                </div>
                            </div>
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
                                                className="absolute inset-0 rounded-full border border-[rgba(56,189,248,0.28)] bg-[rgba(56,189,248,0.10)] shadow-[0_0_26px_rgba(56,189,248,0.18)]"
                                            />
                                        )}

                                        <span className="relative grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] transition group-hover:border-[rgba(56,189,248,0.45)] group-hover:text-[var(--color-accent)]">
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
                                    className="group relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
                                >
                                    <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] transition group-hover:border-[rgba(139,92,246,0.55)] group-hover:text-[var(--color-nebula)]">
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
                                            className="absolute left-1/2 top-full w-[760px] -translate-x-1/2 pt-5"
                                        >
                                            <div className="overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[rgba(5,11,22,0.92)] p-4 shadow-[0_28px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
                                                <div className="mb-4 rounded-3xl border border-[var(--color-border)] bg-[linear-gradient(135deg,rgba(56,189,248,0.14),rgba(139,92,246,0.10))] p-5">
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
                                                                    className="group flex items-center gap-4 rounded-3xl border border-transparent p-4 transition hover:border-[rgba(56,189,248,0.24)] hover:bg-[rgba(255,255,255,0.05)]"
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
                                className="group grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] text-[var(--color-text-muted)] transition hover:border-[rgba(56,189,248,0.4)] hover:text-[var(--color-accent)]"
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
                                className="overflow-hidden border-t border-[var(--color-border)] xl:hidden"
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
                                                className={`flex items-center gap-4 rounded-3xl border p-4 transition ${
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

                                    <div className="flex items-center gap-2 rounded-3xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.035)] p-4 sm:col-span-2">
                                        <LangSwitcher />
                                        <ThemeSwitcher />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};