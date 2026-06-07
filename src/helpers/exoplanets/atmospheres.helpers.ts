import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

export const formatAtmosphereValue = (
    value: number | null,
    suffix = "",
    digits = 2,
) => {
    if (value === null || !Number.isFinite(value)) return "—";

    return `${Number(value.toFixed(digits))}${suffix}`;
};

export const getAtmosphereScore = (score: number) => {
    return Math.max(0, Math.min(100, score));
};

export const getAtmosphereClassLabel = (
    value: string,
    t: ExoplanetsLocale["atmospheres"],
) => {
    if (value === "temperate") return t.temperateClass;
    if (value === "warm") return t.warmClass;
    if (value === "hot") return t.hotClass;
    if (value === "cold") return t.coldClass;

    return t.unknownClass;
};

export const getAtmosphereCandidateLabel = (
    value: string,
    t: ExoplanetsLocale["atmospheres"],
) => {
    if (value === "rocky_candidate") return t.rockyCandidate;
    if (value === "sub_neptune") return t.subNeptune;
    if (value === "gas_giant") return t.gasGiant;
    if (value === "low_density") return t.lowDensity;

    return t.unknownCandidate;
};

export const getAtmosphereGradient = (value: string) => {
    if (value === "temperate") {
        return "linear-gradient(135deg, rgba(16,185,129,.30), rgba(45,212,191,.12), transparent 70%)";
    }

    if (value === "warm") {
        return "linear-gradient(135deg, rgba(250,204,21,.30), rgba(249,115,22,.12), transparent 70%)";
    }

    if (value === "hot") {
        return "linear-gradient(135deg, rgba(249,115,22,.32), rgba(239,68,68,.14), transparent 70%)";
    }

    if (value === "cold") {
        return "linear-gradient(135deg, rgba(59,130,246,.32), rgba(14,165,233,.14), transparent 70%)";
    }

    return "linear-gradient(135deg, rgba(148,163,184,.18), rgba(15,23,42,.08), transparent 70%)";
};