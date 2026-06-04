"use client";

import {Search} from "lucide-react";
import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

type Props = {
    search: string;
    method: string;
    sortBy: string;
    order: string;
    t: ExoplanetsLocale["catalog"];
    onSearch: (value: string) => void;
    onMethod: (value: string) => void;
    onSortBy: (value: string) => void;
    onOrder: (value: string) => void;
};

export const ExoplanetsCatalogFilters = ({
                                             search,
                                             method,
                                             sortBy,
                                             order,
                                             t,
                                             onSearch,
                                             onMethod,
                                             onSortBy,
                                             onOrder,
                                         }: Props) => {
    return (
        <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                <label className="grid gap-2 xl:col-span-2">
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
                    label={t.discoveryMethod}
                    value={method}
                    onChange={onMethod}
                    options={[
                        ["", t.all],
                        ["Transit", "Transit"],
                        ["Radial Velocity", "Radial Velocity"],
                        ["Microlensing", "Microlensing"],
                        ["Imaging", "Imaging"],
                    ]}
                />

                <Select
                    label={t.sortBy}
                    value={sortBy}
                    onChange={onSortBy}
                    options={[
                        ["disc_year", t.discoveryYear],
                        ["pl_name", t.planetName],
                        ["sy_dist", t.distance],
                        ["pl_rade", t.radius],
                        ["pl_bmasse", t.mass],
                        ["pl_eqt", t.temperature],
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