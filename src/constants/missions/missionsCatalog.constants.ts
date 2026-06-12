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

    {slug: "mariner-1", name: "Mariner 1", wikipediaTitle: "Mariner 1", wikidataSearch: "Mariner 1", nasaMediaQuery: "Mariner 1", category: "robotic", target: "venus"},
    {slug: "mariner-3", name: "Mariner 3", wikipediaTitle: "Mariner 3", wikidataSearch: "Mariner 3", nasaMediaQuery: "Mariner 3", category: "robotic", target: "mars"},
    {slug: "mariner-5", name: "Mariner 5", wikipediaTitle: "Mariner 5", wikidataSearch: "Mariner 5", nasaMediaQuery: "Mariner 5 Venus", category: "robotic", target: "venus"},
    {slug: "mariner-6", name: "Mariner 6", wikipediaTitle: "Mariner 6", wikidataSearch: "Mariner 6", nasaMediaQuery: "Mariner 6 Mars", category: "robotic", target: "mars"},
    {slug: "mariner-7", name: "Mariner 7", wikipediaTitle: "Mariner 7", wikidataSearch: "Mariner 7", nasaMediaQuery: "Mariner 7 Mars", category: "robotic", target: "mars"},
    {slug: "mariner-9", name: "Mariner 9", wikipediaTitle: "Mariner 9", wikidataSearch: "Mariner 9", nasaMediaQuery: "Mariner 9 Mars", category: "robotic", target: "mars"},

    {slug: "pioneer-5", name: "Pioneer 5", wikipediaTitle: "Pioneer 5", wikidataSearch: "Pioneer 5", nasaMediaQuery: "Pioneer 5", category: "robotic", target: "deep-space"},
    {slug: "pioneer-6", name: "Pioneer 6", wikipediaTitle: "Pioneer 6", wikidataSearch: "Pioneer 6", nasaMediaQuery: "Pioneer 6", category: "robotic", target: "deep-space"},
    {slug: "pioneer-7", name: "Pioneer 7", wikipediaTitle: "Pioneer 7", wikidataSearch: "Pioneer 7", nasaMediaQuery: "Pioneer 7", category: "robotic", target: "deep-space"},
    {slug: "pioneer-8", name: "Pioneer 8", wikipediaTitle: "Pioneer 8", wikidataSearch: "Pioneer 8", nasaMediaQuery: "Pioneer 8", category: "robotic", target: "deep-space"},
    {slug: "pioneer-9", name: "Pioneer 9", wikipediaTitle: "Pioneer 9", wikidataSearch: "Pioneer 9", nasaMediaQuery: "Pioneer 9", category: "robotic", target: "deep-space"},

    {slug: "lunar-orbiter-1", name: "Lunar Orbiter 1", wikipediaTitle: "Lunar Orbiter 1", wikidataSearch: "Lunar Orbiter 1", nasaMediaQuery: "Lunar Orbiter 1", category: "robotic", target: "moon"},
    {slug: "lunar-orbiter-2", name: "Lunar Orbiter 2", wikipediaTitle: "Lunar Orbiter 2", wikidataSearch: "Lunar Orbiter 2", nasaMediaQuery: "Lunar Orbiter 2", category: "robotic", target: "moon"},
    {slug: "lunar-orbiter-3", name: "Lunar Orbiter 3", wikipediaTitle: "Lunar Orbiter 3", wikidataSearch: "Lunar Orbiter 3", nasaMediaQuery: "Lunar Orbiter 3", category: "robotic", target: "moon"},
    {slug: "lunar-orbiter-4", name: "Lunar Orbiter 4", wikipediaTitle: "Lunar Orbiter 4", wikidataSearch: "Lunar Orbiter 4", nasaMediaQuery: "Lunar Orbiter 4", category: "robotic", target: "moon"},
    {slug: "lunar-orbiter-5", name: "Lunar Orbiter 5", wikipediaTitle: "Lunar Orbiter 5", wikidataSearch: "Lunar Orbiter 5", nasaMediaQuery: "Lunar Orbiter 5", category: "robotic", target: "moon"},

    {slug: "surveyor-1", name: "Surveyor 1", wikipediaTitle: "Surveyor 1", wikidataSearch: "Surveyor 1", nasaMediaQuery: "Surveyor 1 Moon", category: "robotic", target: "moon"},
    {slug: "surveyor-2", name: "Surveyor 2", wikipediaTitle: "Surveyor 2", wikidataSearch: "Surveyor 2", nasaMediaQuery: "Surveyor 2 Moon", category: "robotic", target: "moon"},
    {slug: "surveyor-3", name: "Surveyor 3", wikipediaTitle: "Surveyor 3", wikidataSearch: "Surveyor 3", nasaMediaQuery: "Surveyor 3 Moon", category: "robotic", target: "moon"},
    {slug: "surveyor-4", name: "Surveyor 4", wikipediaTitle: "Surveyor 4", wikidataSearch: "Surveyor 4", nasaMediaQuery: "Surveyor 4 Moon", category: "robotic", target: "moon"},
    {slug: "surveyor-5", name: "Surveyor 5", wikipediaTitle: "Surveyor 5", wikidataSearch: "Surveyor 5", nasaMediaQuery: "Surveyor 5 Moon", category: "robotic", target: "moon"},
    {slug: "surveyor-6", name: "Surveyor 6", wikipediaTitle: "Surveyor 6", wikidataSearch: "Surveyor 6", nasaMediaQuery: "Surveyor 6 Moon", category: "robotic", target: "moon"},
    {slug: "surveyor-7", name: "Surveyor 7", wikipediaTitle: "Surveyor 7", wikidataSearch: "Surveyor 7", nasaMediaQuery: "Surveyor 7 Moon", category: "robotic", target: "moon"},

    {slug: "ranger-1", name: "Ranger 1", wikipediaTitle: "Ranger 1", wikidataSearch: "Ranger 1", nasaMediaQuery: "Ranger 1", category: "robotic", target: "moon"},
    {slug: "ranger-2", name: "Ranger 2", wikipediaTitle: "Ranger 2", wikidataSearch: "Ranger 2", nasaMediaQuery: "Ranger 2", category: "robotic", target: "moon"},
    {slug: "ranger-3", name: "Ranger 3", wikipediaTitle: "Ranger 3", wikidataSearch: "Ranger 3", nasaMediaQuery: "Ranger 3 Moon", category: "robotic", target: "moon"},
    {slug: "ranger-4", name: "Ranger 4", wikipediaTitle: "Ranger 4", wikidataSearch: "Ranger 4", nasaMediaQuery: "Ranger 4 Moon", category: "robotic", target: "moon"},
    {slug: "ranger-5", name: "Ranger 5", wikipediaTitle: "Ranger 5", wikidataSearch: "Ranger 5", nasaMediaQuery: "Ranger 5 Moon", category: "robotic", target: "moon"},
    {slug: "ranger-6", name: "Ranger 6", wikipediaTitle: "Ranger 6", wikidataSearch: "Ranger 6", nasaMediaQuery: "Ranger 6 Moon", category: "robotic", target: "moon"},
    {slug: "ranger-7", name: "Ranger 7", wikipediaTitle: "Ranger 7", wikidataSearch: "Ranger 7", nasaMediaQuery: "Ranger 7 Moon", category: "robotic", target: "moon"},
    {slug: "ranger-8", name: "Ranger 8", wikipediaTitle: "Ranger 8", wikidataSearch: "Ranger 8", nasaMediaQuery: "Ranger 8 Moon", category: "robotic", target: "moon"},
    {slug: "ranger-9", name: "Ranger 9", wikipediaTitle: "Ranger 9", wikidataSearch: "Ranger 9", nasaMediaQuery: "Ranger 9 Moon", category: "robotic", target: "moon"},

    {slug: "lunar-prospector", name: "Lunar Prospector", wikipediaTitle: "Lunar Prospector", wikidataSearch: "Lunar Prospector", nasaMediaQuery: "Lunar Prospector", category: "robotic", target: "moon"},
    {slug: "clementine", name: "Clementine", wikipediaTitle: "Clementine (spacecraft)", wikidataSearch: "Clementine spacecraft", nasaMediaQuery: "Clementine Moon", category: "robotic", target: "moon"},
    {slug: "ladee", name: "LADEE", wikipediaTitle: "LADEE", wikidataSearch: "LADEE", nasaMediaQuery: "LADEE Moon", category: "robotic", target: "moon"},
    {slug: "grail", name: "GRAIL", wikipediaTitle: "GRAIL", wikidataSearch: "GRAIL", nasaMediaQuery: "GRAIL Moon", category: "robotic", target: "moon"},
    {slug: "lunar-reconnaissance-orbiter", name: "Lunar Reconnaissance Orbiter", wikipediaTitle: "Lunar Reconnaissance Orbiter", wikidataSearch: "Lunar Reconnaissance Orbiter", nasaMediaQuery: "Lunar Reconnaissance Orbiter", category: "robotic", target: "moon"},

];

export const getMissionCatalogItemBySlug = (slug: string) => {
    return MISSIONS_CATALOG.find((mission) => mission.slug === slug) ?? null;
};