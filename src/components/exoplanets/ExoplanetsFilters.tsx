"use client";

import {Search} from "lucide-react";

import type {Dispatch, SetStateAction} from "react";
import type {ExoplanetFilters} from "@/src/types/exoplanets/exoplanets.types";
import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

type Props = {
    filters: ExoplanetFilters;
    onChange: Dispatch<SetStateAction<ExoplanetFilters>>;
    t: ExoplanetsLocale;
};

export const ExoplanetsFilters = ({filters, onChange, t}: Props) => {
    const update = (patch: Partial<ExoplanetFilters>) => {
        onChange((prev) => ({
            ...prev,
            ...patch,
            page: 1,
        }));
    };

    return (
        <div className="mb-5 grid gap-3 md:grid-cols-2 xl:grid-cols-6">
            <label className="grid gap-2 xl:col-span-2">
                <span className="exo-label text-[10px] font-black uppercase tracking-[0.18em]">
                    {t.explorer.search}
                </span>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-accent)]" />

                    <input
                        value={filters.search}
                        onChange={(event) => update({search: event.target.value})}
                        placeholder={t.explorer.searchPlaceholder}
                        className="input pl-10"
                    />
                </div>
            </label>

            <Select
                label={t.explorer.discovery}
                value={filters.discoveryMethod}
                onChange={(value) => update({discoveryMethod: value})}
                options={[
                    ["", t.explorer.all],
                    ["Transit", "Transit"],
                    ["Radial Velocity", "Radial Velocity"],
                    ["Microlensing", "Microlensing"],
                    ["Imaging", "Imaging"],
                ]}
            />

            <FilterInput label={t.explorer.yearFrom} value={filters.yearFrom} onChange={(value) => update({yearFrom: value})} />
            <FilterInput label={t.explorer.yearTo} value={filters.yearTo} onChange={(value) => update({yearTo: value})} />
            <FilterInput label={t.explorer.maxRadius} value={filters.radiusMax} onChange={(value) => update({radiusMax: value})} />
            <FilterInput label={t.explorer.tempMin} value={filters.tempMin} onChange={(value) => update({tempMin: value})} />
            <FilterInput label={t.explorer.tempMax} value={filters.tempMax} onChange={(value) => update({tempMax: value})} />

            <Select
                label={t.explorer.sortBy}
                value={filters.sortBy}
                onChange={(value) => update({sortBy: value as ExoplanetFilters["sortBy"]})}
                options={[
                    ["disc_year", t.explorer.discoveryYear],
                    ["pl_name", t.explorer.planetName],
                    ["sy_dist", t.explorer.distance],
                    ["pl_rade", t.explorer.radius],
                    ["pl_bmasse", t.explorer.mass],
                    ["pl_eqt", t.explorer.temperature],
                ]}
            />

            <Select
                label={t.explorer.order}
                value={filters.order}
                onChange={(value) => update({order: value as ExoplanetFilters["order"]})}
                options={[
                    ["desc", t.explorer.desc],
                    ["asc", t.explorer.asc],
                ]}
            />
        </div>
    );
};

type FilterInputProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
};

const FilterInput = ({label, value, onChange}: FilterInputProps) => (
    <label className="grid gap-2">
        <span className="exo-label text-[10px] font-black uppercase tracking-[0.18em]">
            {label}
        </span>

        <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="input"
        />
    </label>
);

type SelectProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: [string, string][];
};

const Select = ({label, value, onChange, options}: SelectProps) => (
    <label className="grid gap-2">
        <span className="exo-label text-[10px] font-black uppercase tracking-[0.18em]">
            {label}
        </span>

        <select
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="input"
        >
            {options.map(([optionValue, label]) => (
                <option key={optionValue} value={optionValue}>
                    {label}
                </option>
            ))}
        </select>
    </label>
);