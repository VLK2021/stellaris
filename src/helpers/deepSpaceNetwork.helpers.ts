import type {
    DeepSpaceSignalId,
    DeepSpaceSignalTelemetry,
} from "@/src/types/deepSpaceNetwork";

export const getTelemetryById = (
    telemetry: DeepSpaceSignalTelemetry[] | null | undefined,
    id: DeepSpaceSignalId,
) => {
    return telemetry?.find((item) => item.id === id) ?? null;
};

export const formatDistanceKm = (value: number | null) => {
    if (!value) return "—";

    if (value >= 1_000_000_000) {
        return `${(value / 1_000_000_000).toFixed(2)}B km`;
    }

    if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(2)}M km`;
    }

    return `${value.toLocaleString()} km`;
};

export const formatUpdatedAt = (value: string | null | undefined) => {
    if (!value) return "—";

    return new Date(value).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
};