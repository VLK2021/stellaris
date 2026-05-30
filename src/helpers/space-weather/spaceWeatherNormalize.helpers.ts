import type {SpaceWeatherEvent} from "@/src/types/space-weather/spaceWeather.types";
import type {
    RawDonkiCme,
    RawDonkiCmeAnalysis,
    RawDonkiFlr,
    RawDonkiGst,
    RawDonkiHss,
    RawDonkiIps,
    RawDonkiMpc,
    RawDonkiRbe,
    RawDonkiSep,
    RawDonkiEnlil,
} from "@/src/types/space-weather/spaceWeatherRaw.types";

const getInstruments = (items?: {displayName?: string}[]) =>
    (items ?? [])
        .map((item) => item.displayName)
        .filter((item): item is string => Boolean(item));

const getLinkedEvents = (items?: {activityID?: string}[]) =>
    (items ?? [])
        .map((item) => item.activityID)
        .filter((item): item is string => Boolean(item));

export const normalizeCme = (item: RawDonkiCme): SpaceWeatherEvent => ({
    id: item.activityID ?? crypto.randomUUID(),
    type: "CME",
    title: item.activityID ?? "Coronal Mass Ejection",
    startTime: item.startTime ?? null,
    endTime: null,
    sourceLocation: item.sourceLocation ?? null,
    activeRegionNum: item.activeRegionNum ?? null,
    classType: null,
    speed: null,
    halfAngle: null,
    latitude: null,
    longitude: null,
    kpIndex: null,
    catalog: item.catalog ?? null,
    note: item.note ?? null,
    link: item.link ?? null,
    instruments: getInstruments(item.instruments),
    linkedEvents: getLinkedEvents(item.linkedEvents),
});

export const normalizeCmeAnalysis = (
    item: RawDonkiCmeAnalysis,
): SpaceWeatherEvent => ({
    id: item.associatedCMEID ?? item.time21_5 ?? crypto.randomUUID(),
    type: "CME_ANALYSIS",
    title: item.associatedCMEID ?? "CME Analysis",
    startTime: item.time21_5 ?? null,
    endTime: null,
    sourceLocation: null,
    activeRegionNum: null,
    classType: item.type ?? null,
    speed: item.speed ?? null,
    halfAngle: item.halfAngle ?? null,
    latitude: item.latitude ?? null,
    longitude: item.longitude ?? null,
    kpIndex: null,
    catalog: item.catalog ?? null,
    note: item.note ?? null,
    link: item.link ?? null,
    instruments: [],
    linkedEvents: item.associatedCMEID ? [item.associatedCMEID] : [],
});

export const normalizeGst = (item: RawDonkiGst): SpaceWeatherEvent => {
    const maxKp =
        item.allKpIndex?.length
            ? Math.max(...item.allKpIndex.map((kp) => kp.kpIndex ?? 0))
            : null;

    return {
        id: item.gstID ?? crypto.randomUUID(),
        type: "GST",
        title: item.gstID ?? "Geomagnetic Storm",
        startTime: item.startTime ?? null,
        endTime: null,
        sourceLocation: null,
        activeRegionNum: null,
        classType: null,
        speed: null,
        halfAngle: null,
        latitude: null,
        longitude: null,
        kpIndex: maxKp,
        catalog: null,
        note: null,
        link: item.link ?? null,
        instruments: [],
        linkedEvents: getLinkedEvents(item.linkedEvents),
    };
};

export const normalizeFlr = (item: RawDonkiFlr): SpaceWeatherEvent => ({
    id: item.flrID ?? crypto.randomUUID(),
    type: "FLR",
    title: item.classType ? `Solar Flare ${item.classType}` : item.flrID ?? "Solar Flare",
    startTime: item.beginTime ?? null,
    endTime: item.endTime ?? null,
    sourceLocation: item.sourceLocation ?? null,
    activeRegionNum: item.activeRegionNum ?? null,
    classType: item.classType ?? null,
    speed: null,
    halfAngle: null,
    latitude: null,
    longitude: null,
    kpIndex: null,
    catalog: null,
    note: null,
    link: item.link ?? null,
    instruments: getInstruments(item.instruments),
    linkedEvents: getLinkedEvents(item.linkedEvents),
});

export const normalizeSep = (item: RawDonkiSep): SpaceWeatherEvent => ({
    id: item.sepID ?? crypto.randomUUID(),
    type: "SEP",
    title: item.sepID ?? "Solar Energetic Particle",
    startTime: item.eventTime ?? null,
    endTime: null,
    sourceLocation: null,
    activeRegionNum: null,
    classType: null,
    speed: null,
    halfAngle: null,
    latitude: null,
    longitude: null,
    kpIndex: null,
    catalog: null,
    note: null,
    link: item.link ?? null,
    instruments: getInstruments(item.instruments),
    linkedEvents: getLinkedEvents(item.linkedEvents),
});

export const normalizeIps = (item: RawDonkiIps): SpaceWeatherEvent => ({
    id: item.ipsID ?? crypto.randomUUID(),
    type: "IPS",
    title: item.ipsID ?? "Interplanetary Shock",
    startTime: item.eventTime ?? null,
    endTime: null,
    sourceLocation: item.location ?? null,
    activeRegionNum: null,
    classType: null,
    speed: null,
    halfAngle: null,
    latitude: null,
    longitude: null,
    kpIndex: null,
    catalog: item.catalog ?? null,
    note: null,
    link: item.link ?? null,
    instruments: getInstruments(item.instruments),
    linkedEvents: getLinkedEvents(item.linkedEvents),
});

export const normalizeMpc = (item: RawDonkiMpc): SpaceWeatherEvent => ({
    id: item.mpcID ?? crypto.randomUUID(),
    type: "MPC",
    title: item.mpcID ?? "Magnetopause Crossing",
    startTime: item.eventTime ?? null,
    endTime: null,
    sourceLocation: null,
    activeRegionNum: null,
    classType: null,
    speed: null,
    halfAngle: null,
    latitude: null,
    longitude: null,
    kpIndex: null,
    catalog: null,
    note: null,
    link: item.link ?? null,
    instruments: getInstruments(item.instruments),
    linkedEvents: getLinkedEvents(item.linkedEvents),
});

export const normalizeRbe = (item: RawDonkiRbe): SpaceWeatherEvent => ({
    id: item.rbeID ?? crypto.randomUUID(),
    type: "RBE",
    title: item.rbeID ?? "Radiation Belt Enhancement",
    startTime: item.eventTime ?? null,
    endTime: null,
    sourceLocation: null,
    activeRegionNum: null,
    classType: null,
    speed: null,
    halfAngle: null,
    latitude: null,
    longitude: null,
    kpIndex: null,
    catalog: null,
    note: null,
    link: item.link ?? null,
    instruments: getInstruments(item.instruments),
    linkedEvents: getLinkedEvents(item.linkedEvents),
});

export const normalizeHss = (item: RawDonkiHss): SpaceWeatherEvent => ({
    id: item.hssID ?? crypto.randomUUID(),
    type: "HSS",
    title: item.hssID ?? "High Speed Stream",
    startTime: item.eventTime ?? null,
    endTime: null,
    sourceLocation: null,
    activeRegionNum: null,
    classType: null,
    speed: null,
    halfAngle: null,
    latitude: null,
    longitude: null,
    kpIndex: null,
    catalog: null,
    note: null,
    link: item.link ?? null,
    instruments: getInstruments(item.instruments),
    linkedEvents: getLinkedEvents(item.linkedEvents),
});

export const normalizeEnlil = (item: RawDonkiEnlil): SpaceWeatherEvent => {
    const firstInput = item.cmeInputs?.[0];

    return {
        id: item.simulationID ?? crypto.randomUUID(),
        type: "ENLIL",
        title: item.simulationID ?? "WSA-Enlil Simulation",
        startTime: item.modelCompletionTime ?? firstInput?.cmeStartTime ?? null,
        endTime: null,
        sourceLocation: null,
        activeRegionNum: null,
        classType: null,
        speed: firstInput?.speed ?? null,
        halfAngle: firstInput?.halfAngle ?? null,
        latitude: firstInput?.latitude ?? null,
        longitude: firstInput?.longitude ?? null,
        kpIndex: null,
        catalog: null,
        note: null,
        link: item.link ?? null,
        instruments: [],
        linkedEvents: [],
    };
};