export type MissionTimelineId =
    | "apollo11"
    | "voyager1"
    | "hubble"
    | "curiosity"
    | "perseverance"
    | "artemis";

export type MissionTimelineMission = {
    id: MissionTimelineId;
    year: string;
    image: string;
    href: string;
    tone: "cyan" | "blue" | "violet" | "orange";
};

export type MissionTimelineLocale = {
    badge: string;
    title: string;
    text: string;
    explore: string;
    labels: {
        launch: string;
        type: string;
        status: string;
        legacy: string;
    };
    stats: {
        value: string;
        label: string;
    }[];
    missions: Record<
        MissionTimelineId,
        {
            name: string;
            short: string;
            description: string;
            tag: string;
            launch: string;
            type: string;
            status: string;
            legacy: string;
        }
    >;
};