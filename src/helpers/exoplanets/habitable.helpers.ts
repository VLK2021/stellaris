import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

const SPACE_BACKGROUNDS = [
    "https://images-assets.nasa.gov/image/PIA14417/PIA14417~orig.jpg",
    "https://images-assets.nasa.gov/image/PIA15256/PIA15256~orig.jpg",
    "https://images-assets.nasa.gov/image/PIA09178/PIA09178~orig.jpg",
];

export const formatHabitableValue = (
    value: number | null,
    suffix = "",
    digits = 2,
) => {
    if (value === null || !Number.isFinite(value)) return "—";

    return `${Number(value.toFixed(digits))}${suffix}`;
};

export const getHabitableBackground = (value: string) => {
    const index =
        value.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
        SPACE_BACKGROUNDS.length;

    return SPACE_BACKGROUNDS[index];
};

export const getHabitableScore = (score: number) => {
    return Math.max(0, Math.min(100, score));
};

export const getHabitableZoneLabel = (
    zone: string,
    t: ExoplanetsLocale["habitable"],
) => {
    if (zone === "temperate") return t.temperateZone;
    if (zone === "hot") return t.hotZone;
    if (zone === "cold") return t.coldZone;

    return t.unknownZone;
};

export const getHabitableCandidateLabel = (
    score: number,
    t: ExoplanetsLocale["habitable"],
) => {
    if (score >= 75) return t.strongCandidate;
    if (score >= 55) return t.moderateCandidate;

    return t.weakCandidate;
};

export const getHabitableZoneGradient = (zone: string) => {
    if (zone === "temperate") {
        return "linear-gradient(135deg, rgba(16,185,129,.22), rgba(45,212,191,.08), transparent)";
    }

    if (zone === "hot") {
        return "linear-gradient(135deg, rgba(249,115,22,.26), rgba(239,68,68,.08), transparent)";
    }

    if (zone === "cold") {
        return "linear-gradient(135deg, rgba(59,130,246,.26), rgba(14,165,233,.08), transparent)";
    }

    return "linear-gradient(135deg, rgba(148,163,184,.18), rgba(15,23,42,.08), transparent)";
};

export const getHabitableScoreColor = (score: number) => {
    if (score >= 75) return "bg-emerald-400";
    if (score >= 55) return "bg-cyan-400";

    return "bg-orange-400";
};