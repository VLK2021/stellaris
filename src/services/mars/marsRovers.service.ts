import type {
    MarsRoverName,
    MarsRoverStatus,
    MarsRoverSummary,
} from "@/src/types/mars";

export const MARS_ROVERS: MarsRoverName[] = [
    "perseverance",
    "curiosity",
    "opportunity",
    "spirit",
];

const ROVER_META: Record<
    MarsRoverName,
    {
        label: string;
        landingDate: string;
        launchDate: string;
        status: MarsRoverStatus;
        maxSol: number;
        maxDate: string;
        totalPhotos: number;
        defaultEarthDate: string;
        defaultSol: number;
        cameras: string[];
    }
> = {
    perseverance: {
        label: "Perseverance",
        landingDate: "2021-02-18",
        launchDate: "2020-07-30",
        status: "active",
        maxSol: 1676,
        maxDate: "2025-11-06",
        totalPhotos: 0,
        defaultEarthDate: "2025-11-06",
        defaultSol: 1676,
        cameras: [
            "EDL_RUCAM",
            "EDL_RDCAM",
            "MCZ_RIGHT",
            "MCZ_LEFT",
            "NAVCAM_LEFT",
            "NAVCAM_RIGHT",
            "HAZCAM_LEFT_FRONT",
            "HAZCAM_RIGHT_FRONT",
        ],
    },
    curiosity: {
        label: "Curiosity",
        landingDate: "2012-08-06",
        launchDate: "2011-11-26",
        status: "active",
        maxSol: 1004,
        maxDate: "2015-06-03",
        totalPhotos: 0,
        defaultEarthDate: "2015-06-03",
        defaultSol: 1004,
        cameras: [
            "FHAZ",
            "RHAZ",
            "MAST",
            "CHEMCAM",
            "MAHLI",
            "MARDI",
            "NAVCAM",
        ],
    },
    opportunity: {
        label: "Opportunity",
        landingDate: "2004-01-25",
        launchDate: "2003-07-07",
        status: "complete",
        maxSol: 5111,
        maxDate: "2018-06-11",
        totalPhotos: 0,
        defaultEarthDate: "2018-06-11",
        defaultSol: 5111,
        cameras: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
    },
    spirit: {
        label: "Spirit",
        landingDate: "2004-01-04",
        launchDate: "2003-06-10",
        status: "complete",
        maxSol: 2208,
        maxDate: "2010-03-21",
        totalPhotos: 0,
        defaultEarthDate: "2010-03-21",
        defaultSol: 2208,
        cameras: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
    },
};

export const getMarsRoverMeta = (rover: MarsRoverName): MarsRoverSummary => {
    return {
        name: rover,
        ...ROVER_META[rover],
    };
};

export const getMarsRoversSummary = async (): Promise<MarsRoverSummary[]> => {
    return MARS_ROVERS.map(getMarsRoverMeta);
};