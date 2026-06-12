import Link from "next/link";
import {ArrowUpRight, ExternalLink} from "lucide-react";

import type {FooterNavGroup} from "./types";

type FooterNavigationProps = {
    groups: FooterNavGroup[];
};

export const FooterNavigation = ({groups}: FooterNavigationProps) => {
    return (
        <nav className="grid gap-5 lg:grid-cols-3">
            {groups.map((group) => (
                <section key={group.title}>
                    <h3 className="border-b border-[var(--color-border)] pb-4 text-[11px] font-black uppercase tracking-[0.28em] text-[var(--color-text)]">
                        {group.title}
                    </h3>

                    <div className="mt-4 grid gap-2">
                        {group.links.map((link) => (
                            <Link
                                key={`${group.title}-${link.href}`}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noreferrer" : undefined}
                                className="group flex items-center justify-between gap-4 rounded-2xl border border-transparent px-3 py-3 text-sm font-bold text-[var(--color-text-muted)] transition hover:border-[var(--color-border)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
                            >
                                <span>{link.label}</span>

                                {link.external ? (
                                    <ExternalLink className="h-4 w-4 opacity-60 transition group-hover:opacity-100" />
                                ) : (
                                    <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                                )}
                            </Link>
                        ))}
                    </div>
                </section>
            ))}
        </nav>
    );
};