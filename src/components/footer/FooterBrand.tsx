"use client";

import Link from "next/link";
import {BookOpenText, Rocket} from "lucide-react";

import {StellarisLogo} from "@/src/components/StellarisLogo";

type FooterBrandProps = {
    locale: {
        footer: {
            subtitle: string;
            eyebrow: string;
            title: string;
            text: string;
            startExploring: string;
            manifest: string;
        };
    };
};

export const FooterBrand = ({locale}: FooterBrandProps) => {
    return (
        <section>
            <Link href="/" className="inline-flex">
                <StellarisLogo subtitle={locale.footer.subtitle} />
            </Link>

            <p className="mt-8 text-[10px] font-black uppercase tracking-[0.28em] text-[var(--color-accent)]">
                {locale.footer.eyebrow}
            </p>

            <h2 className="mt-4 max-w-2xl bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-4xl font-black uppercase leading-[0.9] tracking-[-0.075em] text-transparent md:text-5xl">
                {locale.footer.title}
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--color-text-muted)]">
                {locale.footer.text}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
                <Link
                    href="/missions"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-black text-[var(--color-card-solid)] shadow-[var(--shadow-glow)] transition hover:-translate-y-0.5"
                >
                    <Rocket className="h-4 w-4" />
                    {locale.footer.startExploring}
                </Link>

                <Link
                    href="/manifest"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass-strong)] px-5 py-3 text-sm font-black text-[var(--color-text)] transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                    <BookOpenText className="h-4 w-4" />
                    {locale.footer.manifest}
                </Link>
            </div>
        </section>
    );
};