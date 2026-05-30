import type {
    RawDonkiNotification,
    SpaceWeatherNotification,
} from "@/src/types/space-weather/spaceWeatherNotification.types";

export const normalizeNotification = (
    item: RawDonkiNotification,
): SpaceWeatherNotification => {
    const fallbackId = `${item.messageType ?? "notification"}-${item.messageIssueTime ?? crypto.randomUUID()}`;

    const body = item.messageBody ?? "";

    return {
        id: item.messageID ?? fallbackId,
        type: item.messageType ?? "UNKNOWN",
        issueTime: item.messageIssueTime ?? null,
        title: item.messageType
            ? `${item.messageType} Notification`
            : "NASA Notification",
        body,
        url: item.messageURL ?? null,
    };
};