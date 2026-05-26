import type {NasaLiveApod} from "@/src/types/nasaLive";
import {fetchNasaJson} from "./nasaClient.service";

export type ApodRequestParams = {
    date?: string;
    startDate?: string;
    endDate?: string;
    count?: number;
    thumbs?: boolean;
};

type ApodResponse = {
    title: string;
    date: string;
    explanation: string;
    media_type: string;
    url?: string;
    hdurl?: string;
    thumbnail_url?: string;
    copyright?: string;
};

const normalizeApod = (data: ApodResponse): NasaLiveApod => ({
    title: data.title,
    date: data.date,
    explanation: data.explanation,
    mediaType: data.media_type,
    imageUrl: data.media_type === "image" ? data.url ?? null : data.thumbnail_url ?? null,
    hdUrl: data.hdurl ?? null,
    copyright: data.copyright,
});

export const getNasaApod = async (
    params: ApodRequestParams = {},
): Promise<NasaLiveApod> => {
    const data = await fetchNasaJson<ApodResponse>("/planetary/apod", {
        params: {
            date: params.date,
            start_date: params.startDate,
            end_date: params.endDate,
            count: params.count,
            thumbs: params.thumbs ?? true,
        },
    });

    return normalizeApod(data);
};

export const getNasaApodRange = async (
    params: Pick<ApodRequestParams, "startDate" | "endDate" | "thumbs">,
): Promise<NasaLiveApod[]> => {
    const data = await fetchNasaJson<ApodResponse[]>("/planetary/apod", {
        params: {
            start_date: params.startDate,
            end_date: params.endDate,
            thumbs: params.thumbs ?? true,
        },
    });

    return data.map(normalizeApod);
};