import type {NasaLiveData} from "@/src/types/nasaLive";

import {getNasaApod} from "./nasaApod.service";
import {getNasaNeoToday} from "./nasaNeo.service";
import {getNasaDonkiSummary} from "./nasaDonki.service";
import {getLatestEpicImage} from "./nasaEpic.service";
import {getMarsRoverMedia} from "./nasaImageLibrary.service";
import {getIssPosition} from "./iss.service";

export const getNasaLiveData = async (): Promise<NasaLiveData> => {
    const [apod, neo, donki, epic, marsMedia, iss] = await Promise.allSettled([
        getNasaApod(),
        getNasaNeoToday(),
        getNasaDonkiSummary(),
        getLatestEpicImage(),
        getMarsRoverMedia(),
        getIssPosition(),
    ]);

    return {
        apod: apod.status === "fulfilled" ? apod.value : null,
        neo: neo.status === "fulfilled" ? neo.value : null,
        donki: donki.status === "fulfilled" ? donki.value : null,
        epic: epic.status === "fulfilled" ? epic.value : null,
        marsMedia: marsMedia.status === "fulfilled" ? marsMedia.value : null,
        iss: iss.status === "fulfilled" ? iss.value : null,
        updatedAt: new Date().toISOString(),
    };
};