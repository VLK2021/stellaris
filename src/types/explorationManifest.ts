export type ExplorationManifestIcon =
    | "signal"
    | "rocket"
    | "sun"
    | "image"
    | "telescope";

export type ExplorationManifestFeature = {
    id: string;
    icon: ExplorationManifestIcon;
};

export type ExplorationManifestLocale = {
    eyebrow: string;
    title: string;
    text: string;
    quote: string;
    quoteAuthor: string;
    features: Record<
        string,
        {
            title: string;
            text: string;
        }
    >;
};