import {fetchNasaJson} from "@/src/services/nasaClient.service";

import {splitDateRangeIntoChunks} from "@/src/helpers/space-weather/spaceWeatherDate.helpers";

type FetchDonkiRangeOptions<T> = {
    path: string;
    startDate: string;
    endDate: string;
    extraParams?: Record<string, string | number | boolean | null | undefined>;
    revalidate?: number;
    timeoutMs?: number;
    chunked?: boolean;
};

export const fetchDonkiJson = async <T>(
    path: string,
    params: Record<string, string | number | boolean | null | undefined>,
) => {
    return fetchNasaJson<T>(path, {
        params,
        revalidate: 60 * 30,
        timeoutMs: 60000,
    });
};

export const fetchDonkiRange = async <T>({
                                             path,
                                             startDate,
                                             endDate,
                                             extraParams = {},
                                             revalidate = 60 * 30,
                                             timeoutMs = 60000,
                                             chunked = true,
                                         }: FetchDonkiRangeOptions<T>): Promise<T[]> => {
    const chunks = chunked
        ? splitDateRangeIntoChunks(startDate, endDate)
        : [{startDate, endDate}];

    const responses = await Promise.all(
        chunks.map((chunk) =>
            fetchNasaJson<T[]>(path, {
                params: {
                    startDate: chunk.startDate,
                    endDate: chunk.endDate,
                    ...extraParams,
                },
                revalidate,
                timeoutMs,
            }),
        ),
    );

    return responses.flat();
};