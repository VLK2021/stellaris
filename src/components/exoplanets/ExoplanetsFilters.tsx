"use client";

import {Search} from "lucide-react";

import type {Dispatch, SetStateAction} from "react";
import type {ExoplanetFilters} from "@/src/types/exoplanets/exoplanets.types";

type Props = {
    filters: ExoplanetFilters;
    onChange: Dispatch<SetStateAction<ExoplanetFilters>>;
};

export const ExoplanetsFilters = ({filters, onChange}: Props) => {
    return (
        <div className="mb-5 grid gap-3 md:grid-cols-2 xl:grid-cols-6">
            <label className="grid gap-2 xl:col-span-2">
                <span className="exo-label text-[10px] font-black uppercase tracking-[0.18em]">
                    Search
                </span>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-accent)]" />

                    <input
                        value={filters.search}
                        onChange={(event) =>
                            onChange((prev) => ({
                                ...prev,
                                search: event.target.value,
                            }))
                        }
                        placeholder="Kepler, TOI, TRAPPIST..."
                        className="input pl-10"
                    />
                </div>
            </label>

            <label className="grid gap-2">
                <span className="exo-label text-[10px] font-black uppercase tracking-[0.18em]">
                    Discovery
                </span>

                <select
                    value={filters.discoveryMethod}
                    onChange={(event) =>
                        onChange((prev) => ({
                            ...prev,
                            discoveryMethod: event.target.value,
                        }))
                    }
                    className="input"
                >
                    <option value="">All</option>
                    <option value="Transit">Transit</option>
                    <option value="Radial Velocity">Radial Velocity</option>
                    <option value="Microlensing">Microlensing</option>
                    <option value="Imaging">Imaging</option>
                </select>
            </label>

            <FilterInput
                label="Year from"
                value={filters.yearFrom}
                onChange={(value) =>
                    onChange((prev) => ({
                        ...prev,
                        yearFrom: value,
                    }))
                }
            />

            <FilterInput
                label="Year to"
                value={filters.yearTo}
                onChange={(value) =>
                    onChange((prev) => ({
                        ...prev,
                        yearTo: value,
                    }))
                }
            />

            <FilterInput
                label="Max radius"
                value={filters.radiusMax}
                onChange={(value) =>
                    onChange((prev) => ({
                        ...prev,
                        radiusMax: value,
                    }))
                }
            />

            <FilterInput
                label="Temp min"
                value={filters.tempMin}
                onChange={(value) =>
                    onChange((prev) => ({
                        ...prev,
                        tempMin: value,
                    }))
                }
            />

            <FilterInput
                label="Temp max"
                value={filters.tempMax}
                onChange={(value) =>
                    onChange((prev) => ({
                        ...prev,
                        tempMax: value,
                    }))
                }
            />

            <label className="grid gap-2">
                <span className="exo-label text-[10px] font-black uppercase tracking-[0.18em]">
                    Sort by
                </span>

                <select
                    value={filters.sortBy}
                    onChange={(event) =>
                        onChange((prev) => ({
                            ...prev,
                            sortBy: event.target.value as ExoplanetFilters["sortBy"],
                        }))
                    }
                    className="input"
                >
                    <option value="disc_year">Discovery year</option>
                    <option value="pl_name">Planet name</option>
                    <option value="sy_dist">Distance</option>
                    <option value="pl_rade">Radius</option>
                    <option value="pl_bmasse">Mass</option>
                    <option value="pl_eqt">Temperature</option>
                </select>
            </label>

            <label className="grid gap-2">
                <span className="exo-label text-[10px] font-black uppercase tracking-[0.18em]">
                    Order
                </span>

                <select
                    value={filters.order}
                    onChange={(event) =>
                        onChange((prev) => ({
                            ...prev,
                            order: event.target.value as ExoplanetFilters["order"],
                        }))
                    }
                    className="input"
                >
                    <option value="desc">Desc</option>
                    <option value="asc">Asc</option>
                </select>
            </label>
        </div>
    );
};

type FilterInputProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
};

const FilterInput = ({label, value, onChange}: FilterInputProps) => {
    return (
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
};