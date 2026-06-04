"use client";

import {Search} from "lucide-react";
import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

type Props = {
    search: string;
    sortBy: string;
    order: string;
    t: ExoplanetsLocale["systems"];
    onSearch: (value: string) => void;
    onSortBy: (value: string) => void;
    onOrder: (value: string) => void;
};

export const ExoplanetsSystemsFilters = ({
                                             search,
                                             sortBy,
                                             order,
                                             t,
                                             onSearch,
                                             onSortBy,
                                             onOrder,
                                         }: Props) => {
    return (
        <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl">
            <div className="grid gap-3 md:grid-cols-3">
                <label className="grid gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                        {t.search}
                    </span>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-accent)]" />
                        <input
                            value={search}
                            onChange={(event) => onSearch(event.target.value)}
                            placeholder={t.searchPlaceholder}
                            className="input pl-10"
                        />
                    </div>
                </label>

                <Select
                    label={t.sortBy}
                    value={sortBy}
                    onChange={onSortBy}
                    options={[
                        ["sy_pnum", t.planets],
                        ["hostname", t.hostName],
                        ["sy_dist", t.distance],
                        ["st_teff", t.temperature],
                        ["st_mass", t.mass],
                        ["st_rad", t.radius],
                        ["st_age", t.age],
                    ]}
                />

                <Select
                    label={t.order}
                    value={order}
                    onChange={onOrder}
                    options={[
                        ["desc", t.desc],
                        ["asc", t.asc],
                    ]}
                />
            </div>
        </section>
    );
};

type SelectProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: [string, string][];
};

const Select = ({label, value, onChange, options}: SelectProps) => (
    <label className="grid gap-2">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
            {label}
        </span>

        <select value={value} onChange={(event) => onChange(event.target.value)} className="input">
            {options.map(([optionValue, optionLabel]) => (
                <option key={optionValue} value={optionValue}>
                    {optionLabel}
                </option>
            ))}
        </select>
    </label>
);