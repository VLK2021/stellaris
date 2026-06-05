import {NASA_API_BASE_URL} from "@/src/constants/earth/earth.constants";

const getNasaApiKey = () => {
    return process.env.NASA_API_KEY || "DEMO_KEY";
};

type FetchJsonOptions = {
    url: string;
    revalidate?: number;
    withApiKey?: boolean;
    cache?: RequestCache;
};

type FetchTextOptions = {
    url: string;
    revalidate?: number;
    cache?: RequestCache;
};

const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const fetchWithRetry = async (
    url: string,
    init: RequestInit,
    retries = 2,
): Promise<Response> => {
    let lastResponse: Response | null = null;

    for (let attempt = 0; attempt <= retries; attempt += 1) {
        const response = await fetch(url, init);

        if (response.ok) {
            return response;
        }

        lastResponse = response;

        if (![429, 500, 502, 503, 504].includes(response.status)) {
            return response;
        }

        if (attempt < retries) {
            await sleep(600 * (attempt + 1));
        }
    }

    return lastResponse as Response;
};

export const fetchEarthJson = async <T>({
                                            url,
                                            revalidate,
                                            withApiKey = true,
                                            cache,
                                        }: FetchJsonOptions): Promise<T> => {
    const requestUrl = withApiKey
        ? `${url}${url.includes("?") ? "&" : "?"}api_key=${getNasaApiKey()}`
        : url;

    const response = await fetchWithRetry(requestUrl, {
        cache,
        next: cache === "no-store" ? undefined : revalidate ? {revalidate} : undefined,
    });

    if (!response.ok) {
        throw new Error(`NASA Earth request failed with status ${response.status}`);
    }

    return response.json() as Promise<T>;
};

export const fetchEarthText = async ({
                                         url,
                                         revalidate,
                                         cache,
                                     }: FetchTextOptions): Promise<string> => {
    const response = await fetchWithRetry(url, {
        cache,
        next: cache === "no-store" ? undefined : revalidate ? {revalidate} : undefined,
    });

    if (!response.ok) {
        throw new Error(`NASA Earth text request failed with status ${response.status}`);
    }

    return response.text();
};

export const createNasaUrl = (path: string) => {
    return `${NASA_API_BASE_URL}${path}`;
};

export const getPublicNasaApiKey = () => {
    return getNasaApiKey();
};