"use client";

import Link from "next/link";
import {Rocket} from "lucide-react";

import {StellarisLogo} from "@/src/components/StellarisLogo";

type FooterBrandProps = {
    locale: {
        footer: {
            subtitle: string;
            startExploring: string;
            about: string;
        };
        brand: {
            description: string;
        };
    };
};

export const FooterBrand = ({locale}: FooterBrandProps) => {
    return (
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
    );
};