import {NextResponse} from "next/server";

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

const safeSqlText = (value: string) => value.replaceAll("'", "''").trim();

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

export async function GET(
    request: Request,
    context: {params: Promise<{method: string}>},
) {
    try {
        const {method} = await context.params;
        const methodName = safeSqlText(decodeURIComponent(method));

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
            where default_flag = 1
            and discoverymethod = '${methodName}'
            and pl_name is not null
            group by discoverymethod
        `;

        const rowsRaw = await fetchTap(query);
        const rows = Array.isArray(rowsRaw) ? rowsRaw : [];

        if (!rows.length) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Discovery method not found.",
                },
                {status: 404},
            );
        }

        const item = rows[0] as RawMethodRow;

        return NextResponse.json({
            success: true,
            data: {
                method: item.discoverymethod ?? methodName,
                planets: Number(item.planets ?? 0),
                systems: Number(item.systems ?? 0),
                firstYear: item.first_year === null ? null : Number(item.first_year),
                lastYear: item.last_year === null ? null : Number(item.last_year),
                avgDistance: item.avg_distance === null ? null : Number(item.avg_distance),
                avgRadius: item.avg_radius === null ? null : Number(item.avg_radius),
                avgMass: item.avg_mass === null ? null : Number(item.avg_mass),
                avgTemperature:
                    item.avg_temperature === null
                        ? null
                        : Number(item.avg_temperature),
            },
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to load discovery method.",
            },
            {status: 500},
        );
    }
}