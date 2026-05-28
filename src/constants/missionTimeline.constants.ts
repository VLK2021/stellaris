import type {MissionTimelineMission} from "@/src/types/missionTimeline";

export const MISSION_TIMELINE: MissionTimelineMission[] = [
    {
        id: "apollo11",
        year: "1969",
        tone: "cyan",
        href: "/missions/apollo11",
        image: "https://images-assets.nasa.gov/image/as11-40-5927/as11-40-5927~orig.jpg",
    },
    {
        id: "voyager1",
        year: "1977",
        tone: "blue",
        href: "/missions/voyager1",
        image: "https://images-assets.nasa.gov/image/PIA17046/PIA17046~orig.jpg",
    },
    {
        id: "hubble",
        year: "1990",
        tone: "violet",
        href: "/missions/hubble",
        image: "https://images-assets.nasa.gov/image/0201238/0201238~orig.jpg",
    },
    {
        id: "curiosity",
        year: "2012",
        tone: "orange",
        href: "/missions/curiosity",
        image: "https://images-assets.nasa.gov/image/PIA15986/PIA15986~orig.jpg",
    },
    {
        id: "perseverance",
        year: "2021",
        tone: "orange",
        href: "/missions/perseverance",
        image: "https://images-assets.nasa.gov/image/PIA23764/PIA23764~orig.jpg",
    },
    {
        id: "artemis",
        year: "2024+",
        tone: "cyan",
        href: "/missions/artemis",
        image: "https://images-assets.nasa.gov/image/artemis-i-launch/artemis-i-launch~orig.jpg",
    },
];