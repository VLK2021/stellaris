"use client";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";
import type {ExoplanetDetails} from "./ExoplanetDetailsPage";

type Props = {
    data: ExoplanetDetails;
    t: ExoplanetsLocale["details"];
};

const format = (value: number | null, suffix = "", digits = 2) => {
    if (value === null || !Number.isFinite(value)) return "—";
    return `${Number(value.toFixed(digits))}${suffix}`;
};

export const ExoplanetScienceConsole = ({data, t}: Props) => {
    return (
        <footer className="overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl">
            <div className="flex gap-3 overflow-x-auto pb-1">
                <ConsoleMetric label={t.distance} value={format(data.sy_dist, " pc")} />
                <ConsoleMetric label={t.semiMajorAxis} value={format(data.pl_orbsmax, " AU")} />
                <ConsoleMetric label={t.eccentricity} value={format(data.pl_orbeccen)} />
                <ConsoleMetric label={t.inclination} value={format(data.pl_orbincl, "°")} />
                <ConsoleMetric label={t.density} value={format(data.pl_dens, " g/cm³")} />
                <ConsoleMetric label={t.insolation} value={format(data.pl_insol, " S⊕")} />
                <ConsoleMetric label={t.telescope} value={data.disc_telescope ?? "—"} />
                <ConsoleMetric label={t.instrument} value={data.disc_instrument ?? "—"} />
                <ConsoleMetric label={t.planetsInSystem} value={data.sy_pnum ?? "—"} />
            </div>
        </footer>
    );
};

const ConsoleMetric = ({label, value}: {label: string; value: string | number}) => (
    <div className="min-w-[190px] rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-card)]/45 p-4">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {label}
        </p>
        <p className="mt-2 truncate text-sm font-black text-[var(--color-text)]">{value}</p>
    </div>
);