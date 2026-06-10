import type {Mission} from "@/src/types/missions";

export const MISSIONS_DATA: Mission[] = [
    {
        id: "apollo-11",
        slug: "apollo-11",
        name: "Apollo 11",
        agency: ["NASA"],
        status: "completed",
        type: "crewed",
        target: "moon",
        launchDate: "1969-07-16",
        endDate: "1969-07-24",
        spacecraft: ["Columbia", "Eagle"],
        crew: [
            {name: "Neil Armstrong", role: "Commander"},
            {name: "Michael Collins", role: "Command Module Pilot"},
            {name: "Buzz Aldrin", role: "Lunar Module Pilot"},
        ],
        summary: "First crewed Moon landing mission.",
        description:
            "Apollo 11 was the first mission to land humans on the Moon. Neil Armstrong and Buzz Aldrin landed in the Lunar Module Eagle while Michael Collins remained in lunar orbit aboard Columbia.",
        outcome:
            "Successful. The mission achieved the first human landing on the Moon and safely returned the crew to Earth.",
        achievements: [
            "First human Moon landing",
            "First EVA on the lunar surface",
            "Returned lunar samples to Earth",
        ],
        mediaQuery: "Apollo 11",
        sources: [
            {
                title: "NASA Apollo 11",
                url: "https://www.nasa.gov/mission/apollo-11/",
            },
        ],
    },
    {
        id: "apollo-13",
        slug: "apollo-13",
        name: "Apollo 13",
        agency: ["NASA"],
        status: "partial",
        type: "crewed",
        target: "moon",
        launchDate: "1970-04-11",
        endDate: "1970-04-17",
        spacecraft: ["Odyssey", "Aquarius"],
        crew: [
            {name: "Jim Lovell", role: "Commander"},
            {name: "Jack Swigert", role: "Command Module Pilot"},
            {name: "Fred Haise", role: "Lunar Module Pilot"},
        ],
        summary: "Crewed lunar mission that was aborted after an oxygen tank failure.",
        description:
            "Apollo 13 was intended to land on the Moon, but an oxygen tank failure forced the crew and mission control to perform an emergency return to Earth.",
        outcome:
            "Partial success. Lunar landing was canceled, but the crew returned safely.",
        achievements: [
            "Successful emergency return",
            "Major mission-control recovery operation",
            "Important safety lessons for later missions",
        ],
        mediaQuery: "Apollo 13",
        sources: [
            {
                title: "NASA Apollo 13",
                url: "https://www.nasa.gov/mission/apollo-13/",
            },
        ],
    },
    {
        id: "viking-1",
        slug: "viking-1",
        name: "Viking 1",
        agency: ["NASA"],
        status: "completed",
        type: "lander",
        target: "mars",
        launchDate: "1975-08-20",
        endDate: "1982-11-13",
        spacecraft: ["Viking 1 Orbiter", "Viking 1 Lander"],
        crew: [],
        summary: "First successful U.S. Mars lander mission.",
        description:
            "Viking 1 consisted of an orbiter and lander designed to study Mars from orbit and from the surface.",
        outcome:
            "Successful. The lander operated for years and returned surface images and scientific measurements.",
        achievements: [
            "First successful NASA Mars landing",
            "Returned surface images from Mars",
            "Long-duration Mars surface operations",
        ],
        mediaQuery: "Viking 1 Mars",
        sources: [
            {
                title: "NASA NSSDCA Viking 1",
                url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-075A",
            },
        ],
    },
    {
        id: "voyager-1",
        slug: "voyager-1",
        name: "Voyager 1",
        agency: ["NASA"],
        status: "active",
        type: "flyby",
        target: "deep-space",
        launchDate: "1977-09-05",
        endDate: null,
        spacecraft: ["Voyager 1"],
        crew: [],
        summary: "Outer Solar System and interstellar mission.",
        description:
            "Voyager 1 performed flybys of Jupiter and Saturn and later became humanity’s farthest operating spacecraft.",
        outcome:
            "Successful and active. The mission transformed knowledge of the outer planets and continues to return deep-space data.",
        achievements: [
            "Jupiter flyby",
            "Saturn flyby",
            "Entered interstellar space",
        ],
        mediaQuery: "Voyager 1",
        sources: [
            {
                title: "NASA Voyager",
                url: "https://voyager.jpl.nasa.gov/",
            },
        ],
    },
    {
        id: "mars-climate-orbiter",
        slug: "mars-climate-orbiter",
        name: "Mars Climate Orbiter",
        agency: ["NASA"],
        status: "failed",
        type: "orbiter",
        target: "mars",
        launchDate: "1998-12-11",
        endDate: "1999-09-23",
        spacecraft: ["Mars Climate Orbiter"],
        crew: [],
        summary: "Mars orbiter lost during arrival.",
        description:
            "Mars Climate Orbiter was designed to study Martian weather and climate, but the spacecraft was lost during orbital insertion.",
        outcome:
            "Failed. The spacecraft was lost before science operations began.",
        achievements: [
            "Important engineering lessons for later Mars missions",
        ],
        mediaQuery: "Mars Climate Orbiter",
        sources: [
            {
                title: "NASA Mars Climate Orbiter",
                url: "https://mars.nasa.gov/msp98/orbiter/",
            },
        ],
    },
    {
        id: "cassini-huygens",
        slug: "cassini-huygens",
        name: "Cassini-Huygens",
        agency: ["NASA", "ESA", "ASI"],
        status: "completed",
        type: "orbiter",
        target: "saturn",
        launchDate: "1997-10-15",
        endDate: "2017-09-15",
        spacecraft: ["Cassini Orbiter", "Huygens Probe"],
        crew: [],
        summary: "Saturn orbiter and Titan probe mission.",
        description:
            "Cassini-Huygens studied Saturn, its rings and moons. The Huygens probe landed on Titan, while Cassini spent years orbiting Saturn.",
        outcome:
            "Successful. One of the most important outer-planet missions ever flown.",
        achievements: [
            "Long-term Saturn orbital science",
            "Huygens landing on Titan",
            "Major discoveries about Enceladus and Titan",
        ],
        mediaQuery: "Cassini Huygens",
        sources: [
            {
                title: "NASA Cassini",
                url: "https://science.nasa.gov/mission/cassini/",
            },
        ],
    },
];