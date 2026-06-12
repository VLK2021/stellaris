import Link from "next/link";
import {ExternalLink, ShieldCheck} from "lucide-react";

type FooterBottomProps = {
    locale: {
        footer: {
            copyright: string;
            powered: string;
            independent: string;
            nasaApi: string;
        };
    };
};

export const FooterBottom = ({locale}: FooterBottomProps) => {
    return (
        <div className="border-t border-[var(--color-border)] px-6 py-5 lg:px-8">
            <div className="flex flex-col gap-4 text-xs text-[var(--color-text-muted)] lg:flex-row lg:items-center lg:justify-between">
                <p>
                    © {new Date().getFullYear()} Stellaris. {locale.footer.copyright}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-[var(--color-accent)]" />
                        {locale.footer.powered}
                    </span>

                    <span className="hidden h-1 w-1 rounded-full bg-[var(--color-text-muted)] sm:block" />

                    <span>{locale.footer.independent}</span>

                    <Link
                        href="https://api.nasa.gov/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 transition hover:text-[var(--color-accent)]"
                    >
                        <ExternalLink className="h-4 w-4" />
                        {locale.footer.nasaApi}
                    </Link>
                </div>
            </div>
        </div>
    );
};