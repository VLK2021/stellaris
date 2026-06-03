import {MARS_API_BASE_URL} from "@/src/constants/mars/mars.constants";

type Props = {
    path: string;
    params?: Record<string, string | number | undefined | null>;
    revalidate: number;
};

const getApiKey = () => {
    return process.env.NASA_API_KEY || "DEMO_KEY";
};

export const fetchMarsJson = async <T,>({
                                            path,
                                            params = {},
                                            revalidate,
                                        }: Props): Promise<T> => {
    const url = new URL(`${MARS_API_BASE_URL}${path}`);

    url.searchParams.set("api_key", getApiKey());

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            url.searchParams.set(key, String(value));
        }
    });

    const response = await fetch(url.toString(), {
        next: {
            revalidate,
        },
    });

    if (!response.ok) {
        throw new Error(`NASA Mars API request failed: ${response.status}`);
    }

    return await response.json() as T;
};