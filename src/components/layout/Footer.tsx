"use client";

import Link from "next/link";
import {ExternalLink, Rocket} from "lucide-react";

import {useLanguage} from "@/src/context";
import {StellarisLogo} from "../StellarisLogo";

export const Footer = () => {
    const {locale} = useLanguage();

    const footerNavigation = [
        {
            title: locale.footer.explore,
            links: [
                {label: locale.nav.home, href: "/"},
                {label: locale.nav.explore, href: "/explore"},
                {label: locale.nav.earth, href: "/earth"},
                {label: locale.nav.mars, href: "/mars"},
                {label: locale.nav.asteroids, href: "/asteroids"},
                {label: locale.nav.spaceWeather, href: "/space-weather"},
            ],
        },
        {
            title: locale.footer.universe,
            links: [
                {label: locale.nav.apod, href: "/apod"},
                {label: locale.nav.media, href: "/media"},
                {label: locale.nav.exoplanets, href: "/exoplanets"},
                {label: locale.nav.missions, href: "/missions"},
                {label: locale.nav.satellites, href: "/orbits"},
                {label: locale.nav.live, href: "/live"},
            ],
        },
        {
            title: locale.footer.research,
            links: [
                {label: locale.nav.technology, href: "/technology"},
                {label: locale.nav.openData, href: "/datasets"},
                {label: locale.nav.climate, href: "/climate"},
                {label: locale.nav.cneos, href: "/cneos"},
                {label: locale.nav.genelab, href: "/genelab"},
                {label: locale.nav.search, href: "/search"},
            ],
        },
    ];

    return (
        <footer className="relative z-10 mt-24 w-full border-t border-[var(--color-border)] bg-[rgba(2,6,23,0.62)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-70" />
            <div className="pointer-events-none absolute left-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_left,rgba(56,189,248,0.13),transparent_60%)]" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_right,rgba(139,92,246,0.13),transparent_60%)]" />

            <div className="relative w-full px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
                <div className="grid gap-10 lg:grid-cols-[1.35fr_2fr]">
                    <div>
                        <Link href="/" className="inline-flex">
                            <StellarisLogo subtitle={locale.footer.subtitle} />
                        </Link>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--color-text-muted)]">
                            {locale.brand.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href="/explore"
                                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-text)] px-5 py-3 text-sm font-semibold text-[var(--color-background)] transition hover:opacity-90"
                            >
                                <Rocket className="h-4 w-4" />
                                {locale.footer.startExploring}
                            </Link>

                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] px-5 py-3 text-sm font-semibold text-[var(--color-text)] transition hover:border-[rgba(56,189,248,0.35)] hover:text-[var(--color-accent)]"
                            >
                                {locale.footer.about}
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-3">
                        {footerNavigation.map((group) => (
                            <div key={group.title}>
                                <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-text)]">
                                    {group.title}
                                </h3>

                                <div className="mt-5 flex flex-col gap-3">
                                    {group.links.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-accent)]"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-4 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-muted)] md:flex-row md:items-center md:justify-between">
                    <p>
                        © {new Date().getFullYear()} Stellaris. {locale.footer.copyright}
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <span>{locale.footer.powered}</span>
                        <span className="hidden h-1 w-1 rounded-full bg-[var(--color-text-muted)] md:block" />
                        <span>{locale.footer.independent}</span>

                        <Link
                            href="https://api.nasa.gov/"
                            target="_blank"
                            className="inline-flex items-center gap-2 transition hover:text-[var(--color-accent)]"
                        >
                            <ExternalLink className="h-4 w-4" />
                            NASA API
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};