import {NextRequest, NextResponse} from "next/server";

const TAP_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync";

const COLUMNS = [
    "pl_name",
    "hostname",
    "sy_dist",
    "disc_year",
    "discoverymethod",
    "pl_rade",
    "pl_bmasse",
    "pl_orbper",
    "pl_eqt",
    "pl_dens",
    "pl_insol",
    "st_teff",
    "st_rad",
    "st_mass",
];

const allowedSort = new Set([
    "pl_name",
    "hostname",
    "sy_dist",
    "pl_eqt",
    "pl_rade",
    "pl_bmasse",
    "pl_dens",
    "pl_insol",
    "disc_year",
]);

const safeSqlText = (value: string) => value.replaceAll("'", "''").trim();

const getNumber = (value: string | null, fallback: number) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};

const fetchTap = async (query: string) => {
    const url = new URL(TAP_URL);

    url.searchParams.set("query", query.replace(/\s+/g, " ").trim());
    url.searchParams.set("format", "json");

    const response = await fetch(url.toString(), {
        next: {revalidate: 60 * 30},
    });

    if (!response.ok) {
        const text = await response.text();

        throw new Error(
            `NASA Exoplanet Archive failed: ${response.status}. ${text.slice(0, 500)}`,
        );
    }

    return response.json();
};

const getTemperatureClass = (temperature: number | null) => {
    if (temperature === null || !Number.isFinite(temperature)) return "unknown";
    if (temperature < 180) return "cold";
    if (temperature <= 330) return "temperate";
    if (temperature <= 700) return "warm";

    return "hot";
};

const getCandidateType = ({
                              radius,
                              mass,
                              density,
                              temperature,
                          }: {
    radius: number | null;
    mass: number | null;
    density: number | null;
    temperature: number | null;
}) => {
    if (radius !== null && radius <= 1.6 && temperature !== null && temperature <= 330) {
        return "rocky_candidate";
    }

    if (radius !== null && radius > 1.6 && radius <= 4) {
        return "sub_neptune";
    }

    if (radius !== null && radius > 4) {
        return "gas_giant";
    }

    if (density !== null && density < 1.5 && mass !== null && mass > 5) {
        return "low_density";
    }

    return "unknown";
};

const getAtmosphereScore = ({
                                radius,
                                mass,
                                density,
                                temperature,
                                insol,
                                starTemperature,
                            }: {
    radius: number | null;
    mass: number | null;
    density: number | null;
    temperature: number | null;
    insol: number | null;
    starTemperature: number | null;
}) => {
    let score = 0;

    if (radius !== null) {
        if (radius >= 0.5 && radius <= 1.8) score += 24;
        else if (radius > 1.8 && radius <= 4) score += 18;
        else if (radius > 4 && radius <= 14) score += 12;
    }

    if (mass !== null) {
        if (mass >= 0.3 && mass <= 8) score += 20;
        else if (mass > 8 && mass <= 80) score += 12;
    }

    if (temperature !== null) {
        if (temperature >= 180 && temperature <= 330) score += 28;
        else if (temperature > 330 && temperature <= 700) score += 16;
        else if (temperature < 180) score += 10;
    }

    if (density !== null) {
        if (density >= 2.5 && density <= 8) score += 14;
        else if (density > 0 && density < 2.5) score += 10;
    }

    if (insol !== null) {
        if (insol >= 0.25 && insol <= 2) score += 8;
        else if (insol > 2 && insol <= 20) score += 4;
    }

    if (starTemperature !== null && starTemperature >= 3000 && starTemperature <= 6500) {
        score += 6;
    }

    return Math.min(100, score);
};

export async function GET(request: NextRequest) {
    try {
        const {searchParams} = request.nextUrl;

        const page = Math.max(1, getNumber(searchParams.get("page"), 1));
        const limit = Math.min(48, Math.max(12, getNumber(searchParams.get("limit"), 12)));
        const search = safeSqlText(searchParams.get("search") ?? "");

        const sortByRaw = searchParams.get("sortBy") ?? "pl_eqt";
        const sortBy = allowedSort.has(sortByRaw) ? sortByRaw : "pl_eqt";
        const order = searchParams.get("order") === "desc" ? "desc" : "asc";

        const where: string[] = [
            "default_flag = 1",
            "pl_name is not null",
            "pl_rade is not null",
            "pl_eqt is not null",
        ];

        if (search) {
            where.push(
                `(lower(pl_name) like lower('%${search}%') or lower(hostname) like lower('%${search}%'))`,
            );
        }

        const query = `
            select top 800
            ${COLUMNS.join(",")}
            from ps
            where ${where.join(" and ")}
            order by ${sortBy} ${order}
        `;

        const rowsRaw = await fetchTap(query);
        const rows = Array.isArray(rowsRaw) ? rowsRaw : [];

        const enriched = rows.map((item) => {
            const radius = item.pl_rade === null ? null : Number(item.pl_rade);
            const mass = item.pl_bmasse === null ? null : Number(item.pl_bmasse);
            const density = item.pl_dens === null ? null : Number(item.pl_dens);
            const temperature = item.pl_eqt === null ? null : Number(item.pl_eqt);
            const insol = item.pl_insol === null ? null : Number(item.pl_insol);
            const starTemperature = item.st_teff === null ? null : Number(item.st_teff);

            return {
                ...item,
                atmosphereScore: getAtmosphereScore({
                    radius,
                    mass,
                    density,
                    temperature,
                    insol,
                    starTemperature,
                }),
                atmosphereClass: getTemperatureClass(temperature),
                candidateType: getCandidateType({
                    radius,
                    mass,
                    density,
                    temperature,
                }),
            };
        });

        const total = enriched.length;
        const totalPages = Math.max(1, Math.ceil(total / limit));
        const start = (page - 1) * limit;

        return NextResponse.json({
            success: true,
            data: enriched.slice(start, start + limit),
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                data: [],
                pagination: {
                    page: 1,
                    limit: 12,
                    total: 0,
                    totalPages: 1,
                    hasNextPage: false,
                    hasPrevPage: false,
                },
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to load exoplanet atmosphere candidates.",
            },
            {status: 500},
        );
    }
}