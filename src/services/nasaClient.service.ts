const NASA_BASE_URL = "https://api.nasa.gov";

export type NasaParamValue =
    | string
    | number
    | boolean
    | null
    | undefined
    | Array<string | number | boolean>;

type NasaRequestOptions = {
    baseUrl?: string;
    params?: Record<string, NasaParamValue>;
    revalidate?: number;
    timeoutMs?: number;
    withApiKey?: boolean;
};

export class NasaApiError extends Error {
    status?: number;
    url: string;

    constructor(message: string, url: string, status?: number) {
        super(message);
        this.name = "NasaApiError";
        this.url = url;
        this.status = status;
    }
}

export const getNasaApiKey = () => {
    const key = process.env.NASA_API_KEY;

    if (!key) {
        throw new NasaApiError("NASA_API_KEY is missing in .env.local", NASA_BASE_URL);
    }

    return key;
};

export const buildNasaUrl = (
    path: string,
    params: Record<string, NasaParamValue> = {},
    baseUrl = NASA_BASE_URL,
    withApiKey = true,
) => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const url = new URL(`${baseUrl}${normalizedPath}`);

    if (withApiKey) {
        url.searchParams.set("api_key", getNasaApiKey());
    }

    Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") return;

        if (Array.isArray(value)) {
            value.forEach((item) => url.searchParams.append(key, String(item)));
            return;
        }

        url.searchParams.set(key, String(value));
    });

    return url.toString();
};

export const fetchNasaJson = async <T>(
    path: string,
    options: NasaRequestOptions = {},
): Promise<T> => {
    const {
        baseUrl = NASA_BASE_URL,
        params = {},
        revalidate = 900,
        timeoutMs = 20000,
        withApiKey = true,
    } = options;

    const url = buildNasaUrl(path, params, baseUrl, withApiKey);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            signal: controller.signal,
            next: {revalidate},
            headers: {Accept: "application/json"},
        });

        const text = await response.text();

        if (!response.ok) {
            throw new NasaApiError(
                `Request failed: ${response.status} ${response.statusText}. Body: ${text.slice(0, 400)}`,
                url,
                response.status,
            );
        }

        return JSON.parse(text) as T;
    } finally {
        clearTimeout(timeout);
    }
};