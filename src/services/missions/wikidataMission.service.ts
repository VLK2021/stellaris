import type {
    MissionAggregatedCrewMember,
    MissionNamedEntity,
    MissionTimelineEvent,
} from "@/src/types/missions";

type WikidataClaimValue = {
    id?: string;
    time?: string;
};

type WikidataClaim = {
    mainsnak?: {
        datavalue?: {
            value?: WikidataClaimValue | string;
        };
    };
};

type WikidataEntity = {
    id: string;
    labels?: {
        en?: {
            value: string;
        };
    };
    claims?: Record<string, WikidataClaim[]>;
};

type WikidataEntitiesResponse = {
    entities: Record<string, WikidataEntity>;
};

export type WikidataMissionDetails = {
    launchDate: string | null;
    endDate: string | null;
    operators: MissionNamedEntity[];
    launchVehicles: MissionNamedEntity[];
    spacecraft: MissionNamedEntity[];
    crew: MissionAggregatedCrewMember[];
    timeline: MissionTimelineEvent[];
};

const WIKIDATA_API = "https://www.wikidata.org/w/api.php";

const PROPERTY = {
    launchDate: "P619",
    endDate: "P582",
    operator: "P137",
    launchVehicle: "P375",
    crewMember: "P1029",
    partOf: "P361",
    spacecraft: "P18",
};

const normalizeDate = (value?: string) => {
    if (!value) return null;

    return value
        .replace("+", "")
        .split("T")[0] ?? null;
};

const getEntity = async (
    wikidataId: string,
): Promise<WikidataEntity | null> => {
    const params = new URLSearchParams();

    params.set("action", "wbgetentities");
    params.set("ids", wikidataId);
    params.set("props", "claims|labels");
    params.set("languages", "en");
    params.set("format", "json");
    params.set("origin", "*");

    const response = await fetch(`${WIKIDATA_API}?${params.toString()}`, {
        next: {
            revalidate: 60 * 60 * 24,
        },
    });

    if (!response.ok) {
        return null;
    }

    const data = (await response.json()) as WikidataEntitiesResponse;

    return data.entities[wikidataId] ?? null;
};

const getLabels = async (
    ids: string[],
): Promise<Record<string, string>> => {
    const uniqueIds = [...new Set(ids)].filter(Boolean);

    if (!uniqueIds.length) return {};

    const params = new URLSearchParams();

    params.set("action", "wbgetentities");
    params.set("ids", uniqueIds.join("|"));
    params.set("props", "labels");
    params.set("languages", "en");
    params.set("format", "json");
    params.set("origin", "*");

    const response = await fetch(`${WIKIDATA_API}?${params.toString()}`, {
        next: {
            revalidate: 60 * 60 * 24,
        },
    });

    if (!response.ok) {
        return {};
    }

    const data = (await response.json()) as WikidataEntitiesResponse;

    return Object.fromEntries(
        Object.entries(data.entities).map(([id, entity]) => [
            id,
            entity.labels?.en?.value ?? id,
        ]),
    );
};

const getClaims = (
    entity: WikidataEntity,
    property: string,
) => {
    return entity.claims?.[property] ?? [];
};

const getEntityIdsFromClaims = (
    claims: WikidataClaim[],
) => {
    return claims
        .map((claim) => {
            const value = claim.mainsnak?.datavalue?.value;

            if (
                typeof value === "object" &&
                value &&
                "id" in value
            ) {
                return value.id ?? null;
            }

            return null;
        })
        .filter(Boolean) as string[];
};

const getDateFromClaim = (
    claims: WikidataClaim[],
) => {
    const value = claims[0]?.mainsnak?.datavalue?.value;

    if (
        typeof value === "object" &&
        value &&
        "time" in value
    ) {
        return normalizeDate(value.time);
    }

    return null;
};

const mapEntities = (
    ids: string[],
    labels: Record<string, string>,
): MissionNamedEntity[] => {
    return ids.map((id) => ({
        id,
        label: labels[id] ?? id,
    }));
};

export const getWikidataMissionDetails = async (
    wikidataId: string | null,
): Promise<WikidataMissionDetails> => {
    if (!wikidataId) {
        return {
            launchDate: null,
            endDate: null,
            operators: [],
            launchVehicles: [],
            spacecraft: [],
            crew: [],
            timeline: [],
        };
    }

    const entity = await getEntity(wikidataId);

    if (!entity) {
        return {
            launchDate: null,
            endDate: null,
            operators: [],
            launchVehicles: [],
            spacecraft: [],
            crew: [],
            timeline: [],
        };
    }

    const operatorIds = getEntityIdsFromClaims(
        getClaims(entity, PROPERTY.operator),
    );

    const launchVehicleIds = getEntityIdsFromClaims(
        getClaims(entity, PROPERTY.launchVehicle),
    );

    const crewIds = getEntityIdsFromClaims(
        getClaims(entity, PROPERTY.crewMember),
    );

    const spacecraftIds = getEntityIdsFromClaims(
        getClaims(entity, PROPERTY.partOf),
    );

    const allIds = [
        ...operatorIds,
        ...launchVehicleIds,
        ...crewIds,
        ...spacecraftIds,
    ];

    const labels = await getLabels(allIds);

    const launchDate = getDateFromClaim(
        getClaims(entity, PROPERTY.launchDate),
    );

    const endDate = getDateFromClaim(
        getClaims(entity, PROPERTY.endDate),
    );

    const timeline: MissionTimelineEvent[] = [];

    if (launchDate) {
        timeline.push({
            label: "Launch",
            date: launchDate,
        });
    }

    if (endDate) {
        timeline.push({
            label: "Mission end",
            date: endDate,
        });
    }

    return {
        launchDate,
        endDate,
        operators: mapEntities(operatorIds, labels),
        launchVehicles: mapEntities(launchVehicleIds, labels),
        spacecraft: mapEntities(spacecraftIds, labels),
        crew: crewIds.map((id) => ({
            id,
            name: labels[id] ?? id,
            role: null,
        })),
        timeline,
    };
};