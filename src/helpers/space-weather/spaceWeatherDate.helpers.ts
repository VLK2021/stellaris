import {SPACE_WEATHER_CHUNK_DAYS} from "@/src/constants/space-weather/spaceWeather.constants";

export const getTodayDate = () => new Date().toISOString().slice(0, 10);

export const getDateMinusDays = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() - days);

    return date.toISOString().slice(0, 10);
};

export const getDaysBetween = (startDate: string, endDate: string) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
};

export const validateDateRange = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) {
        throw new Error("Start date and end date are required.");
    }

    if (getDaysBetween(startDate, endDate) < 0) {
        throw new Error("End date cannot be earlier than start date.");
    }
};

export const splitDateRangeIntoChunks = (
    startDate: string,
    endDate: string,
    chunkDays = SPACE_WEATHER_CHUNK_DAYS,
) => {
    validateDateRange(startDate, endDate);

    const chunks: {startDate: string; endDate: string}[] = [];

    let current = new Date(startDate);
    const end = new Date(endDate);

    while (current <= end) {
        const chunkStart = new Date(current);
        const chunkEnd = new Date(current);

        chunkEnd.setDate(chunkEnd.getDate() + chunkDays - 1);

        if (chunkEnd > end) {
            chunkEnd.setTime(end.getTime());
        }

        chunks.push({
            startDate: chunkStart.toISOString().slice(0, 10),
            endDate: chunkEnd.toISOString().slice(0, 10),
        });

        current = new Date(chunkEnd);
        current.setDate(current.getDate() + 1);
    }

    return chunks;
};