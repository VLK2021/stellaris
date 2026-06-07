import {NextRequest, NextResponse} from "next/server";

const TAP_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync";

type RawMethodRow = {
    discoverymethod: string | null;
    planets: number | null;
    systems: number | null;
    first_year: number | null;
    last_year: number | null;
    avg_distance: number | null;
    avg_radius: number | null;
    avg_mass: number | null;
    avg_temperature: number | null;
};

const allowedSort = new Set([
    "planets",
    "systems",
    "first_year",
    "last_year",
    "avg_distance",
    "avg_radius",
    "avg_mass",
    "avg_temperature",
    "discoverymethod",
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

export async function GET(request: NextRequest) {
    try {
        const {searchParams} = request.nextUrl;

        const page = Math.max(1, getNumber(searchParams.get("page"), 1));
        const limit = Math.min(48, Math.max(6, getNumber(searchParams.get("limit"), 12)));
        const search = safeSqlText(searchParams.get("search") ?? "");

        const sortByRaw = searchParams.get("sortBy") ?? "planets";
        const sortBy = allowedSort.has(sortByRaw) ? sortByRaw : "planets";
        const order = searchParams.get("order") === "asc" ? "asc" : "desc";

        const where: string[] = [
            "default_flag = 1",
            "discoverymethod is not null",
            "pl_name is not null",
        ];

        if (search) {
            where.push(`lower(discoverymethod) like lower('%${search}%')`);
        }

        const query = `
            select
                discoverymethod,
                count(pl_name) as planets,
                count(distinct hostname) as systems,
                min(disc_year) as first_year,
                max(disc_year) as last_year,
                avg(sy_dist) as avg_distance,
                avg(pl_rade) as avg_radius,
                avg(pl_bmasse) as avg_mass,
                avg(pl_eqt) as avg_temperature
            from ps
            where ${where.join(" and ")}
            group by discoverymethod
            order by ${sortBy} ${order}
        `;

        const rowsRaw = await fetchTap(query);
        const rows = Array.isArray(rowsRaw) ? rowsRaw : [];

        const normalized = rows.map((item: RawMethodRow) => ({
            method: item.discoverymethod ?? "Unknown",
            planets: Number(item.planets ?? 0),
            systems: Number(item.systems ?? 0),
            firstYear: item.first_year === null ? null : Number(item.first_year),
            lastYear: item.last_year === null ? null : Number(item.last_year),
            avgDistance: item.avg_distance === null ? null : Number(item.avg_distance),
            avgRadius: item.avg_radius === null ? null : Number(item.avg_radius),
            avgMass: item.avg_mass === null ? null : Number(item.avg_mass),
            avgTemperature:
                item.avg_temperature === null ? null : Number(item.avg_temperature),
        }));

        const total = normalized.length;
        const totalPages = Math.max(1, Math.ceil(total / limit));
        const start = (page - 1) * limit;
        const data = normalized.slice(start, start + limit);

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
                        : "Failed to load discovery methods.",
            },
            {status: 500},
        );
    }
}