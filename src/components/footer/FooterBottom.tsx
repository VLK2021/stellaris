import Link from "next/link";
import {ExternalLink, Send} from "lucide-react";

import {BRAND} from "@/src/constants/brand";

type FooterBottomProps = {
    locale: {
        footer: {
            copyright: string;
            powered: string;
            independent: string;
            authorCredit: string;
            telegram: string;
        };
    };
};

export const FooterBottom = ({locale}: FooterBottomProps) => {
    return (
        <div className="mt-8 border-t border-[var(--color-border)] px-2 py-7 text-[13px] text-[var(--color-text-muted)] lg:mt-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-3 leading-6 sm:flex-row sm:flex-wrap sm:items-center">
                    <span>
                        © {new Date().getFullYear()} {BRAND.name}.{" "}
                        {locale.footer.copyright}
                    </span>

                    <span className="hidden h-1 w-1 rounded-full bg-[var(--color-text-muted)] sm:block" />

                    <div className="flex flex-wrap items-center gap-2.5">
                        <span>
                            {locale.footer.authorCredit}{" "}
                            <span className="font-semibold text-[var(--color-text)]">
                                {BRAND.author}
                            </span>
                        </span>

                        <Link
                            href={BRAND.telegram}
                            target="_blank"
                            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-accent)] transition hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
                        >
                            <Send className="h-3.5 w-3.5" />
                            {locale.footer.telegram}
                        </Link>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 leading-6 sm:gap-4">
                    <span>{locale.footer.powered}</span>

                    <span className="hidden h-1 w-1 rounded-full bg-[var(--color-text-muted)] sm:block" />

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
    );
};