"use client";

import {useLanguage} from "@/src/context";
import {FooterBrand} from "./FooterBrand";
import {FooterNavigation} from "./FooterNavigation";
import {FooterBottom} from "./FooterBottom";
import type {FooterNavGroup} from "./types";

export const Footer = () => {
    const {locale} = useLanguage();

    const footerNavigation: FooterNavGroup[] = [
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
        <footer className="relative z-10 mt-16 w-full border-t border-[var(--color-border)] bg-[var(--color-header)] backdrop-blur-2xl sm:mt-20 lg:mt-24">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-70" />
            <div className="pointer-events-none absolute left-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_left,var(--color-accent-soft),transparent_62%)]" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_right,rgba(139,92,246,0.12),transparent_62%)]" />

            <div className="relative w-full px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
                <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
                    <FooterBrand locale={locale} />
                    <FooterNavigation groups={footerNavigation} />
                </div>

                <FooterBottom locale={locale} />
            </div>
        </footer>
    );
};