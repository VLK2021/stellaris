
import type {
    Mission,
    MissionStatus,
    MissionTarget,
    MissionType,
} from "@/src/types/missions";
import {MISSIONS_DATA} from "@/src/constants/missions";

export type MissionsQuery = {
    search?: string;
    status?: MissionStatus | "all";
    type?: MissionType | "all";
    target?: MissionTarget | "all";
};

export const getMissions = (query?: MissionsQuery): Mission[] => {
    const search = query?.search?.trim().toLowerCase();

    return MISSIONS_DATA.filter((mission) => {
        const matchesSearch =
            !search ||
            mission.name.toLowerCase().includes(search) ||
            mission.summary.toLowerCase().includes(search) ||
            mission.description.toLowerCase().includes(search);

        const matchesStatus =
            !query?.status ||
            query.status === "all" ||
            mission.status === query.status;

        const matchesType =
            !query?.type ||
            query.type === "all" ||
            mission.type === query.type;

        const matchesTarget =
            !query?.target ||
            query.target === "all" ||
            mission.target === query.target;

        return matchesSearch && matchesStatus && matchesType && matchesTarget;
    });
};

export const getMissionBySlug = (slug: string): Mission | null => {
    return MISSIONS_DATA.find((mission) => mission.slug === slug) ?? null;
};

export const getMissionStats = () => {
    return {
        total: MISSIONS_DATA.length,
        active: MISSIONS_DATA.filter((mission) => mission.status === "active").length,
        completed: MISSIONS_DATA.filter((mission) => mission.status === "completed").length,
        failed: MISSIONS_DATA.filter((mission) => mission.status === "failed").length,
        partial: MISSIONS_DATA.filter((mission) => mission.status === "partial").length,
    };
};