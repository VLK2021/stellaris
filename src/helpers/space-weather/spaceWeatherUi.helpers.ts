import type {SpaceWeatherEvent} from "@/src/types/space-weather/spaceWeather.types";

export const formatNumber = (
    value: number | null,
    digits = 0,
): string => {
    if (value === null || !Number.isFinite(value)) {
        return "—";
    }

    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: digits,
    }).format(value);
};

export const getEventTime = (
    event: SpaceWeatherEvent,
): string | null => {
    return event.startTime ?? event.endTime ?? null;
};

export const getFlareTone = (
    classType: string | null,
): string => {
    const letter = classType?.[0]?.toUpperCase();

    if (letter === "X") {
        return "danger";
    }

    if (letter === "M") {
        return "warning";
    }

    if (letter === "C") {
        return "accent";
    }

    return "muted";
};

export const getEventTone = (
    type: SpaceWeatherEvent["type"],
): string => {
    if (type === "FLR") {
        return "warning";
    }

    if (
        type === "CME" ||
        type === "CME_ANALYSIS"
    ) {
        return "danger";
    }

    if (type === "GST") {
        return "accent";
    }

    if (
        type === "SEP" ||
        type === "IPS"
    ) {
        return "warning";
    }

    return "muted";
};

export const getToneClasses = (
    tone: string,
): string => {
    if (tone === "danger") {
        return "border-[var(--color-error)]/35 bg-[var(--color-error)]/10 text-[var(--color-error)]";
    }

    if (tone === "warning") {
        return "border-[var(--color-warning)]/35 bg-[var(--color-warning)]/10 text-[var(--color-warning)]";
    }

    if (tone === "accent") {
        return "border-[var(--color-accent)]/35 bg-[var(--color-accent-soft)] text-[var(--color-accent)]";
    }

    return "border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-text-muted)]";
};