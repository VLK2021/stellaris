import {NASA_API_BASE_URL} from "@/src/constants/earth/earth.constants";

const getNasaApiKey = () => {
    return process.env.NASA_API_KEY || "DEMO_KEY";
};

type FetchJsonOptions = {
    url: string;
    revalidate: number;
    withApiKey?: boolean;
};

type FetchTextOptions = {
    url: string;
    revalidate: number;
};

export const fetchEarthJson = async <T>({
                                            url,
                                            revalidate,
                                            withApiKey = true,
                                        }: FetchJsonOptions): Promise<T> => {
    const requestUrl = withApiKey
        ? `${url}${url.includes("?") ? "&" : "?"}api_key=${getNasaApiKey()}`
        : url;

    const response = await fetch(requestUrl, {
        next: {
            revalidate,
        },
    });

    if (!response.ok) {
        throw new Error(`NASA Earth request failed with status ${response.status}`);
    }

    return response.json() as Promise<T>;
};

export const fetchEarthText = async ({
                                         url,
                                         revalidate,
                                     }: FetchTextOptions): Promise<string> => {
    const response = await fetch(url, {
        next: {
            revalidate,
        },
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