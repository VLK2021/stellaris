"use client";

import {Search} from "lucide-react";

type Props = {
    search: string;
    onSearch: (value: string) => void;
};

export const ExoplanetsHabitableFilters = ({
                                               search,
                                               onSearch,
                                           }: Props) => {
    return (
        <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-accent)]" />

                <input
                    value={search}
                    onChange={(event) => onSearch(event.target.value)}
                    placeholder="Search exoplanet..."
                    className="input pl-10"
                />
            </div>
        </section>
    );
};