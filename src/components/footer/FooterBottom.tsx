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
        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-muted)] md:flex-row md:items-center md:justify-between">
            <p>
                © {new Date().getFullYear()} Stellaris. {locale.footer.copyright}
            </p>

            <div className="flex flex-wrap items-center gap-4">
                <span>{locale.footer.powered}</span>
                <span className="hidden h-1 w-1 rounded-full bg-[var(--color-text-muted)] md:block" />
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