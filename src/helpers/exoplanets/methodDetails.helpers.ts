import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

export const formatMethodDetailsValue = (
    value: number | null,
    suffix = "",
    digits = 2,
) => {
    if (value === null || !Number.isFinite(value)) return "—";

    return `${Number(value.toFixed(digits))}${suffix}`;
};

export const getMethodKey = (method: string) => {
    const normalized = method.toLowerCase();

    if (normalized.includes("transit")) return "transit";
    if (normalized.includes("radial")) return "radialVelocity";
    if (normalized.includes("imaging")) return "imaging";
    if (normalized.includes("microlensing")) return "microlensing";
    if (normalized.includes("timing")) return "timing";
    if (normalized.includes("astrometry")) return "astrometry";

    return "other";
};

export const getMethodDetailsDescription = (
    method: string,
    t: ExoplanetsLocale["methods"],
) => {
    const key = getMethodKey(method);

    if (key === "transit") return t.transitDescription;
    if (key === "radialVelocity") return t.radialVelocityDescription;
    if (key === "imaging") return t.imagingDescription;
    if (key === "microlensing") return t.microlensingDescription;
    if (key === "timing") return t.timingDescription;
    if (key === "astrometry") return t.astrometryDescription;

    return t.otherDescription;
};

export const getMethodGradient = (method: string) => {
    const key = getMethodKey(method);

    if (key === "transit") {
        return "linear-gradient(135deg, rgba(56,189,248,.3), rgba(139,92,246,.14), transparent 72%)";
    }

    if (key === "radialVelocity") {
        return "linear-gradient(135deg, rgba(34,197,94,.28), rgba(45,212,191,.12), transparent 72%)";
    }

    if (key === "imaging") {
        return "linear-gradient(135deg, rgba(250,204,21,.3), rgba(249,115,22,.12), transparent 72%)";
    }

    if (key === "microlensing") {
        return "linear-gradient(135deg, rgba(168,85,247,.32), rgba(236,72,153,.12), transparent 72%)";
    }

    if (key === "timing") {
        return "linear-gradient(135deg, rgba(14,165,233,.3), rgba(99,102,241,.12), transparent 72%)";
    }

    if (key === "astrometry") {
        return "linear-gradient(135deg, rgba(244,114,182,.28), rgba(59,130,246,.12), transparent 72%)";
    }

    return "linear-gradient(135deg, rgba(148,163,184,.18), rgba(15,23,42,.08), transparent 72%)";
};

export const getMethodPros = (
    method: string,
    t: ExoplanetsLocale["methods"],
) => {
    const key = getMethodKey(method);

    if (key === "transit") {
        return [t.transitProOne, t.transitProTwo, t.transitProThree];
    }

    if (key === "radialVelocity") {
        return [t.radialVelocityProOne, t.radialVelocityProTwo, t.radialVelocityProThree];
    }

    if (key === "imaging") {
        return [t.imagingProOne, t.imagingProTwo, t.imagingProThree];
    }

    return [t.generalProOne, t.generalProTwo, t.generalProThree];
};

export const getMethodCons = (
    method: string,
    t: ExoplanetsLocale["methods"],
) => {
    const key = getMethodKey(method);

    if (key === "transit") {
        return [t.transitConOne, t.transitConTwo];
    }

    if (key === "radialVelocity") {
        return [t.radialVelocityConOne, t.radialVelocityConTwo];
    }

    if (key === "imaging") {
        return [t.imagingConOne, t.imagingConTwo];
    }

    return [t.generalConOne, t.generalConTwo];
};