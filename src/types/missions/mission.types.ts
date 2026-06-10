export type MissionStatus =
    | "active"
    | "completed"
    | "failed"
    | "partial"
    | "planned";

export type MissionType =
    | "crewed"
    | "rover"
    | "lander"
    | "orbiter"
    | "flyby"
    | "sample-return"
    | "telescope"
    | "probe"
    | "space-station";

export type MissionTarget =
    | "moon"
    | "mars"
    | "venus"
    | "jupiter"
    | "saturn"
    | "asteroid"
    | "earth-orbit"
    | "deep-space";

export type MissionCrewMember = {
    name: string;
    role: string;
};

export type Mission = {
    id: string;
    slug: string;
    name: string;
    agency: string[];
    status: MissionStatus;
    type: MissionType;
    target: MissionTarget;
    launchDate: string | null;
    endDate: string | null;
    spacecraft: string[];
    crew: MissionCrewMember[];
    summary: string;
    description: string;
    outcome: string;
    achievements: string[];
    mediaQuery: string;
    sources: {
        title: string;
        url: string;
    }[];
};