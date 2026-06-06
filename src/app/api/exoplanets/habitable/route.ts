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
    "st_teff",
    "st_rad",
    "st_mass",
];

const allowedSort = new Set([
    "habitabilityScore",
    "pl_name",
    "sy_dist",
    "pl_eqt",
    "pl_rade",
    "pl_bmasse",
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
        throw new Error(`NASA Exoplanet Archive failed: ${response.status}. ${text.slice(0, 300)}`);
    }

    return response.json();
};

const scoreRange = (value: number | null, ideal: number, tolerance: number) => {
    if (value === null || !Number.isFinite(value)) return 0;

    const diff = Math.abs(value - ideal);
    const score = Math.max(0, 1 - diff / tolerance);

    return score;
};

const getHabitabilityScore = (item: Record<string, number | string | null>) => {
    const radiusScore = scoreRange(Number(item.pl_rade), 1, 1.2) * 28;
    const massScore = scoreRange(Number(item.pl_bmasse), 1, 4) * 24;
    const tempScore = scoreRange(Number(item.pl_eqt), 288, 110) * 32;
    const distanceScore = Number(item.sy_dist) && Number(item.sy_dist) < 150 ? 8 : 0;
    const starScore = scoreRange(Number(item.st_teff), 5778, 2200) * 8;

    return Math.round(radiusScore + massScore + tempScore + distanceScore + starScore);
};

const getZone = (temperature: number | null) => {
    if (temperature === null || !Number.isFinite(temperature)) return "unknown";
    if (temperature < 180) return "cold";
    if (temperature <= 330) return "temperate";
    return "hot";
};

export async function GET(request: NextRequest) {
    try {
        const {searchParams} = request.nextUrl;

        const page = Math.max(1, getNumber(searchParams.get("page"), 1));
        const limit = Math.min(48, Math.max(12, getNumber(searchParams.get("limit"), 12)));
        const search = safeSqlText(searchParams.get("search") ?? "");

        const sortByRaw = searchParams.get("sortBy") ?? "habitabilityScore";
        const sortBy = allowedSort.has(sortByRaw) ? sortByRaw : "habitabilityScore";
        const order = searchParams.get("order") === "asc" ? "asc" : "desc";

        const where: string[] = [
            "default_flag = 1",
            "pl_name is not null",
            "pl_rade is not null",
            "pl_eqt is not null",
            "pl_rade between 0.3 and 2.5",
            "pl_eqt between 120 and 420",
        ];

        if (search) {
            where.push(`lower(pl_name) like lower('%${search}%')`);
        }

        const whereSql = where.join(" and ");

        const query = `
            select top 600
            ${COLUMNS.join(",")}
            from ps
            where ${whereSql}
            order by pl_eqt asc
        `;

        const rowsRaw = await fetchTap(query);
        const rows = Array.isArray(rowsRaw) ? rowsRaw : [];

        const enriched = rows
            .map((item) => {
                const pl_eqt = item.pl_eqt === null ? null : Number(item.pl_eqt);
                const habitabilityScore = getHabitabilityScore(item);

                return {
                    ...item,
                    habitabilityScore,
                    habitabilityZone: getZone(pl_eqt),
                };
            })
            .filter((item) => item.habitabilityScore > 0);

        const sorted = [...enriched].sort((a, b) => {
            const first = a[sortBy as keyof typeof a];
            const second = b[sortBy as keyof typeof b];

            const firstValue = typeof first === "number" ? first : String(first ?? "").toLowerCase();
            const secondValue = typeof second === "number" ? second : String(second ?? "").toLowerCase();

            if (typeof firstValue === "number" && typeof secondValue === "number") {
                return order === "desc" ? secondValue - firstValue : firstValue - secondValue;
            }

            return order === "desc"
                ? String(secondValue).localeCompare(String(firstValue))
                : String(firstValue).localeCompare(String(secondValue));
        });

        const total = sorted.length;
        const totalPages = Math.max(1, Math.ceil(total / limit));
        const start = (page - 1) * limit;
        const data = sorted.slice(start, start + limit);

        return NextResponse.json({
            success: true,
            data,
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
                message: error instanceof Error ? error.message : "Failed to load habitable worlds.",
            },
            {status: 500},
        );
    }
}