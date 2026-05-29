import type {AsteroidItem} from "@/src/types/asteroids/asteroids.types";
import type {AsteroidsLocale} from "@/src/types/asteroids/asteroidsUi.types";

import {AsteroidCard} from "./AsteroidCard";

type Props = {
    locale: AsteroidsLocale;
    items: AsteroidItem[];
    error: string | null;
};

export const AsteroidsGrid = ({locale, items, error}: Props) => {
    if (error) {
        return (
            <div className="mt-5 rounded-[1.5rem] border border-[var(--color-error)]/30 bg-[var(--color-error)]/10 p-5 text-sm text-[var(--color-error)]">
                {error}
            </div>
        );
    }

    if (!items.length) {
        return (
            <div className="mt-5 rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-card)] p-7 text-center text-sm text-[var(--color-text-muted)]">
                {locale.noData}
            </div>
        );
    }

    return (
        <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
                <AsteroidCard
                    key={item.id}
                    item={item}
                    locale={locale}
                />
            ))}
        </section>
    );
};