import Link from "next/link";
import {ExternalLink, Rocket, Sparkles} from "lucide-react";

import {BRAND} from "@/src/constants/brand";
import {footerNavigation} from "@/src/constants/navigation";
import {PageContainer} from "@/src/components/layout/PageContainer";

export const Footer = () => {
    return (
        <footer className="relative z-10 mt-24 border-t border-[var(--color-border)]">
            <PageContainer className="py-12 lg:py-16">
                <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-3">
                            <div className="relative grid h-12 w-12 place-items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-soft)]">
                                <Sparkles className="h-5 w-5 text-[var(--color-accent)]" />
                            </div>

                            <div>
                                <div className="text-xl font-semibold tracking-[0.22em]">
                                    {BRAND.name.toUpperCase()}
                                </div>
                                <div className="mt-1 text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                                    Universe Explorer
                                </div>
                            </div>
                        </Link>

                        <p className="mt-5 max-w-md text-sm leading-7 text-[var(--color-text-muted)]">
                            {BRAND.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href="/explore"
                                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-text)] px-5 py-3 text-sm font-semibold text-[var(--color-background)] transition hover:opacity-90"
                            >
                                <Rocket className="h-4 w-4" />
                                Start exploring
                            </Link>

                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-3 text-sm font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-card-solid)]"
                            >
                                About Stellaris
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
                        © {new Date().getFullYear()} Stellaris. Built as an independent educational project.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <span>Powered by NASA Open Data</span>
                        <span className="hidden h-1 w-1 rounded-full bg-[var(--color-text-muted)] md:block" />
                        <span>Not affiliated with NASA</span>
                        <Link
                            href="https://github.com"
                            target="_blank"
                            className="inline-flex items-center gap-2 transition hover:text-[var(--color-accent)]"
                        >
                            <ExternalLink className="h-4 w-4" />
                            GitHub
                        </Link>
                    </div>
                </div>
            </PageContainer>
        </footer>
    );
};