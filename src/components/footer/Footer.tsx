"use client";

import {useLanguage} from "@/src/context";

import {FooterBrand} from "./FooterBrand";
import {FooterBottom} from "./FooterBottom";
import {FooterNavigation} from "./FooterNavigation";

import type {FooterNavGroup} from "./types";

export const Footer = () => {
    const {locale} = useLanguage();

    const footerNavigation: FooterNavGroup[] = [
        {
            title: locale.footer.explore,
            links: [
                {label: locale.nav.home, href: "/"},
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
            ],
        },
        {
            title: locale.footer.platform,
            links: [
                {label: locale.footer.manifest, href: "/manifest"},
                {
                    label: locale.footer.nasaApi,
                    href: "https://api.nasa.gov/",
                    external: true,
                },
            ],
        },
    ];

    return (
        <footer className="relative z-10 mt-16 w-full overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-header)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />
                <div className="absolute left-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_left,var(--color-accent-soft),transparent_60%)]" />
                <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_right,var(--color-glass),transparent_60%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] bg-[size:72px_72px] opacity-15" />
            </div>

            <div className="relative mx-auto max-w-[1540px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                <div className="rounded-[2.4rem] border border-[var(--color-border)] bg-[var(--color-glass)] shadow-[var(--shadow-card)] backdrop-blur-2xl">
                    <div className="grid gap-10 p-6 lg:p-8 xl:grid-cols-[0.95fr_1.45fr]">
                        <FooterBrand locale={locale} />
                        <FooterNavigation groups={footerNavigation} />
                    </div>

                    <FooterBottom locale={locale} />
                </div>
            </div>
        </footer>
    );
};