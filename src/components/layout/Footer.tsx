"use client";

import Link from "next/link";
import {ExternalLink, Rocket, Sparkles} from "lucide-react";

import {useLanguage} from "@/src/context";
import {PageContainer} from "@/src/components/layout/PageContainer";

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
        <footer className="relative z-10 mt-24 border-t border-[var(--color-border)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-70" />

            <PageContainer className="py-12 lg:py-16">
                <div className="relative overflow-hidden rounded-[36px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.035)] p-6 shadow-[var(--shadow-card)] backdrop-blur-2xl lg:p-8">
                    <div className="pointer-events-none absolute left-[-10%] top-[-20%] h-72 w-72 rounded-full bg-[rgba(56,189,248,0.12)] blur-3xl" />
                    <div className="pointer-events-none absolute bottom-[-30%] right-[-10%] h-80 w-80 rounded-full bg-[rgba(139,92,246,0.12)] blur-3xl" />

                    <div className="relative grid gap-10 lg:grid-cols-[1.35fr_2fr]">
                        <div>
                            <Link href="/" className="inline-flex items-center gap-3">
                                <div className="relative grid h-13 w-13 place-items-center rounded-full border border-[rgba(56,189,248,0.35)] bg-[rgba(8,18,34,0.86)] shadow-[0_0_42px_rgba(56,189,248,0.22)]">
                                    <div className="absolute inset-[-6px] rounded-full border border-[rgba(56,189,248,0.16)]" />
                                    <Sparkles className="h-5 w-5 text-[var(--color-accent)]" />
                                </div>

                                <div>
                                    <div className="text-xl font-black tracking-[0.28em] text-[var(--color-text)]">
                                        STELLARIS
                                    </div>
                                    <div className="mt-1 text-xs uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
                                        {locale.footer.subtitle}
                                    </div>
                                </div>
                            </Link>

                            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--color-text-muted)]">
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

                    <div className="relative mt-12 flex flex-col gap-4 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-muted)] md:flex-row md:items-center md:justify-between">
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
            </PageContainer>
        </footer>
    );
};