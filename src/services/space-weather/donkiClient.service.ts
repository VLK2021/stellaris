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

const DEFAULT_REVALIDATE = 60 * 30;
const DEFAULT_TIMEOUT_MS = 20000;

export const fetchDonkiJson = async <T>(
    path: string,
    params: Record<string, string | number | boolean | null | undefined>,
) => {
    return fetchNasaJson<T>(path, {
        params,
        revalidate: DEFAULT_REVALIDATE,
        timeoutMs: DEFAULT_TIMEOUT_MS,
    });
};

export const fetchDonkiRange = async <T>({
                                             path,
                                             startDate,
                                             endDate,
                                             extraParams = {},
                                             revalidate = DEFAULT_REVALIDATE,
                                             timeoutMs = DEFAULT_TIMEOUT_MS,
                                             chunked = true,
                                         }: FetchDonkiRangeOptions<T>): Promise<T[]> => {
    const chunks = chunked
        ? splitDateRangeIntoChunks(startDate, endDate)
        : [{startDate, endDate}];

    const responses = await Promise.allSettled(
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

    return responses.flatMap((response) => {
        if (response.status === "fulfilled") {
            return response.value;
        }

        return [];
    });
};