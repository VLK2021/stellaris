export type VisualType =
    | "apod"
    | "earth"
    | "mars"
    | "asteroid"
    | "sun"
    | "exoplanet"
    | "media"
    | "satellite"
    | "data"
    | "learn"
    | "rocket"
    | "events"
    | "more";

export type ModuleItem = {
    label: string;
    href: string;
    visual: VisualType;
};

type LocaleForModules = {
    nav: Partial<Record<string, string>>;
};

export const getModuleItems = (locale: LocaleForModules): ModuleItem[] => [
    {label: "APOD", href: "/apod", visual: "apod"},
    {label: locale.nav.earth || "Earth", href: "/earth", visual: "earth"},
    {label: locale.nav.mars || "Mars", href: "/mars", visual: "mars"},
    {label: locale.nav.asteroids || "Asteroids", href: "/asteroids", visual: "asteroid"},
    {label: locale.nav.spaceWeather || "Space Weather", href: "/space-weather", visual: "sun"},
    {label: locale.nav.exoplanets || "Exoplanets", href: "/exoplanets", visual: "exoplanet"},
    {label: locale.nav.media || "Media", href: "/media", visual: "media"},
    {label: locale.nav.technology || "Technology", href: "/technology", visual: "satellite"},
    {label: locale.nav.openData || "Open Data", href: "/open-data", visual: "data"},
    {label: locale.nav.education || "Education", href: "/education", visual: "learn"},
    {label: locale.nav.missions || "Missions", href: "/missions", visual: "rocket"},
    {label: locale.nav.events || "Events", href: "/events", visual: "events"},
    {label: "More", href: "/explore", visual: "more"},
];