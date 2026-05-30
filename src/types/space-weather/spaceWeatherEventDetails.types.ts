import type {SpaceWeatherEvent} from "./spaceWeather.types";

export type SpaceWeatherRawEventPayload = Record<string, unknown>;

export type SpaceWeatherEventDetails = {
    event: SpaceWeatherEvent;
    raw: SpaceWeatherRawEventPayload | null;
    relatedEvents: SpaceWeatherEvent[];
};

export type SpaceWeatherEventDetailsQuery = {
    eventId: string;
    type: SpaceWeatherEvent["type"];
    startDate: string;
    endDate: string;
};

export type SpaceWeatherEventDetailsResponse = {
    success: boolean;
    data: SpaceWeatherEventDetails;
};