import {
    MISSIONS_CATALOG,
    getMissionCatalogItemBySlug,
} from "@/src/constants/missions";

import type {MissionCatalogItem} from "@/src/constants/missions";

export type MissionsQuery = {
    search?: string;
    category?: MissionCatalogItem["category"] | "all";
    target?: MissionCatalogItem["target"] | "all";
};

export const getMissions = (
    query?: MissionsQuery,
): MissionCatalogItem[] => {
    const search = query?.search?.trim().toLowerCase();

    return MISSIONS_CATALOG.filter((mission) => {
        const matchesSearch =
            !search ||
            mission.name.toLowerCase().includes(search) ||
            mission.slug.toLowerCase().includes(search) ||
            mission.wikipediaTitle.toLowerCase().includes(search) ||
            mission.nasaMediaQuery.toLowerCase().includes(search);

        const matchesCategory =
            !query?.category ||
            query.category === "all" ||
            mission.category === query.category;

        const matchesTarget =
            !query?.target ||
            query.target === "all" ||
            mission.target === query.target;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesTarget
        );
    });
};

export const getMissionBySlug = (
    slug: string,
): MissionCatalogItem | null => {
    return getMissionCatalogItemBySlug(slug);
};

export const getMissionStats = () => {
    return {
        total: MISSIONS_CATALOG.length,
        crewed: MISSIONS_CATALOG.filter(
            (mission) => mission.category === "crewed",
        ).length,
        robotic: MISSIONS_CATALOG.filter(
            (mission) => mission.category === "robotic",
        ).length,
        telescope: MISSIONS_CATALOG.filter(
            (mission) => mission.category === "telescope",
        ).length,
        station: MISSIONS_CATALOG.filter(
            (mission) => mission.category === "station",
        ).length,
    };
};