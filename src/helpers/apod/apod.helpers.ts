import type {
    ApodItem,
    ApodMediaFilter,
    ApodSort,
} from "@/src/types/apod/apod.types";

export const APOD_MIN_DATE = "1995-06-16";

export const getTodayDate = () => {
    const date = new Date();

    date.setDate(
        date.getDate() - 1,
    );

    return date
        .toISOString()
        .slice(0, 10);
};

export const isValidApodDate = (
    value?: string,
) => {
    if (!value) {
        return true;
    }

    if (
        !/^\d{4}-\d{2}-\d{2}$/.test(
            value,
        )
    ) {
        return false;
    }

    const timestamp =
        new Date(value).getTime();

    const min =
        new Date(
            APOD_MIN_DATE,
        ).getTime();

    const today =
        new Date(
            getTodayDate(),
        ).getTime();

    return (
        timestamp >= min &&
        timestamp <= today
    );
};

export const normalizeApodMediaType = (
    value?: string,
): ApodItem["mediaType"] => {
    if (
        value === "image" ||
        value === "video"
    ) {
        return value;
    }

    return "other";
};

export const sortApodItems = (
    items: ApodItem[],
    sort: ApodSort,
) => {
    return [...items].sort(
        (a, b) => {
            const left =
                new Date(
                    a.date,
                ).getTime();

            const right =
                new Date(
                    b.date,
                ).getTime();

            return sort ===
            "newest"
                ? right - left
                : left - right;
        },
    );
};

export const filterApodItems = (
    items: ApodItem[],
    filter: ApodMediaFilter,
) => {
    if (filter === "all") {
        return items;
    }

    return items.filter(
        (item) =>
            item.mediaType ===
            filter,
    );
};

export const asApodArray = (
    data:
        | ApodItem
        | ApodItem[]
        | null,
) => {
    if (!data) {
        return [];
    }

    return Array.isArray(data)
        ? data
        : [data];
};