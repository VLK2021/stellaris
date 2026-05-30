import type {
    SpaceWeatherEvent,
    SpaceWeatherStats,
} from "@/src/types/space-weather/spaceWeather.types";

const getFlareRank = (classType: string | null) => {
    if (!classType) return 0;

    const letter = classType[0]?.toUpperCase();
    const value = Number(classType.slice(1)) || 0;

    const base =
        letter === "X" ? 300 :
            letter === "M" ? 200 :
                letter === "C" ? 100 :
                    letter === "B" ? 50 :
                        0;

    return base + value;
};

export const buildSpaceWeatherStats = (
    events: SpaceWeatherEvent[],
): SpaceWeatherStats => {
    const flares = events.filter((event) => event.type === "FLR");
    const cmeAnalysis = events.filter((event) => event.type === "CME_ANALYSIS");
    const storms = events.filter((event) => event.type === "GST");

    return {
        total: events.length,
        cme: events.filter((event) => event.type === "CME").length,
        cmeAnalysis: cmeAnalysis.length,
        gst: storms.length,
        ips: events.filter((event) => event.type === "IPS").length,
        flr: flares.length,
        sep: events.filter((event) => event.type === "SEP").length,
        mpc: events.filter((event) => event.type === "MPC").length,
        rbe: events.filter((event) => event.type === "RBE").length,
        hss: events.filter((event) => event.type === "HSS").length,
        enlil: events.filter((event) => event.type === "ENLIL").length,

        strongestFlare:
            flares.sort(
                (a, b) => getFlareRank(b.classType) - getFlareRank(a.classType),
            )[0] ?? null,

        fastestCme:
            cmeAnalysis.sort((a, b) => (b.speed ?? 0) - (a.speed ?? 0))[0] ??
            null,

        strongestStorm:
            storms.sort((a, b) => (b.kpIndex ?? 0) - (a.kpIndex ?? 0))[0] ??
            null,

        latestEvent:
            [...events].sort(
                (a, b) =>
                    new Date(b.startTime ?? 0).getTime() -
                    new Date(a.startTime ?? 0).getTime(),
            )[0] ?? null,
    };
};