"use client";

import {Search} from "lucide-react";

type Props = {
    search: string;
    onSearch: (value: string) => void;
};

export const ExoplanetsHabitableFilters = ({search, onSearch}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
            <div className="pointer-events-none absolute inset-0 opacity-20" style={{background: "var(--hero-bg)"}} />

            <div className="relative z-10 grid gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                    Search
                </span>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-accent)]" />

                    <input
                        value={search}
                        onChange={(event) => onSearch(event.target.value)}
                        placeholder="Kepler, TRAPPIST, TOI..."
                        className="input pl-10"
                    />
                </div>
            </div>
        </section>
    );
};