export type RawDonkiLinkedEvent = {
    activityID?: string;
};

export type RawDonkiInstrument = {
    displayName?: string;
};

export type RawDonkiCme = {
    activityID?: string;
    catalog?: string;
    startTime?: string;
    sourceLocation?: string;
    activeRegionNum?: number;
    note?: string;
    link?: string;
    instruments?: RawDonkiInstrument[];
    linkedEvents?: RawDonkiLinkedEvent[];
};

export type RawDonkiCmeAnalysis = {
    time21_5?: string;
    latitude?: number;
    longitude?: number;
    halfAngle?: number;
    speed?: number;
    type?: string;
    isMostAccurate?: boolean;
    note?: string;
    levelOfData?: number;
    link?: string;
    associatedCMEID?: string;
    catalog?: string;
};

export type RawDonkiGst = {
    gstID?: string;
    startTime?: string;
    allKpIndex?: {
        observedTime?: string;
        kpIndex?: number;
        source?: string;
    }[];
    linkedEvents?: RawDonkiLinkedEvent[];
    link?: string;
};

export type RawDonkiFlr = {
    flrID?: string;
    instruments?: RawDonkiInstrument[];
    beginTime?: string;
    peakTime?: string;
    endTime?: string;
    classType?: string;
    sourceLocation?: string;
    activeRegionNum?: number;
    linkedEvents?: RawDonkiLinkedEvent[];
    link?: string;
};

export type RawDonkiSep = {
    sepID?: string;
    eventTime?: string;
    instruments?: RawDonkiInstrument[];
    linkedEvents?: RawDonkiLinkedEvent[];
    link?: string;
};

export type RawDonkiIps = {
    ipsID?: string;
    eventTime?: string;
    location?: string;
    catalog?: string;
    instruments?: RawDonkiInstrument[];
    linkedEvents?: RawDonkiLinkedEvent[];
    link?: string;
};

export type RawDonkiMpc = {
    mpcID?: string;
    eventTime?: string;
    instruments?: RawDonkiInstrument[];
    linkedEvents?: RawDonkiLinkedEvent[];
    link?: string;
};

export type RawDonkiRbe = {
    rbeID?: string;
    eventTime?: string;
    instruments?: RawDonkiInstrument[];
    linkedEvents?: RawDonkiLinkedEvent[];
    link?: string;
};

export type RawDonkiHss = {
    hssID?: string;
    eventTime?: string;
    instruments?: RawDonkiInstrument[];
    linkedEvents?: RawDonkiLinkedEvent[];
    link?: string;
};

export type RawDonkiEnlil = {
    simulationID?: string;
    modelCompletionTime?: string;
    au?: number;
    cmeInputs?: {
        cmeStartTime?: string;
        latitude?: number;
        longitude?: number;
        speed?: number;
        halfAngle?: number;
    }[];
    link?: string;
};