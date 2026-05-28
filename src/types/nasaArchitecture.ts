export type NasaArchitectureNodeTone =
    | "cyan"
    | "green"
    | "orange"
    | "violet"
    | "blue"
    | "pink";

export type NasaArchitectureNodeId =
    | "liveStreams"
    | "earthSystems"
    | "planetaryMedia"
    | "deepResearch"
    | "satelliteOrbits"
    | "openData"
    | "technology"
    | "infrastructure";

export type NasaArchitectureIconName =
    | "activity"
    | "earth"
    | "mars"
    | "galaxy"
    | "satellite"
    | "database"
    | "terminal"
    | "shield";

export type NasaArchitectureNode = {
    id: NasaArchitectureNodeId;
    icon: NasaArchitectureIconName;
    tone: NasaArchitectureNodeTone;
    status: "live" | "archive" | "research" | "system";
    apis: string[];
    position: "left" | "right";
};

export type NasaArchitectureStat = {
    value: string;
    label: string;
    icon: NasaArchitectureIconName;
};

export type NasaArchitectureFeature = {
    title: string;
    text: string;
    icon: NasaArchitectureIconName;
};

export type NasaArchitectureLocale = {
    badge: string;
    title: string;
    text: string;
    coreTitle: string;
    coreSubtitle: string;
    stats: NasaArchitectureStat[];
    nodes: Record<
        NasaArchitectureNodeId,
        {
            title: string;
            text: string;
        }
    >;
    features: NasaArchitectureFeature[];
};