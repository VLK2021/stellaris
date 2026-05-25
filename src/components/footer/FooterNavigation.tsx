import Link from "next/link";

import type {FooterNavGroup} from "./types";

type FooterNavigationProps = {
    groups: FooterNavGroup[];
};

export const FooterNavigation = ({groups}: FooterNavigationProps) => {
    return (
        <div className="grid gap-8 sm:grid-cols-3">
            {groups.map((group) => (
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
    );
};