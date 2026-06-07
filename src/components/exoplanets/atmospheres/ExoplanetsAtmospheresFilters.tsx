"use client";

import {Search} from "lucide-react";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

type Props = {
    search: string;
    sortBy: string;
    order: string;
    t: ExoplanetsLocale["atmospheres"];
    onSearch: (value: string) => void;
    onSortBy: (value: string) => void;
    onOrder: (value: string) => void;
};

export const ExoplanetsAtmospheresFilters = ({
                                                 search,
                                                 sortBy,
                                                 order,
                                                 t,
                                                 onSearch,
                                                 onSortBy,
                                                 onOrder,
                                             }: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
            <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{background: "var(--hero-bg)"}}
            />

            <div className="relative z-10 grid gap-3 md:grid-cols-3">
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
                        ["pl_eqt", t.equilibriumTemp],
                        ["pl_name", t.planetName],
                        ["hostname", t.hostName],
                        ["sy_dist", t.distance],
                        ["pl_rade", t.radius],
                        ["pl_bmasse", t.mass],
                        ["pl_dens", t.density],
                        ["pl_insol", t.insolation],
                        ["disc_year", t.discoveryYear],
                    ]}
                />

                <Select
                    label={t.order}
                    value={order}
                    onChange={onOrder}
                    options={[
                        ["asc", t.asc],
                        ["desc", t.desc],
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

const Select = ({label, value, onChange, options}: SelectProps) => {
    return (
        <label className="grid gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                {label}
            </span>

            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="input"
            >
                {options.map(([optionValue, optionLabel]) => (
                    <option key={optionValue} value={optionValue}>
                        {optionLabel}
                    </option>
                ))}
            </select>
        </label>
    );
};