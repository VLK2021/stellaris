import type {ApodExplorerLocale, ApodItem} from "@/src/types/apod/apod.types";
import {ApodCard} from "./ApodCard";

type Props = {
    locale: ApodExplorerLocale;
    items: ApodItem[];
    error: string | null;
};

export const ApodGrid = ({locale, items, error}: Props) => {
    if (error) {
        return (
            <div className="mt-6 rounded-[1.7rem] border border-red-400/20 bg-red-500/10 p-5 text-sm text-red-200">
                {error}
            </div>
        );
    }

    if (!items.length) {
        return (
            <div className="mt-6 rounded-[1.7rem] border border-white/10 bg-white/[0.035] p-7 text-center text-sm text-slate-400">
                {locale.noData}
            </div>
        );
    }

    return (
        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
                <ApodCard
                    key={`${item.date}-${item.title}`}
                    item={item}
                    locale={locale}
                />
            ))}
        </section>
    );
};