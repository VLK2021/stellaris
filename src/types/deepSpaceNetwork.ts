export type DeepSpaceSignalId =
    | "voyager1"
    | "jamesWebb"
    | "newHorizons"
    | "iss"
    | "hubble"
    | "mro"
    | "perseverance"
    | "artemis";

export type DeepSpaceSignalStatus = "online" | "syncing" | "unavailable";

export type DeepSpaceSignal = {
    id: DeepSpaceSignalId;
    image: string;
    href: string;
    x: string;
    y: string;
    align: "left" | "right";
};

export type DeepSpaceSignalTelemetry = {
    id: DeepSpaceSignalId;
    status: DeepSpaceSignalStatus;
    distanceKm: number | null;
    lightDelay: string | null;
    updatedAt: string | null;
};

export type DeepSpaceNetworkData = {
    signals: DeepSpaceSignalTelemetry[];
    updatedAt: string;
};

export type DeepSpaceNetworkApiResponse = {
    success: boolean;
    data: DeepSpaceNetworkData;
};

export type DeepSpaceNetworkStat = {
    value: string;
    label: string;
    icon: "signal" | "radar" | "uptime";
};

export type DeepSpaceNetworkFooterStat = {
    value: string;
    label: string;
};

export type DeepSpaceNetworkLocale = {
    eyebrow: string;
    title: string;
    subtitle: string;
    text: string;
    coreTitle: string;
    coreStatus: string;
    coreSubtitle: string;
    viewAll: string;
    footerTitle: string;
    footerText: string;
    signalStrength: string;
    unavailable: string;
    distanceFromEarth: string;
    lightDelay: string;
    source: string;
    stats: DeepSpaceNetworkStat[];
    footerStats: DeepSpaceNetworkFooterStat[];
    signals: Record<
        DeepSpaceSignalId,
        {
            title: string;
            region: string;
        }
    >;
};