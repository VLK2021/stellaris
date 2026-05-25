import {
    Aperture,
    Binary,
    CircleDot,
    CloudSun,
    Compass,
    Database,
    Earth,
    Flame,
    GalleryHorizontal,
    Globe2,
    Home,
    LibraryBig,
    MarsStroke,
    Microscope,
    Orbit,
    Radio,
    Rocket,
    Satellite,
    Search,
    Sparkles,
    Telescope,
    Video,
} from "lucide-react";

export const mainNavigation = [
    {
        label: "Home",
        href: "/",
        icon: Home,
    },
    {
        label: "Explore",
        href: "/explore",
        icon: Compass,
    },
    {
        label: "Earth",
        href: "/earth",
        icon: Earth,
    },
    {
        label: "Mars",
        href: "/mars",
        icon: MarsStroke,
    },
    {
        label: "Media",
        href: "/media",
        icon: GalleryHorizontal,
    },
    {
        label: "Missions",
        href: "/missions",
        icon: Rocket,
    },
];

export const exploreNavigation = [
    {
        label: "Picture of the Day",
        href: "/apod",
        description: "Daily astronomy image, video and explanation.",
        icon: Aperture,
    },
    {
        label: "NASA Media Library",
        href: "/media",
        description: "Search official NASA photos, videos and audio.",
        icon: LibraryBig,
    },
    {
        label: "Earth From Space",
        href: "/earth",
        description: "EPIC imagery and Earth observation experiences.",
        icon: Globe2,
    },
    {
        label: "Mars Explorer",
        href: "/mars",
        description: "Rover photography, cameras and mission timelines.",
        icon: MarsStroke,
    },
    {
        label: "Asteroid Tracker",
        href: "/asteroids",
        description: "Near-Earth objects, risk cards and close approaches.",
        icon: CircleDot,
    },
    {
        label: "Space Weather",
        href: "/space-weather",
        description: "Solar flares, CME events and geomagnetic activity.",
        icon: CloudSun,
    },
    {
        label: "Exoplanets",
        href: "/exoplanets",
        description: "Explore planets beyond our solar system.",
        icon: Telescope,
    },
    {
        label: "Satellites & Orbits",
        href: "/orbits",
        description: "Orbital data, satellites and space object tracking.",
        icon: Satellite,
    },
    {
        label: "Fireballs & Comets",
        href: "/cneos",
        description: "Small-body data, fireballs, comets and close approaches.",
        icon: Flame,
    },
    {
        label: "NASA Technologies",
        href: "/technology",
        description: "Patents, inventions, software and technology transfer.",
        icon: Binary,
    },
    {
        label: "Open Data",
        href: "/datasets",
        description: "NASA public datasets and scientific resources.",
        icon: Database,
    },
    {
        label: "NASA Live",
        href: "/live",
        description: "Live streams, video hubs and space broadcasts.",
        icon: Video,
    },
];

export const footerNavigation = [
    {
        title: "Explore",
        links: [
            { label: "Home", href: "/" },
            { label: "Explore", href: "/explore" },
            { label: "Earth", href: "/earth" },
            { label: "Mars", href: "/mars" },
            { label: "Asteroids", href: "/asteroids" },
            { label: "Space Weather", href: "/space-weather" },
        ],
    },
    {
        title: "Universe",
        links: [
            { label: "Picture of the Day", href: "/apod" },
            { label: "Media Library", href: "/media" },
            { label: "Exoplanets", href: "/exoplanets" },
            { label: "Missions", href: "/missions" },
            { label: "Satellites", href: "/orbits" },
            { label: "Live", href: "/live" },
        ],
    },
    {
        title: "Research",
        links: [
            { label: "NASA Technologies", href: "/technology" },
            { label: "Open Data", href: "/datasets" },
            { label: "Climate Data", href: "/climate" },
            { label: "CNEOS", href: "/cneos" },
            { label: "GeneLab", href: "/genelab" },
            { label: "Search", href: "/search" },
        ],
    },
];

export const utilityNavigation = [
    {
        label: "Search",
        href: "/search",
        icon: Search,
    },
    {
        label: "Signals",
        href: "/signals",
        icon: Radio,
    },
    {
        label: "Discover",
        href: "/discover",
        icon: Sparkles,
    },
    {
        label: "Orbit",
        href: "/orbits",
        icon: Orbit,
    },
    {
        label: "Research",
        href: "/research",
        icon: Microscope,
    },
];