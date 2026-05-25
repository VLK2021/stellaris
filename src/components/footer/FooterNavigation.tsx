import Link from "next/link";

import type {FooterNavGroup} from "./types";

type FooterNavigationProps = {
    groups: FooterNavGroup[];
};

export const FooterNavigation = ({groups}: FooterNavigationProps) => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
                <div
                    key={group.title}
                    className="border border-[var(--color-border)] bg-[rgba(255,255,255,0.035)] p-5 backdrop-blur-xl sm:border-0 sm:bg-transparent sm:p-0"
                >
                    <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-text)] sm:text-sm">
                        {group.title}
                    </h3>

                    <div className="mt-4 grid grid-cols-2 gap-3 sm:flex sm:flex-col">
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
    );
};