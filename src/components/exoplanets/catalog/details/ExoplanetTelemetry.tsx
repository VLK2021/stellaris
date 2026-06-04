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

export const ExoplanetTelemetry = ({data, t}: Props) => {
    return (
        <aside className="flex flex-col gap-3 rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-5 backdrop-blur-xl">
            <TelemetryLine label={t.radiusEarth} value={format(data.pl_rade, " R⊕")} percent={data.pl_rade ? Math.min(data.pl_rade * 12, 100) : 22} />
            <TelemetryLine label={t.massEarth} value={format(data.pl_bmasse, " M⊕")} percent={data.pl_bmasse ? Math.min(data.pl_bmasse * 4, 100) : 18} />
            <TelemetryLine label={t.equilibriumTemp} value={format(data.pl_eqt, " K", 1)} percent={data.pl_eqt ? Math.min(data.pl_eqt / 10, 100) : 30} />
            <TelemetryLine label={t.orbitPeriod} value={format(data.pl_orbper, " d")} percent={data.pl_orbper ? Math.min(data.pl_orbper / 10, 100) : 24} />

            <div className="mt-auto rounded-[1.3rem] border border-[var(--color-border)] bg-[var(--color-card)]/50 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                    {t.hostStar}
                </p>
                <p className="mt-2 text-xl font-black text-[var(--color-text)]">
                    {data.hostname ?? "—"}
                </p>
                <p className="mt-3 text-xs leading-5 text-[var(--color-text-muted)]">
                    {t.starTemperature}: {format(data.st_teff, " K")} · {t.starMass}: {format(data.st_mass, " M☉")}
                </p>
            </div>
        </aside>
    );
};

const TelemetryLine = ({
                           label,
                           value,
                           percent,
                       }: {
    label: string;
    value: string;
    percent: number;
}) => (
    <div className="rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-card)]/45 p-4">
        <div className="flex items-center justify-between gap-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                {label}
            </p>
            <p className="text-xs font-black text-[var(--color-text)]">{value}</p>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--color-glass)]">
            <div
                className="h-full rounded-full bg-[var(--color-accent)] shadow-[var(--shadow-glow)]"
                style={{width: `${Math.max(6, percent)}%`}}
            />
        </div>
    </div>
);