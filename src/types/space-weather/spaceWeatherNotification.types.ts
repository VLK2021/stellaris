import type {PaginationMeta} from "@/src/types/common/pagination.types";

export type SpaceWeatherNotificationType =
    | "all"
    | "FLR"
    | "SEP"
    | "CME"
    | "IPS"
    | "MPC"
    | "GST"
    | "RBE"
    | "report";

export type RawDonkiNotification = {
    messageID?: string;
    messageType?: string;
    messageIssueTime?: string;
    messageBody?: string;
    messageURL?: string;
};

export type SpaceWeatherNotification = {
    id: string;
    type: string;
    issueTime: string | null;
    title: string;
    body: string;
    url: string | null;
};

export type SpaceWeatherNotificationsQuery = {
    startDate: string;
    endDate: string;
    type?: SpaceWeatherNotificationType;
    page?: number;
    limit?: number;
};

export type SpaceWeatherNotificationsResponse = {
    success: boolean;
    data: SpaceWeatherNotification[];
    pagination: PaginationMeta;
};