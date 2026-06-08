const NEBULUM_MARS_API_BASE_URL = "https://rovers.nebulum.one/api/v1";

type FetchMarsJsonOptions = {
    path: string;
    revalidate?: number;
    params?: Record<string, string | number | undefined | null>;
};

export const fetchMarsJson = async <T>({
                                           path,
                                           revalidate = 60 * 30,
                                           params = {},
                                       }: FetchMarsJsonOptions): Promise<T> => {
    const url = new URL(`${NEBULUM_MARS_API_BASE_URL}${path}`);

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
        const text = await response.text();

        throw new Error(
            `Mars rover request failed: ${response.status}. ${text.slice(0, 300)}`,
        );
    }

    return response.json() as Promise<T>;
};