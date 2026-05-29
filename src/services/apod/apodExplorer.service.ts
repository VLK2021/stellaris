import {fetchNasaJson} from "@/src/services/nasaClient.service";

import type {
    ApodExplorerQuery,
    ApodItem,
} from "@/src/types/apod/apod.types";

import {
    isValidApodDate,
    normalizeApodMediaType,
} from "@/src/helpers/apod/apod.helpers";

type RawApodResponse = {
    date?: string;
    title?: string;
    explanation?: string;
    media_type?: string;
    url?: string;
    hdurl?: string;
    thumbnail_url?: string;
    copyright?: string;
    service_version?: string;
};

const normalizeApod = (item: RawApodResponse): ApodItem => ({
    date: item.date ?? "",
    title: item.title ?? "",
    explanation: item.explanation ?? "",
    mediaType: normalizeApodMediaType(item.media_type),
    url: item.url ?? null,
    hdUrl: item.hdurl ?? null,
    thumbnailUrl: item.thumbnail_url ?? null,
    copyright: item.copyright ?? null,
    serviceVersion: item.service_version ?? null,
});

const validateQuery = (query: ApodExplorerQuery) => {
    if (
        !isValidApodDate(query.date) ||
        !isValidApodDate(query.startDate) ||
        !isValidApodDate(query.endDate)
    ) {
        throw new Error("Invalid APOD date. Use YYYY-MM-DD from 1995-06-16 to today.");
    }

    if (query.count && (query.date || query.startDate || query.endDate)) {
        throw new Error("APOD count cannot be used together with date or date range.");
    }

    if (query.count && (query.count < 1 || query.count > 100)) {
        throw new Error("APOD count must be between 1 and 100.");
    }
};

export const getApodExplorerData = async (
    query: ApodExplorerQuery = {},
): Promise<ApodItem | ApodItem[]> => {
    validateQuery(query);

    const data = await fetchNasaJson<RawApodResponse | RawApodResponse[]>(
        "/planetary/apod",
        {
            revalidate: 60 * 60,
            params: {
                date: query.date,
                start_date: query.startDate,
                end_date: query.endDate,
                count: query.count,
                thumbs: query.thumbs ?? true,
            },
        },
    );

    if (Array.isArray(data)) {
        return data.map(normalizeApod);
    }

    return normalizeApod(data);
};