import type {
    MarsApiResponse,
    MarsFilters,
    MarsPhotosResponse,
    MarsRoverName,
} from "@/src/types/mars";

export type MarsPhotosClientQuery = {
    rover: MarsRoverName;
    earthDate?: string;
    sol?: number;
    camera?: string;
    page?: number;
};

const buildQuery = (query: MarsPhotosClientQuery) => {
    const params = new URLSearchParams();

    params.set("rover", query.rover);
    params.set("page", String(query.page ?? 1));

    if (query.earthDate) {
        params.set("earthDate", query.earthDate);
    }

    if (query.sol !== undefined) {
        params.set("sol", String(query.sol));
    }

    if (query.camera) {
        params.set("camera", query.camera);
    }

    return params.toString();
};

export const fetchMarsPhotosClient = async (
    query: MarsPhotosClientQuery,
): Promise<MarsPhotosResponse> => {
    const response = await fetch(`/api/mars/photos?${buildQuery(query)}`);

    const json = (await response.json()) as MarsApiResponse<MarsPhotosResponse>;

    if (!response.ok || !json.success) {
        throw new Error(json.message ?? "Failed to load Mars photos.");
    }

    return json.data;
};

export const fetchMarsFiltersClient = async (): Promise<MarsFilters> => {
    const response = await fetch("/api/mars/filters");

    const json = (await response.json()) as MarsApiResponse<MarsFilters>;

    if (!response.ok || !json.success) {
        throw new Error(json.message ?? "Failed to load Mars filters.");
    }

    return json.data;
};