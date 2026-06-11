export type MissionCatalogItem = {
    slug: string;
    name: string;
    wikipediaTitle: string;
    wikidataSearch: string;
    nasaMediaQuery: string;
    category: "crewed" | "robotic" | "telescope" | "station";
    target:
        | "moon"
        | "mars"
        | "venus"
        | "jupiter"
        | "saturn"
        | "asteroid"
        | "deep-space"
        | "earth-orbit";
};

export const MISSIONS_CATALOG: MissionCatalogItem[] = [
    {
        slug: "apollo-11",
        name: "Apollo 11",
        wikipediaTitle: "Apollo 11",
        wikidataSearch: "Apollo 11",
        nasaMediaQuery: "Apollo 11",
        category: "crewed",
        target: "moon",
    },
    {
        slug: "apollo-13",
        name: "Apollo 13",
        wikipediaTitle: "Apollo 13",
        wikidataSearch: "Apollo 13",
        nasaMediaQuery: "Apollo 13",
        category: "crewed",
        target: "moon",
    },
    {
        slug: "voyager-1",
        name: "Voyager 1",
        wikipediaTitle: "Voyager 1",
        wikidataSearch: "Voyager 1",
        nasaMediaQuery: "Voyager 1",
        category: "robotic",
        target: "deep-space",
    },
    {
        slug: "voyager-2",
        name: "Voyager 2",
        wikipediaTitle: "Voyager 2",
        wikidataSearch: "Voyager 2",
        nasaMediaQuery: "Voyager 2",
        category: "robotic",
        target: "deep-space",
    },
    {
        slug: "cassini-huygens",
        name: "Cassini-Huygens",
        wikipediaTitle: "Cassini–Huygens",
        wikidataSearch: "Cassini–Huygens",
        nasaMediaQuery: "Cassini-Huygens",
        category: "robotic",
        target: "saturn",
    },
    {
        slug: "mars-climate-orbiter",
        name: "Mars Climate Orbiter",
        wikipediaTitle: "Mars Climate Orbiter",
        wikidataSearch: "Mars Climate Orbiter",
        nasaMediaQuery: "Mars Climate Orbiter",
        category: "robotic",
        target: "mars",
    },
];

export const getMissionCatalogItemBySlug = (slug: string) => {
    return MISSIONS_CATALOG.find((mission) => mission.slug === slug) ?? null;
};