import type {MediaItem, MediaLocale} from "@/src/types/media";

import {MediaCard} from "./MediaCard";

type Props = {
    items: MediaItem[];
    error: string | null;
    onSelect: (item: MediaItem) => void;
    t: MediaLocale;
};

export const MediaGrid = ({items, error, onSelect, t}: Props) => {
    if (error) {
        return (
            <section className="rounded-[2rem] border border-[var(--color-error)] bg-[var(--color-card)] p-6 text-[var(--color-error)]">
                {error}
            </section>
        );
    }

    if (!items.length) {
        return (
            <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-8 text-center text-[var(--color-text-muted)] shadow-[var(--shadow-card)]">
                {t.noResults}
            </section>
        );
    }

    return (
        <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between gap-4">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--color-accent)]">
                    {t.results}
                </p>

                <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                    {items.length}
                </span>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((item, index) => {
                    const nasaId = item.data[0]?.nasa_id;

                    return (
                        <MediaCard
                            key={nasaId ?? `media-${index}`}
                            item={item}
                            onSelect={onSelect}
                            t={t}
                        />
                    );
                })}
            </div>
        </section>
    );
};