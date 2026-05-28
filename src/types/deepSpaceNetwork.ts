import type {LucideIcon} from "lucide-react";

export type DeepSpaceSignalId =
    | "voyager1"
    | "jamesWebb"
    | "newHorizons"
    | "iss"
    | "hubble"
    | "mro"
    | "perseverance"
    | "artemis";

export type DeepSpaceSignal = {
    id: DeepSpaceSignalId;
    image: string;
    href: string;
    x: string;
    y: string;
    align: "left" | "right";
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
    statusTitle: string;
    statusValue: string;
    footerTitle: string;
    footerText: string;
    signalStrength: string;
    footerStats: DeepSpaceNetworkFooterStat[];
    stats: DeepSpaceNetworkStat[];
    signals: Record<
        DeepSpaceSignalId,
        {
            title: string;
            region: string;
            distance: string;
            delay: string;
        }
    >;
};