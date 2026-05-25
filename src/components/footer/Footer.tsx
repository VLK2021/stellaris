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
        <footer className="relative z-10 mt-24 w-full border-t border-[var(--color-border)] bg-[rgba(2,6,23,0.62)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-70" />
            <div className="pointer-events-none absolute left-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_left,rgba(56,189,248,0.13),transparent_60%)]" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_right,rgba(139,92,246,0.13),transparent_60%)]" />

            <div className="relative w-full px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
                <div className="grid gap-10 lg:grid-cols-[1.35fr_2fr]">
                    <FooterBrand locale={locale} />
                    <FooterNavigation groups={footerNavigation} />
                </div>

                <FooterBottom locale={locale} />
            </div>
        </footer>
    );
};