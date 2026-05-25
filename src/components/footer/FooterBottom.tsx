import Link from "next/link";
import {ExternalLink} from "lucide-react";

type FooterBottomProps = {
    locale: {
        footer: {
            copyright: string;
            powered: string;
            independent: string;
        };
    };
};

export const FooterBottom = ({locale}: FooterBottomProps) => {
    return (
        <div className="mt-10 flex flex-col gap-5 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-muted)] lg:mt-12 lg:flex-row lg:items-center lg:justify-between">
            <p className="leading-6">
                © {new Date().getFullYear()} Stellaris. {locale.footer.copyright}
            </p>

            <div className="grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
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
    );
};