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
    {slug: "mercury-redstone-3", name: "Mercury-Redstone 3", wikipediaTitle: "Mercury-Redstone 3", wikidataSearch: "Mercury-Redstone 3", nasaMediaQuery: "Freedom 7 Alan Shepard", category: "crewed", target: "earth-orbit"},
    {slug: "friendship-7", name: "Friendship 7", wikipediaTitle: "Mercury-Atlas 6", wikidataSearch: "Mercury-Atlas 6", nasaMediaQuery: "John Glenn Friendship 7", category: "crewed", target: "earth-orbit"},
    {slug: "gemini-4", name: "Gemini 4", wikipediaTitle: "Gemini 4", wikidataSearch: "Gemini 4", nasaMediaQuery: "Gemini 4 Ed White", category: "crewed", target: "earth-orbit"},
    {slug: "gemini-8", name: "Gemini 8", wikipediaTitle: "Gemini 8", wikidataSearch: "Gemini 8", nasaMediaQuery: "Gemini 8", category: "crewed", target: "earth-orbit"},

    {slug: "apollo-8", name: "Apollo 8", wikipediaTitle: "Apollo 8", wikidataSearch: "Apollo 8", nasaMediaQuery: "Apollo 8", category: "crewed", target: "moon"},
    {slug: "apollo-11", name: "Apollo 11", wikipediaTitle: "Apollo 11", wikidataSearch: "Apollo 11", nasaMediaQuery: "Apollo 11", category: "crewed", target: "moon"},
    {slug: "apollo-12", name: "Apollo 12", wikipediaTitle: "Apollo 12", wikidataSearch: "Apollo 12", nasaMediaQuery: "Apollo 12", category: "crewed", target: "moon"},
    {slug: "apollo-13", name: "Apollo 13", wikipediaTitle: "Apollo 13", wikidataSearch: "Apollo 13", nasaMediaQuery: "Apollo 13", category: "crewed", target: "moon"},
    {slug: "apollo-15", name: "Apollo 15", wikipediaTitle: "Apollo 15", wikidataSearch: "Apollo 15", nasaMediaQuery: "Apollo 15", category: "crewed", target: "moon"},
    {slug: "apollo-17", name: "Apollo 17", wikipediaTitle: "Apollo 17", wikidataSearch: "Apollo 17", nasaMediaQuery: "Apollo 17", category: "crewed", target: "moon"},

    {slug: "skylab", name: "Skylab", wikipediaTitle: "Skylab", wikidataSearch: "Skylab", nasaMediaQuery: "Skylab", category: "station", target: "earth-orbit"},
    {slug: "sts-1", name: "STS-1", wikipediaTitle: "STS-1", wikidataSearch: "STS-1", nasaMediaQuery: "STS-1 Columbia", category: "crewed", target: "earth-orbit"},
    {slug: "sts-51-l", name: "STS-51-L", wikipediaTitle: "STS-51-L", wikidataSearch: "STS-51-L", nasaMediaQuery: "Challenger STS-51-L", category: "crewed", target: "earth-orbit"},
    {slug: "sts-107", name: "STS-107", wikipediaTitle: "STS-107", wikidataSearch: "STS-107", nasaMediaQuery: "Columbia STS-107", category: "crewed", target: "earth-orbit"},
    {slug: "international-space-station", name: "International Space Station", wikipediaTitle: "International Space Station", wikidataSearch: "International Space Station", nasaMediaQuery: "International Space Station", category: "station", target: "earth-orbit"},

    {slug: "artemis-1", name: "Artemis I", wikipediaTitle: "Artemis 1", wikidataSearch: "Artemis 1", nasaMediaQuery: "Artemis I", category: "crewed", target: "moon"},
    {slug: "artemis-2", name: "Artemis II", wikipediaTitle: "Artemis 2", wikidataSearch: "Artemis 2", nasaMediaQuery: "Artemis II", category: "crewed", target: "moon"},

    {slug: "mariner-2", name: "Mariner 2", wikipediaTitle: "Mariner 2", wikidataSearch: "Mariner 2", nasaMediaQuery: "Mariner 2", category: "robotic", target: "venus"},
    {slug: "mariner-4", name: "Mariner 4", wikipediaTitle: "Mariner 4", wikidataSearch: "Mariner 4", nasaMediaQuery: "Mariner 4 Mars", category: "robotic", target: "mars"},
    {slug: "viking-1", name: "Viking 1", wikipediaTitle: "Viking 1", wikidataSearch: "Viking 1", nasaMediaQuery: "Viking 1 Mars", category: "robotic", target: "mars"},
    {slug: "viking-2", name: "Viking 2", wikipediaTitle: "Viking 2", wikidataSearch: "Viking 2", nasaMediaQuery: "Viking 2 Mars", category: "robotic", target: "mars"},
    {slug: "mars-pathfinder", name: "Mars Pathfinder", wikipediaTitle: "Mars Pathfinder", wikidataSearch: "Mars Pathfinder", nasaMediaQuery: "Mars Pathfinder Sojourner", category: "robotic", target: "mars"},
    {slug: "mars-climate-orbiter", name: "Mars Climate Orbiter", wikipediaTitle: "Mars Climate Orbiter", wikidataSearch: "Mars Climate Orbiter", nasaMediaQuery: "Mars Climate Orbiter", category: "robotic", target: "mars"},
    {slug: "mars-polar-lander", name: "Mars Polar Lander", wikipediaTitle: "Mars Polar Lander", wikidataSearch: "Mars Polar Lander", nasaMediaQuery: "Mars Polar Lander", category: "robotic", target: "mars"},
    {slug: "spirit", name: "Spirit", wikipediaTitle: "Spirit rover", wikidataSearch: "Spirit rover", nasaMediaQuery: "Spirit rover Mars", category: "robotic", target: "mars"},
    {slug: "opportunity", name: "Opportunity", wikipediaTitle: "Opportunity rover", wikidataSearch: "Opportunity rover", nasaMediaQuery: "Opportunity rover Mars", category: "robotic", target: "mars"},
    {slug: "mars-reconnaissance-orbiter", name: "Mars Reconnaissance Orbiter", wikipediaTitle: "Mars Reconnaissance Orbiter", wikidataSearch: "Mars Reconnaissance Orbiter", nasaMediaQuery: "Mars Reconnaissance Orbiter", category: "robotic", target: "mars"},
    {slug: "phoenix", name: "Phoenix", wikipediaTitle: "Phoenix (spacecraft)", wikidataSearch: "Phoenix spacecraft", nasaMediaQuery: "Phoenix Mars Lander", category: "robotic", target: "mars"},
    {slug: "curiosity", name: "Curiosity", wikipediaTitle: "Curiosity rover", wikidataSearch: "Curiosity rover", nasaMediaQuery: "Curiosity rover Mars", category: "robotic", target: "mars"},
    {slug: "maven", name: "MAVEN", wikipediaTitle: "MAVEN", wikidataSearch: "MAVEN", nasaMediaQuery: "MAVEN Mars", category: "robotic", target: "mars"},
    {slug: "insight", name: "InSight", wikipediaTitle: "InSight", wikidataSearch: "InSight", nasaMediaQuery: "InSight Mars", category: "robotic", target: "mars"},
    {slug: "perseverance", name: "Perseverance", wikipediaTitle: "Perseverance rover", wikidataSearch: "Perseverance rover", nasaMediaQuery: "Perseverance rover Mars", category: "robotic", target: "mars"},

    {slug: "pioneer-10", name: "Pioneer 10", wikipediaTitle: "Pioneer 10", wikidataSearch: "Pioneer 10", nasaMediaQuery: "Pioneer 10", category: "robotic", target: "deep-space"},
    {slug: "pioneer-11", name: "Pioneer 11", wikipediaTitle: "Pioneer 11", wikidataSearch: "Pioneer 11", nasaMediaQuery: "Pioneer 11", category: "robotic", target: "deep-space"},
    {slug: "voyager-1", name: "Voyager 1", wikipediaTitle: "Voyager 1", wikidataSearch: "Voyager 1", nasaMediaQuery: "Voyager 1", category: "robotic", target: "deep-space"},
    {slug: "voyager-2", name: "Voyager 2", wikipediaTitle: "Voyager 2", wikidataSearch: "Voyager 2", nasaMediaQuery: "Voyager 2", category: "robotic", target: "deep-space"},
    {slug: "galileo", name: "Galileo", wikipediaTitle: "Galileo (spacecraft)", wikidataSearch: "Galileo spacecraft", nasaMediaQuery: "Galileo spacecraft Jupiter", category: "robotic", target: "jupiter"},
    {slug: "cassini-huygens", name: "Cassini-Huygens", wikipediaTitle: "Cassini–Huygens", wikidataSearch: "Cassini–Huygens", nasaMediaQuery: "Cassini-Huygens", category: "robotic", target: "saturn"},
    {slug: "new-horizons", name: "New Horizons", wikipediaTitle: "New Horizons", wikidataSearch: "New Horizons", nasaMediaQuery: "New Horizons Pluto", category: "robotic", target: "deep-space"},
    {slug: "juno", name: "Juno", wikipediaTitle: "Juno (spacecraft)", wikidataSearch: "Juno spacecraft", nasaMediaQuery: "Juno Jupiter", category: "robotic", target: "jupiter"},
    {slug: "osiris-rex", name: "OSIRIS-REx", wikipediaTitle: "OSIRIS-REx", wikidataSearch: "OSIRIS-REx", nasaMediaQuery: "OSIRIS-REx Bennu", category: "robotic", target: "asteroid"},
    {slug: "dart", name: "DART", wikipediaTitle: "Double Asteroid Redirection Test", wikidataSearch: "Double Asteroid Redirection Test", nasaMediaQuery: "DART asteroid", category: "robotic", target: "asteroid"},

    {slug: "hubble-space-telescope", name: "Hubble Space Telescope", wikipediaTitle: "Hubble Space Telescope", wikidataSearch: "Hubble Space Telescope", nasaMediaQuery: "Hubble Space Telescope", category: "telescope", target: "earth-orbit"},
    {slug: "chandra-x-ray-observatory", name: "Chandra X-ray Observatory", wikipediaTitle: "Chandra X-ray Observatory", wikidataSearch: "Chandra X-ray Observatory", nasaMediaQuery: "Chandra X-ray Observatory", category: "telescope", target: "earth-orbit"},
    {slug: "spitzer-space-telescope", name: "Spitzer Space Telescope", wikipediaTitle: "Spitzer Space Telescope", wikidataSearch: "Spitzer Space Telescope", nasaMediaQuery: "Spitzer Space Telescope", category: "telescope", target: "earth-orbit"},
    {slug: "kepler", name: "Kepler", wikipediaTitle: "Kepler space telescope", wikidataSearch: "Kepler space telescope", nasaMediaQuery: "Kepler space telescope", category: "telescope", target: "earth-orbit"},
    {slug: "james-webb-space-telescope", name: "James Webb Space Telescope", wikipediaTitle: "James Webb Space Telescope", wikidataSearch: "James Webb Space Telescope", nasaMediaQuery: "James Webb Space Telescope", category: "telescope", target: "deep-space"},
];

export const getMissionCatalogItemBySlug = (slug: string) => {
    return MISSIONS_CATALOG.find((mission) => mission.slug === slug) ?? null;
};